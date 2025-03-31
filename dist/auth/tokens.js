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
exports.comparePassword = exports.hashedPassword = exports.verifyAndDecodeAuthToken = exports.generateAuthToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
require("dotenv/config");
const generateAuthToken = (data) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const token = yield jsonwebtoken_1.default.sign(data, process.env.JWT_SECRET, { expiresIn: '1d' });
            resolve(token);
        }
        catch (error) {
            reject(error);
        }
    }));
};
exports.generateAuthToken = generateAuthToken;
const verifyAndDecodeAuthToken = (token) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const decodedToken = yield jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            resolve(decodedToken);
        }
        catch (error) {
            reject(error);
        }
    }));
};
exports.verifyAndDecodeAuthToken = verifyAndDecodeAuthToken;
const hashedPassword = (password) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const hash = yield bcrypt_1.default.hash(password, 10);
            resolve(hash);
        }
        catch (error) {
            reject(error);
        }
    }));
};
exports.hashedPassword = hashedPassword;
const comparePassword = (password, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.compare(password, hashedPassword);
});
exports.comparePassword = comparePassword;
