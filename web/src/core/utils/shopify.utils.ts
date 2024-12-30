import { DeliveryMethod } from '@shopify/shopify-api';
import type { WebhookHandler } from '@shopify/shopify-api';
import type { WebhookHandlersParam } from '@shopify/shopify-app-express';
import type { WebhookCallbackHandler, WebhookDefinitions } from '../types/routes.types.js';
import logger from '../logger/logger.js';

/**
 * Helper function to create webhook handlers
 *  */
const createWebhookHandler = (handler: WebhookCallbackHandler): WebhookHandler => ({
  deliveryMethod: DeliveryMethod.Http,
  callbackUrl: `/webhooks/${handler.path?.replace(/^\/|\/$/g, '') || ''}`,
  callback: async (topic, shopDomain, body, webhookId, apiVersion, subTopic, context) => {
    // This ensures a clean async call with the appropriate handler
    logger.info('In Webhook Custom Handler', { handler });
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

/**
 * Function to wrap webhook handlers with Shopify integration
 */
export const wrapWebhookHandlers = async (
  handlers: WebhookDefinitions,
): Promise<WebhookHandlersParam> => {
  const wrappedHandlers: WebhookHandlersParam = {};

  for (const [topic, { execute, path }] of Object.entries(handlers)) {
    wrappedHandlers[topic] = createWebhookHandler({ execute, path });
  }

  return wrappedHandlers;
};

const shopifyUtils = {
  wrapWebhookHandlers,
};

export default shopifyUtils;
