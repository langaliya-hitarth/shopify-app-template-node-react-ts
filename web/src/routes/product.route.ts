import express from 'express';
import ProductController from '../controllers/product.controller.js';

const productRouter = express.Router();
productRouter.get('/api/products/count', ProductController.getProductCount);
productRouter.post('/api/products', ProductController.createProducts);

export default productRouter;
