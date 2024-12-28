import { DeliveryMethod } from '@shopify/shopify-api';
import type { HttpWebhookHandlerWithCallback } from '@shopify/shopify-api';
import type { WebhookHandlersParam } from '@shopify/shopify-app-express';
import type { WebhookCallbackHandler, WebhookDefinitions } from '../../routes/routes.js';

// Helper function to create webhook handlers
const createWebhookHandler = (handler: WebhookCallbackHandler): HttpWebhookHandlerWithCallback => ({
  deliveryMethod: DeliveryMethod.Http,
  callbackUrl: handler.url || 'api/webhooks',
  callback: async (topic, shopDomain, body, webhookId, apiVersion, subTopic, context) => {
    // This ensures a clean async call with the appropriate handler
    await handler.execute({
      topic,
      shopDomain,
      body,
      webhookId,
      apiVersion,
      subTopic,
      context,
    });
  },
});

// Function to wrap webhook handlers with Shopify integration
const wrapWebhookHandlers = (handlers: WebhookDefinitions): WebhookHandlersParam => {
  const wrappedHandlers: WebhookHandlersParam = {};

  for (const [topic, { execute, url }] of Object.entries(handlers)) {
    wrappedHandlers[topic] = createWebhookHandler({ execute, url });
  }

  return wrappedHandlers;
};

export { wrapWebhookHandlers };
