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
exports.login = exports.signup = void 0;
const error_1 = require("../middlewares/error");
const db_1 = __importDefault(require("../config/db"));
const response_1 = require("../middlewares/response");
const tokens_1 = require("../auth/tokens");
/**
 * @desc    Signup a new user
 * @route   POST /api/v1/user/signup
 * @access  Public
 */
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, name, password } = req.body;
        if (!email || !name || !password)
            return next(new error_1.AppError("All fields are required", 400));
        if (String(password).length < 8)
            return next(new error_1.AppError("Password length should be 8 more that 8", 400));
        const emailExist = yield db_1.default.user.findUnique({
            where: {
                email
            }
        });
        if (emailExist)
            return next(new error_1.AppError("Email already exists", 400));
        const user = yield db_1.default.user.create({
            data: {
                name,
                email,
                password,
            }
        });
        const token = yield (0, tokens_1.generateAuthToken)({
            userId: user.id,
            email: user.email
        });
        (0, response_1.response)(res, 201, "User created successfully", {
            id: user.id,
            name: user.name,
            email: user.email,
            authToken: token
        });
    }
    catch (error) {
        next(error);
    }
});
exports.signup = signup;
/**
 * @desc    Login a user
 * @route   POST /api/v1/user/login
 * @access  Public
 * */
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            throw new error_1.AppError("All fields are required", 400);
        const user = yield db_1.default.user.findUnique({
            where: {
                email
            }
        });
        if (!user)
            throw new error_1.AppError("Invalid credentials", 401);
        const isAuthenticated = (0, tokens_1.comparePassword)(password, user.password);
        if (!isAuthenticated)
            throw new error_1.AppError("Invalid credentials", 401);
        const token = yield (0, tokens_1.generateAuthToken)({
            userId: user.id,
            email: user.email
        });
        (0, response_1.response)(res, 200, "User logged in successfully", {
            id: user.id,
            name: user.name,
            email: user.email,
            authToken: token
        });
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
