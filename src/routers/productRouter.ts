import app from 'express';

export const productRouter = app.Router()

productRouter.get('/', (_req, res) => {
    res.send('enter product router')
})