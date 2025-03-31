"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = void 0;
const response = (res, status, message, data) => {
    return res.status(status).json({
        success: true,
        message,
        data
    });
};
exports.response = response;
