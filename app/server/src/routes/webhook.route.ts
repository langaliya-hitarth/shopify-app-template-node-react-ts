import express from 'express';
import { shopify } from '@config/shopify.config.js';
import PrivacyWebhookController from '@controllers/webhook/privacy.webhook.controller.js';
import ProductWebhookController from '@controllers/webhook/product.webhook.controller.js';
import shopifyUtils from '@utils/shopify.utils.js';
import type { WebhookDefinitions } from '@generated/routes.types.js';
import logger from '@utils/logger/logger.utils.js';

const webhookDefinitions: WebhookDefinitions = {
  /* Privacy Webhooks */
  CUSTOMERS_DATA_REQUEST: {
    execute: PrivacyWebhookController.customerDataRequest,
    path: '/customers/data-request',
  },
  CUSTOMERS_REDACT: {
    execute: PrivacyWebhookController.customersRedact,
    path: '/customers/redact',
  },
  SHOP_REDACT: {
    execute: PrivacyWebhookController.shopRedact,
    path: '/shop/redact',
  },

  /* Product Webhooks */
  PRODUCTS_CREATE: {
    execute: ProductWebhookController.productsCreate,
    path: '/products/create',
  },
};

const webhooksRouter = express.Router();

// Add logging middleware
webhooksRouter.use((req, _, next) => {
  logger.debug('Webhook request received:', {
    path: req.path,
    method: req.method,
    originalUrl: req.originalUrl,
    headers: {
      'x-shopify-topic': req.headers['x-shopify-topic'],
      'x-shopify-hmac-sha256': req.headers['x-shopify-hmac-sha256'],
      'x-shopify-shop-domain': req.headers['x-shopify-shop-domain'],
    },
  });
  next();
});

// Process webhooks
webhooksRouter.post(
  '*',
  shopify.processWebhooks({
    webhookHandlers: await shopifyUtils.wrapWebhookHandlers(webhookDefinitions),
  }),
);

export default webhooksRouter;
