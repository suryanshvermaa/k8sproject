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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVm = exports.createVm = void 0;
const vm_operation_1 = require("./vm.operation");
const createVm = (vm) => __awaiter(void 0, void 0, void 0, function* () {
    const { vmId, image, password } = vm;
    yield (0, vm_operation_1.createDeployment)({
        image,
        password,
        vmId
    });
    yield (0, vm_operation_1.createService)({ vmId });
    yield (0, vm_operation_1.createIngress)({ vmId });
});
exports.createVm = createVm;
const deleteVm = (vmId) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, vm_operation_1.deleteIngress)(vmId);
    yield (0, vm_operation_1.deleteService)(vmId);
    yield (0, vm_operation_1.deleteDeployment)(vmId).catch((err) => {
        console.log(err.message);
    });
});
exports.deleteVm = deleteVm;
