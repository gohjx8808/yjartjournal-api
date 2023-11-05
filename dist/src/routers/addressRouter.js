"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const sharedHelper_1 = require("../helpers/sharedHelper");
const JwtAuthMiddleware_1 = __importDefault(require("../middlewares/JwtAuthMiddleware"));
const AddAddressMiddleware_1 = __importDefault(require("../middlewares/address/AddAddressMiddleware"));
const DeleteAddressMiddleware_1 = __importDefault(require("../middlewares/address/DeleteAddressMiddleware"));
const UpdateAddressMiddleware_1 = __importDefault(require("../middlewares/address/UpdateAddressMiddleware"));
const stateRepository_1 = require("../repositories/stateRepository");
const AddAddressValidator_1 = __importDefault(require("../requestValidators/address/AddAddressValidator"));
const DeleteAddressValidator_1 = __importDefault(require("../requestValidators/address/DeleteAddressValidator"));
const UpdateAddressValidator_1 = __importDefault(require("../requestValidators/address/UpdateAddressValidator"));
const AddressServicesa_1 = __importDefault(require("../services/address/AddressServicesa"));
const upload = (0, multer_1.default)();
const addressRouter = (0, express_1.Router)();
const addressServices = new AddressServicesa_1.default();
addressRouter.get('/list', (0, JwtAuthMiddleware_1.default)(), async (req, res) => {
    const user = (0, sharedHelper_1.typeAuthenticatedUser)(req);
    const response = await addressServices.getAddressList(user.id);
    return res.json({ data: response });
});
addressRouter.get('/state-options', async (_req, res) => {
    const response = await (0, stateRepository_1.getStateList)();
    return res.json({ data: response });
});
addressRouter.post('/add', ...[
    upload.none(),
    (0, JwtAuthMiddleware_1.default)(),
    ...AddAddressValidator_1.default,
    (0, AddAddressMiddleware_1.default)(),
], async (req, res) => {
    const user = (0, sharedHelper_1.typeAuthenticatedUser)(req);
    const payload = req.body;
    const response = await addressServices.addAddress(user.id, payload);
    return res.json(response);
});
addressRouter.post('/update', ...[
    upload.none(),
    (0, JwtAuthMiddleware_1.default)(),
    ...UpdateAddressValidator_1.default,
    (0, UpdateAddressMiddleware_1.default)(),
], async (req, res) => {
    const user = (0, sharedHelper_1.typeAuthenticatedUser)(req);
    const payload = req.body;
    const response = await addressServices.updateAddress(user.id, payload);
    return res.json(response);
});
addressRouter.post('/delete', ...[
    upload.none(),
    (0, JwtAuthMiddleware_1.default)(),
    ...DeleteAddressValidator_1.default,
    (0, DeleteAddressMiddleware_1.default)(),
], async (req, res) => {
    const payload = req.body;
    const response = await addressServices.deleteAddress(payload);
    return res.json(response);
});
exports.default = addressRouter;
//# sourceMappingURL=addressRouter.js.map