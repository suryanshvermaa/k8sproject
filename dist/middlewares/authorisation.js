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
exports.authMiddleware = void 0;
const tokens_1 = require("../auth/tokens");
const error_1 = require("./error");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authToken = req.body.authToken || req.query.authToken;
    if (!authToken)
        return next(new error_1.AppError("Unathorised", 400));
    const user = yield (0, tokens_1.verifyAndDecodeAuthToken)(authToken);
    if (!user)
        return next(new error_1.AppError("Unauthorised", 401));
    const { userId } = JSON.parse(JSON.stringify(user));
    req.user = userId;
    return next();
});
exports.authMiddleware = authMiddleware;
