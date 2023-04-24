"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const sharedHelper_1 = require("../helpers/sharedHelper");
const JwtAuthMiddleware_1 = __importDefault(require("../middlewares/JwtAuthMiddleware"));
const UpdateAccountValidator_1 = __importDefault(require("../requestValidators/UpdateAccountValidator"));
const accountServices_1 = require("../services/account/accountServices");
const upload = (0, multer_1.default)();
const accountRouter = (0, express_1.Router)();
accountRouter.get('/details', (0, JwtAuthMiddleware_1.default)(), async (req, res) => {
    const user = (0, sharedHelper_1.typeAuthenticatedUser)(req);
    const details = await (0, accountServices_1.getUserAccount)(user.id);
    return res.json({ data: details });
});
accountRouter.post('/update', ...[upload.none(), ...UpdateAccountValidator_1.default, (0, JwtAuthMiddleware_1.default)()], async (req, res) => {
    const payload = req.body;
    const user = (0, sharedHelper_1.typeAuthenticatedUser)(req);
    const response = await (0, accountServices_1.updateUserAccount)(user.id, payload);
    return res.json(response);
});
exports.default = accountRouter;
//# sourceMappingURL=accountRouter.js.map