import type { ShopifyApp } from '@shopify/shopify-app-express';

export interface ShopifyAppConfig extends ShopifyApp {
  proxy: {
    path: string;
  };
}
