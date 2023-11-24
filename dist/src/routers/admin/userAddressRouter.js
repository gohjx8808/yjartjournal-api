"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Roles_1 = require("../../entities/Roles");
const JwtAuthMiddleware_1 = __importDefault(require("../../middlewares/JwtAuthMiddleware"));
const UserExistsMiddleware_1 = __importDefault(require("../../middlewares/admin/user/UserExistsMiddleware"));
const AdminAddAddressMiddleware_1 = __importDefault(require("../../middlewares/admin/user/address/AdminAddAddressMiddleware"));
const AdminDeleteAddressMiddleware_1 = __importDefault(require("../../middlewares/admin/user/address/AdminDeleteAddressMiddleware"));
const AdminUpdateAddressMiddleware_1 = __importDefault(require("../../middlewares/admin/user/address/AdminUpdateAddressMiddleware"));
const AddAddressValidator_1 = __importDefault(require("../../requestValidators/address/AddAddressValidator"));
const DeleteAddressValidator_1 = __importDefault(require("../../requestValidators/address/DeleteAddressValidator"));
const UpdateAddressValidator_1 = __importDefault(require("../../requestValidators/address/UpdateAddressValidator"));
const UserIdValidator_1 = __importDefault(require("../../requestValidators/admin/user/UserIdValidator"));
const AddressServices_1 = __importDefault(require("../../services/address/AddressServices"));
const userAddressRouter = (0, express_1.Router)();
const addressServices = new AddressServices_1.default();
userAddressRouter.post('/add', ...[
    ...AddAddressValidator_1.default,
    ...UserIdValidator_1.default,
    (0, AdminAddAddressMiddleware_1.default)(),
    (0, UserExistsMiddleware_1.default)(),
    (0, JwtAuthMiddleware_1.default)(true, [Roles_1.AssignableRoles.ADMIN]),
], async (req, res) => {
    const { userId, ...addressDetails } = req.body;
    const response = await addressServices.addAddress(userId, addressDetails);
    return res.json({ data: response });
});
userAddressRouter.post('/update', ...[
    ...UpdateAddressValidator_1.default,
    ...UserIdValidator_1.default,
    (0, AdminUpdateAddressMiddleware_1.default)(),
    (0, UserExistsMiddleware_1.default)(),
    (0, JwtAuthMiddleware_1.default)(true, [Roles_1.AssignableRoles.ADMIN]),
], async (req, res) => {
    const { userId, ...addressDetails } = req.body;
    const response = await addressServices.updateAddress(userId, addressDetails);
    return res.json({ data: response });
});
userAddressRouter.post('/delete', ...[
    ...DeleteAddressValidator_1.default,
    (0, AdminDeleteAddressMiddleware_1.default)(),
    (0, JwtAuthMiddleware_1.default)(true, [Roles_1.AssignableRoles.ADMIN]),
], async (req, res) => {
    const payload = req.body;
    const response = await addressServices.deleteAddress(payload);
    return res.json({ data: response });
});
exports.default = userAddressRouter;
//# sourceMappingURL=userAddressRouter.js.map