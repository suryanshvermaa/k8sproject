"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("./error");
const errorHandler = (err, req, res) => {
    const statusCode = err instanceof error_1.AppError ? err.statusCode : 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
};
exports.default = errorHandler;
