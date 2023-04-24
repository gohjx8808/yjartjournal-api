"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CheckoutMiddleware = () => (req, res, next) => {
    const user = req.user?.valueOf();
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