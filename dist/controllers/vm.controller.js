"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.launchVM = void 0;
const create_and_delete_vm_1 = require("../k8s/operations/create.and.delete.vm");
const response_1 = require("../middlewares/response");
const error_1 = require("../middlewares/error");
const db_1 = __importDefault(require("../config/db"));
require("dotenv/config");
// interface VMTypes={
//     image: "suryanshvermaa/vs-code:1.0.1" | "suryanshvermaa/ubnutu:1.0.0";
//     password: string;
//     url:string;
//     duration:number //in minutes
//     vm: "vscode" | "ubuntu"
//     name:string
// }
const launchVM = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { image, password, duration, vm } = req.body;
        const vmId = "vm" + Date.now() + req.user;
        if (!vmId || !password || !duration || !vm || !image) {
            return next(new error_1.AppError("Please provide all required fields", 400));
        }
        const url = process.env.NODE_ENV == "dev" ? `vm.suryanshverma.local:6901` : `${vmId}.suryanshverma.site:6901`;
        const createdVm = yield db_1.default.vM.create({
            data: {
                name: vmId,
                password,
                status: "active",
                duration,
                userId: Number(req.user),
                url
            }
        });
        yield (0, create_and_delete_vm_1.createVm)({ vmId, image, password });
        setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, create_and_delete_vm_1.deleteVm)(vmId);
        }), 1000 * 60 * Number(createdVm.duration));
        (0, response_1.response)(res, 201, "vm created successfully", { name: createdVm.id, url: createdVm.url, duration: createdVm.duration });
    }
    catch (error) {
        return next(error);
    }
});
exports.launchVM = launchVM;
