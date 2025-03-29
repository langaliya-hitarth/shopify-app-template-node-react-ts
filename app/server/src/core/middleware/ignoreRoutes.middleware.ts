import type { Request, Response, NextFunction } from 'express';
import { shopify } from '@config/shopify.config.js';

/**
 * Add any routes that should be ignored to the array which should also be added to @config/shopify.config.js
 */
const ignoredRoutes = [shopify.config.webhooks.path, shopify.proxy.path];

const ignoreRoutes = (middleware: (req: Request, res: Response, next: NextFunction) => void) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Check if the current route matches any ignored route
    const shouldIgnore = ignoredRoutes.some(route => req.baseUrl.startsWith(route));
    if (!shouldIgnore) {
      // Apply the middleware for other routes
      return middleware(req, res, next);
    }
    // Skip the middleware for ignored routes
    next();
  };
};

export default ignoreRoutes;
