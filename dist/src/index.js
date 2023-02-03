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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config({ path: './.env' });
const express_1 = __importDefault(require("express"));
const dataSource_1 = require("./dataSource");
const accountRouter_1 = require("./routers/accountRouter");
const feedbackRouter_1 = require("./routers/feedbackRouter");
const productRouter_1 = require("./routers/productRouter");
const userRouter_1 = require("./routers/userRouter");
var cors = require('cors');
const app = (0, express_1.default)();
dataSource_1.dataSource.initialize().then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield dataSource_1.dataSource.runMigrations();
    const port = 3000;
    app.use(cors());
    app.use(express_1.default.json());
    app.get('/', (_req, _res) => {
        _res.send('TypeScript With Express');
    });
    app.use('/products', productRouter_1.productRouter);
    app.use('/feedbacks', feedbackRouter_1.feedbackRouter);
    app.use('/users', userRouter_1.userRouter);
    app.use('/account', accountRouter_1.accountRouter);
    app.listen(port);
}));
//# sourceMappingURL=index.js.map