"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config({ path: './.env' });
const cloudinary_1 = require("cloudinary");
const express_1 = __importDefault(require("express"));
const dataSource_1 = require("./dataSource");
const accountRouter_1 = __importDefault(require("./routers/accountRouter"));
const addressRouter_1 = __importDefault(require("./routers/addressRouter"));
const adminRouter_1 = __importDefault(require("./routers/admin/adminRouter"));
const stockRouter_1 = __importDefault(require("./routers/admin/stockRouter"));
const dashboardRouter_1 = __importDefault(require("./routers/dashboardRouter"));
const feedbackRouter_1 = __importDefault(require("./routers/feedbackRouter"));
const forgotPasswordRouter_1 = __importDefault(require("./routers/forgotPasswordRouter"));
const orderRouter_1 = __importDefault(require("./routers/orderRouter"));
const productRouter_1 = __importDefault(require("./routers/productRouter"));
const userRouter_1 = __importDefault(require("./routers/userRouter"));
var cors = require('cors');
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});
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
app.use('/dashboard', dashboardRouter_1.default);
app.use('/admin', adminRouter_1.default);
app.listen(port);
//# sourceMappingURL=index.js.map