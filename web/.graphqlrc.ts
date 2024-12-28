import { ApiType, shopifyApiProject } from '@shopify/api-codegen-preset';
import { LATEST_API_VERSION } from '@shopify/shopify-api';

export default {
  // For syntax highlighting / auto-complete when writing operations
  schema: 'https://shopify.dev/admin-graphql-direct-proxy/' + LATEST_API_VERSION,
  documents: ['./src/core/graphql/**/*.{js,ts}'],
  projects: {
    schema: 'https://shopify.dev/admin-graphql-direct-proxy/' + LATEST_API_VERSION,
    documents: ['./src/core/graphql/**/*.{js,ts}'],
    default: shopifyApiProject({
      apiType: ApiType.Admin,
      apiVersion: LATEST_API_VERSION,
      documents: ['./src/core/graphql/**/*.{js,ts}'],
      outputDir: './src/core/graphql/generated',
    }),
  },
};
