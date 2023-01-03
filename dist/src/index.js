"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config({ path: './.env' });
const express_1 = __importDefault(require("express"));
const dataSource_1 = require("./dataSource");
const productRouter_1 = require("./routers/productRouter");
dataSource_1.dataSource.initialize().then(() => {
    dataSource_1.dataSource.runMigrations();
});
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.get('/', (_req, _res) => {
    _res.send('TypeScript With Express');
});
app.use('/products', productRouter_1.productRouter);
app.listen(port);
//# sourceMappingURL=index.js.map