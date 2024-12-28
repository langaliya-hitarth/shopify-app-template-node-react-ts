import express from 'express';
import shopify from '../core/config/shopify.config.js';
import PrivacyWebhookController from '../controllers/webhook/privacy.webhook.controller.js';
import ProductWebhookController from '../controllers/webhook/product.webhook.controller.js';
import { wrapWebhookHandlers } from '../core/utils/shopify.utils.js';
import type { WebhookDefinitions } from './routes.js';

// Define the webhook handlers with relevant methods
const webhookDefinitions: WebhookDefinitions = {
  CUSTOMERS_DATA_REQUEST: {
    execute: PrivacyWebhookController.customerDataRequest,
  },
  CUSTOMERS_REDACT: {
    execute: PrivacyWebhookController.customersRedact,
  },
  SHOP_REDACT: {
    execute: PrivacyWebhookController.shopRedact,
  },
  PRODUCTS_CREATE: {
    execute: ProductWebhookController.productsCreate,
    url: '/api/webhooks/products/create',
  },
};

// Set up the webhooks router
const webhooksRouter = express.Router();
webhooksRouter.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: wrapWebhookHandlers(webhookDefinitions) }),
);

export default webhooksRouter;
