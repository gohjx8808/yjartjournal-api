"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatImageFile = exports.typeAuthenticatedUser = void 0;
const typeAuthenticatedUser = (req) => {
    if (req.user) {
        return req.user.valueOf();
    }
};
exports.typeAuthenticatedUser = typeAuthenticatedUser;
const formatImageFile = (file) => {
    const b64 = Buffer.from(file.buffer).toString('base64');
    return `data:${file.mimetype};base64,${b64}`;
};
exports.formatImageFile = formatImageFile;
//# sourceMappingURL=sharedHelper.js.map