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
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpUser = void 0;
const dataSource_1 = require("../../dataSource");
const cryptoHelper_1 = require("../../helpers/cryptoHelper");
const signUpUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const encryptedPassword = (0, cryptoHelper_1.encrypt)(payload.password);
    const response = dataSource_1.userRepository.insert(Object.assign(Object.assign({}, payload), { password: encryptedPassword.content, iv: encryptedPassword.iv }));
    return response;
});
exports.signUpUser = signUpUser;
//# sourceMappingURL=userServices.js.map