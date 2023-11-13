"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sharedHelper_1 = require("../../../helpers/sharedHelper");
const DeleteUserMiddleware = () => async (req, res, next) => {
    const payload = req.body;
    const user = (0, sharedHelper_1.typeAuthenticatedUser)(req);
    if (payload.userId === user.id) {
        return res.status(403).json({ message: 'Cannot delete self.' });
    }
    next();
};
exports.default = DeleteUserMiddleware;
//# sourceMappingURL=DeleteUserMiddleware.js.map