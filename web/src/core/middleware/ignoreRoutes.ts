import type { Request, Response, NextFunction } from 'express';
import { shopify } from '../config/shopify.config.js';
const ignoredRoutes = [shopify.config.webhooks.path, shopify.proxy.path];

const ignoreRoutes = (middleware: (req: Request, res: Response, next: NextFunction) => void) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Check if the current route matches any ignored route
    const shouldIgnore = ignoredRoutes.some(route => req.baseUrl.startsWith(route));
    if (!shouldIgnore) {
      // Apply the middleware for other routes
      console.log('Not Ignored', req.baseUrl);
      return middleware(req, res, next);
    }
    console.log('Ignored', req.baseUrl);
    // Skip the middleware for ignored routes
    next();
  };
};

export default ignoreRoutes;
