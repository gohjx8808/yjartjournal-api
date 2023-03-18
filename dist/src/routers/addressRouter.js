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
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const sharedHelper_1 = require("../helpers/sharedHelper");
const AddAddressMiddleware_1 = __importDefault(require("../middlewares/address/AddAddressMiddleware"));
const DeleteAddressMiddleware_1 = __importDefault(require("../middlewares/address/DeleteAddressMiddleware"));
const UpdateAddressMiddleware_1 = __importDefault(require("../middlewares/address/UpdateAddressMiddleware"));
const JwtAuthMiddleware_1 = __importDefault(require("../middlewares/JwtAuthMiddleware"));
const stateRepository_1 = require("../repositories/stateRepository");
const AddAddressValidator_1 = __importDefault(require("../requestValidators/address/AddAddressValidator"));
const DeleteAddressValidator_1 = __importDefault(require("../requestValidators/address/DeleteAddressValidator"));
const UpdateAddressValidator_1 = __importDefault(require("../requestValidators/address/UpdateAddressValidator"));
const addressServices_1 = require("../services/address/addressServices");
const upload = (0, multer_1.default)();
const addressRouter = (0, express_1.Router)();
addressRouter.get('/list', (0, JwtAuthMiddleware_1.default)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = (0, sharedHelper_1.typeAuthenticatedUser)(req);
    const response = yield (0, addressServices_1.getAddressList)(user.id);
    return res.json({ data: response });
}));
addressRouter.get('/state-options', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, stateRepository_1.getStateList)();
    return res.json({ data: response });
}));
addressRouter.post('/add', ...[
    upload.none(),
    (0, JwtAuthMiddleware_1.default)(),
    ...AddAddressValidator_1.default,
    (0, AddAddressMiddleware_1.default)(),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = (0, sharedHelper_1.typeAuthenticatedUser)(req);
    const payload = req.body;
    const response = yield (0, addressServices_1.addAddress)(user.id, payload);
    return res.json(response);
}));
addressRouter.post('/update', ...[
    upload.none(),
    (0, JwtAuthMiddleware_1.default)(),
    ...UpdateAddressValidator_1.default,
    (0, UpdateAddressMiddleware_1.default)(),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = (0, sharedHelper_1.typeAuthenticatedUser)(req);
    const payload = req.body;
    const response = yield (0, addressServices_1.updateAddress)(user.id, payload);
    return res.json(response);
}));
addressRouter.post('/delete', ...[
    upload.none(),
    (0, JwtAuthMiddleware_1.default)(),
    ...DeleteAddressValidator_1.default,
    (0, DeleteAddressMiddleware_1.default)(),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const response = yield (0, addressServices_1.deleteAddress)(payload);
    return res.json(response);
}));
exports.default = addressRouter;
//# sourceMappingURL=addressRouter.js.map