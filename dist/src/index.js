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
const accountRouter_1 = __importDefault(require("./routers/accountRouter"));
const addressRouter_1 = __importDefault(require("./routers/addressRouter"));
const feedbackRouter_1 = __importDefault(require("./routers/feedbackRouter"));
const forgotPasswordRouter_1 = __importDefault(require("./routers/forgotPasswordRouter"));
const orderRouter_1 = __importDefault(require("./routers/orderRouter"));
const productRouter_1 = __importDefault(require("./routers/productRouter"));
const stockRouter_1 = __importDefault(require("./routers/stock/stockRouter"));
const userRouter_1 = __importDefault(require("./routers/userRouter"));
var cors = require('cors');
exports.default = dataSource_1.dataSource.initialize().then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield dataSource_1.dataSource.runMigrations();
    const port = 3000;
    const app = (0, express_1.default)();
    app.use(cors());
    app.use(express_1.default.json());
    app.get('/', (_req, _res) => {
        _res.send('TypeScript With Express');
    });
    app.use('/products', productRouter_1.default);
    app.use('/feedbacks', feedbackRouter_1.default);
    app.use('/users', userRouter_1.default);
    app.use('/account', accountRouter_1.default);
    app.use('/addresses', addressRouter_1.default);
    app.use('/orders', orderRouter_1.default);
    app.use('/forgot-password', forgotPasswordRouter_1.default);
    app.use('/stocks', stockRouter_1.default);
    app.listen(port);
}));
//# sourceMappingURL=index.js.map