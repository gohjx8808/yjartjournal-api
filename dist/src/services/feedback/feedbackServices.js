"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveFeedback = void 0;
const feedbackRepository_1 = require("../../repositories/feedbackRepository");
const saveFeedback = async (payload) => {
    const feedbackCreated = await (0, feedbackRepository_1.insertNewFeedback)(payload);
    return feedbackCreated;
};
exports.saveFeedback = saveFeedback;
//# sourceMappingURL=feedbackServices.js.map