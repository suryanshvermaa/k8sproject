"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const error_1 = require("./middlewares/error");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({ origin: "localhost:3000" }));
app.use('/', routes_1.default);
//health route
app.get('/health', (req, res) => {
    res.status(200).send('healthy');
});
//error route
app.get('/error', (req, res, next) => {
    try {
        throw new error_1.AppError("route error", 400);
    }
    catch (error) {
        next(error);
    }
});
app.use(errorHandler_1.default);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('server is running on port', port);
});
