"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CheckoutMiddleware = () => (req, res, next) => {
    var _a;
    const user = (_a = req.user) === null || _a === void 0 ? void 0 : _a.valueOf();
    const payload = req.body;
    if (!user && payload.addressId) {
        return res
            .status(401)
            .json({ message: 'You are not allowed to use this address.' });
    }
    next();
};
exports.default = CheckoutMiddleware;
//# sourceMappingURL=CheckoutMiddleware.js.map