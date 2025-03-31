"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authorisation_1 = require("../middlewares/authorisation");
const vm_controller_1 = require("../controllers/vm.controller");
const vmRouter = (0, express_1.Router)();
vmRouter
    .post('/createVM', authorisation_1.authMiddleware, vm_controller_1.launchVM);
exports.default = vmRouter;
