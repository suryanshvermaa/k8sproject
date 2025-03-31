"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = __importDefault(require("./user.routes"));
const vm_routes_1 = __importDefault(require("./vm.routes"));
const router = (0, express_1.Router)();
router
    .use('/api/v1', user_routes_1.default)
    .use('/vm', vm_routes_1.default);
exports.default = router;
