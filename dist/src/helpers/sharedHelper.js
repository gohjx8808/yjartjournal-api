"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeAuthenticatedUser = void 0;
const typeAuthenticatedUser = (req) => {
    if (req.user) {
        return req.user.valueOf();
    }
};
exports.typeAuthenticatedUser = typeAuthenticatedUser;
//# sourceMappingURL=sharedHelper.js.map