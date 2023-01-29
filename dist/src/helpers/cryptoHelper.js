"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = void 0;
const crypto_1 = require("crypto");
const algorithm = 'aes-256-ctr';
const secretKey = process.env.ENCRYPT_TOKEN;
const encrypt = (text) => {
    const iv = (0, crypto_1.randomBytes)(16);
    const cipher = (0, crypto_1.createCipheriv)(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex'),
    };
};
exports.encrypt = encrypt;
const decrypt = (encrypted, iv) => {
    const decipher = (0, crypto_1.createDecipheriv)(algorithm, secretKey, Buffer.from(iv, 'hex'));
    const decrpyted = Buffer.concat([
        decipher.update(Buffer.from(encrypted, 'hex')),
        decipher.final(),
    ]);
    return decrpyted.toString();
};
exports.decrypt = decrypt;
//# sourceMappingURL=cryptoHelper.js.map