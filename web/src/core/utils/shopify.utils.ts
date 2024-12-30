import { DeliveryMethod } from '@shopify/shopify-api';
import type { WebhookHandler } from '@shopify/shopify-api';
import type { WebhookHandlersParam } from '@shopify/shopify-app-express';
import type { WebhookCallbackHandler, WebhookDefinitions } from '../types/routes.types.js';
import logger from '../logger/logger.js';

const GID_TYPE_REGEXP = /^gid:\/\/[\w-]+\/([\w-]+)\//;
const GID_REGEXP = /\/(\w[\w-]*)(?:\?(.*))*$/;

/**
 * Parses the type from a Shopify Global ID (gid).
 * @param gid - The Shopify gid string.
 * @returns The extracted type from the gid.
 * @throws If the gid is invalid.
 */
export const parseGidType = (gid: string) => {
  const matches = GID_TYPE_REGEXP.exec(gid);
  if (matches && matches[1] !== undefined) {
    return matches[1];
  }
  throw new Error(`Invalid gid: ${gid}`);
};

/**
 * Parses the ID from a Shopify Global ID (gid).
 * @param gid - The Shopify gid string.
 * @returns The extracted ID from the gid.
 * @throws If the gid is invalid.
 */
export const parseGid = (gid: string) => {
  // Prepends forward slash to help identify invalid IDs
  const id = `/${gid}`;
  const matches = GID_REGEXP.exec(id);
  if (matches && matches[1] !== undefined) {
    return matches[1];
  }
  throw new Error(`Invalid gid: ${gid}`);
};

/**
 * Parses the ID and query parameters from a Shopify Global ID (gid).
 * @param gid - The Shopify gid string.
 * @returns An object containing the extracted ID and query parameters.
 * @throws If the gid is invalid.
 */
export const parseGidWithParams = (gid: string) => {
  const id = `/${gid}`;
  const matches = GID_REGEXP.exec(id);
  if (matches && matches[1] !== undefined) {
    const params =
      matches[2] === undefined ? {} : Object.fromEntries(new URLSearchParams(matches[2]));
    return {
      id: matches[1],
      params,
    };
  }
  throw new Error(`Invalid gid: ${gid}`);
};

/**
 * Factory function to create a Shopify Global ID (gid) composer.
 * @param namespace - The namespace to use in the gid.
 * @returns A function that creates gids based on the provided namespace.
 */
export const composeGidFactory = (namespace: string) => {
  return (key: string, id: string, params = {}) => {
    const gid = `gid://${namespace}/${key}/${id}`;
    const paramKeys = Object.keys(params);
    if (paramKeys.length === 0) {
      return gid;
    }
    const paramString = new URLSearchParams(params).toString();
    return `${gid}?${paramString}`;
  };
};

/**
 * Preconfigured Shopify gid composer using the 'shopify' namespace.
 */
export const composeGid = composeGidFactory('shopify');

/**
 * Factory function to validate Shopify Global IDs (gids).
 * @param namespace - The namespace to validate against.
 * @returns A function that validates gids based on the provided namespace.
 */
export const isGidFactory = (namespace: string) => {
  return (gid: string, key: string) => {
    if (!gid.startsWith(`gid://${namespace}/`)) {
      return false;
    }
    try {
      if (key !== undefined && parseGidType(gid) !== key) {
        return false;
      }
    } catch {
      return false;
    }

    const id = `/${gid}`;
    return GID_REGEXP.test(id);
  };
};

/**
 * Preconfigured Shopify gid validator using the 'shopify' namespace.
 */
export const isGid = isGidFactory('shopify');

/**
 * Extracts nodes from a collection of edges.
 * @param edges - The array of edges containing nodes.
 * @param level - The depth level for recursive extraction of nodes from edges.
 * @returns An array of extracted nodes.
 */
export const nodesFromEdges = (edges, level = 0) => {
  return edges.flatMap(({ node }) => {
    const nodeKeys = Object.keys(node);
    if (level >= 1) {
      nodeKeys.forEach(key => {
        if (Array.isArray(node[key]?.edges)) {
          node[key] = nodesFromEdges(node[key].edges);
        }
      });
    }
    return node;
  });
};

/**
 * Extracts a specific key's values from nodes within edges.
 * @param edges - The array of edges containing nodes.
 * @param key - The key to extract values for.
 * @returns An array of extracted values for the specified key.
 */
export const keyFromEdges = (edges, key) => {
  return edges.map(({ node }) => node[key]);
};

/**
 * Creates a webhook handler for Shopify webhooks.
 * @param handler - The callback handler for the webhook.
 * @returns A Shopify WebhookHandler.
 */
const createWebhookHandler = (handler: WebhookCallbackHandler): WebhookHandler => ({
  deliveryMethod: DeliveryMethod.Http,
  callbackUrl: `/webhooks/${handler.path?.replace(/^\/|\/$/g, '') || ''}`,
  callback: async (topic, shopDomain, body, webhookId, apiVersion, subTopic, context) => {
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
 * Wraps a collection of webhook handlers with Shopify integration.
 * @param handlers - The webhook definitions to wrap.
 * @returns A promise resolving to a collection of wrapped webhook handlers.
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
  parseGidType,
  parseGid,
  parseGidWithParams,
  composeGidFactory,
  composeGid,
  isGidFactory,
  isGid,
  nodesFromEdges,
  keyFromEdges,
};

export default shopifyUtils;
