"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config({ path: './.env' });
const express_1 = __importDefault(require("express"));
const accountRouter_1 = __importDefault(require("./routers/accountRouter"));
const addressRouter_1 = __importDefault(require("./routers/addressRouter"));
const feedbackRouter_1 = __importDefault(require("./routers/feedbackRouter"));
const forgotPasswordRouter_1 = __importDefault(require("./routers/forgotPasswordRouter"));
const orderRouter_1 = __importDefault(require("./routers/orderRouter"));
const productRouter_1 = __importDefault(require("./routers/productRouter"));
const stockRouter_1 = __importDefault(require("./routers/stock/stockRouter"));
const userRouter_1 = __importDefault(require("./routers/userRouter"));
const dataSource_1 = require("./dataSource");
var cors = require('cors');
const app = (0, express_1.default)();
const port = 3000;
app.use(cors());
app.use(express_1.default.json());
app.use(async (_req, _res, next) => {
    if (!dataSource_1.dataSource.isInitialized) {
        await dataSource_1.dataSource.initialize();
    }
    return next();
});
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
// export default app;
//# sourceMappingURL=index.js.map