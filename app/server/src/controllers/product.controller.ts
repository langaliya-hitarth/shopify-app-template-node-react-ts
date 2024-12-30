import { Session } from '@shopify/shopify-api';
import type { Request, Response } from 'express';
import productService from '../services/product.service.js';

const ProductController = {
  async getProductCount(req: Request, res: Response): Promise<void> {
    try {
      const session: Session = res.locals.shopify.session;
      const count = await productService.getProductCount(session);
      res.status(200).send({ count });
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send({ error: err?.message || 'Failed to fetch product count' });
      }
    }
  },

  async createProducts(req: Request, res: Response): Promise<void> {
    try {
      const session: Session = res.locals.shopify.session;
      const count = req.body.count || 1;
      await productService.createProducts(session, count);
      res.status(200).send({ success: true });
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send({ error: err?.message || 'Failed to create products' });
      }
    }
  },
};

export default ProductController;
