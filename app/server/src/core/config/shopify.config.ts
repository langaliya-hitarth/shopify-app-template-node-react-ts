import { BillingInterval, LATEST_API_VERSION } from '@shopify/shopify-api';
import type { BillingConfig } from '@shopify/shopify-api';
import type { ShopifyApp } from '@shopify/shopify-app-express';
import { shopifyApp } from '@shopify/shopify-app-express';
import { restResources } from '@shopify/shopify-api/rest/admin/2024-10';
import { prismaSessionStorage } from '@config/prisma.config.js';
import type { ShopifyAppConfig } from '@generated/shopify.types.js';
import { getApiVersionKey } from '@utils/shopify.utils.js';

// Billing config
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
    apiVersion: process.env.SHOPIFY_API_VERSION
      ? getApiVersionKey(process.env.SHOPIFY_API_VERSION)
      : LATEST_API_VERSION,
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
