import { BillingInterval, LATEST_API_VERSION } from '@shopify/shopify-api';
import type { BillingConfig } from '@shopify/shopify-api';
import type { ShopifyApp } from '@shopify/shopify-app-express';
import { shopifyApp } from '@shopify/shopify-app-express';
import { restResources } from '@shopify/shopify-api/rest/admin/2024-10';
import { prismaSessionStorage } from './prisma.config.js';
import type { ShopifyAppConfig } from '../types/shopify.types.js';

// This is an example configuration that would do a one-time charge for $5 (only USD is currently supported)
const billingConfig = (include = false): BillingConfig | undefined => {
  return include
    ? {
        'My Shopify One-Time Charge': {
          amount: 5.0,
          currencyCode: 'USD',
          interval: BillingInterval.OneTime,
        },
      }
    : undefined;
};

const shopifyAppInstance: ShopifyApp = shopifyApp({
  api: {
    apiVersion: LATEST_API_VERSION,
    restResources,
    future: {
      customerAddressDefaultFix: true,
      lineItemBilling: true,
      unstable_managedPricingSupport: true,
    },
    billing: billingConfig(), // or replace with billingConfig(true) above to enable example billing
  },
  auth: {
    path: '/api/auth',
    callbackPath: '/api/auth/callback',
  },
  webhooks: {
    path: '/webhooks',
  },
  proxy: {
    path: '/proxy',
  },
  sessionStorage: prismaSessionStorage,
});

export const shopify: ShopifyAppConfig = {
  ...shopifyAppInstance,
  proxy: {
    path: '/proxy',
  },
};

const shopifyConfig = {
  shopify,
};

export default shopifyConfig;
