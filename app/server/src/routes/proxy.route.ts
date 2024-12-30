import express from 'express';
import ProductController from '../controllers/product.controller.js';
import logger from '../core/logger/logger.js';
import type { Request, Response } from 'express';
import type { ProxyDefinitions } from '../core/types/routes.types.js';

// Proxy definitions
const proxyDefinitions: ProxyDefinitions[] = [
  {
    execute: ProductController.getProductCount,
    path: '/products/count',
  },
];

const proxyRouter = express.Router();

// Add logging middleware
proxyRouter.use((req, res, next) => {
  logger.debug('Proxy request received:', {
    path: req.path,
    method: req.method,
    originalUrl: req.originalUrl,
  });
  next();
});

proxyDefinitions.forEach(proxyDefinition => {
  proxyRouter.post(proxyDefinition.path, async (req: Request, res: Response) => {
    await proxyDefinition.execute(req, res);
  });
});

export default proxyRouter;
