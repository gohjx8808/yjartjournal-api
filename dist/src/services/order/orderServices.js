"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkout = exports.calculateShippingFee = void 0;
const calculateShippingFee = (payload) => {
    const stateId = payload.state.id;
    const totalAmount = payload.totalAmount;
    const eastMalaysiaStateId = [4, 5, 7];
    if (eastMalaysiaStateId.includes(stateId)) {
        if (totalAmount >= 150) {
            return 0;
        }
        else {
            return 15;
        }
    }
    else {
        if (totalAmount >= 80) {
            return 0;
        }
        else {
            return 8;
        }
    }
};
exports.calculateShippingFee = calculateShippingFee;
const checkout = (payload) => {
    console.log(payload);
};
exports.checkout = checkout;
//# sourceMappingURL=orderServices.js.map