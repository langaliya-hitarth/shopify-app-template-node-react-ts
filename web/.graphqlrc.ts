import { ApiType, shopifyApiProject } from "@shopify/api-codegen-preset";
import { LATEST_API_VERSION } from "@shopify/shopify-api";

export default {
  // For syntax highlighting / auto-complete when writing operations
  schema:
    "https://shopify.dev/admin-graphql-direct-proxy/" + LATEST_API_VERSION,
  documents: ["./src/core/graphql/**/*.{js,ts,jsx,tsx}"],
  projects: {
    schema:
      "https://shopify.dev/admin-graphql-direct-proxy/" + LATEST_API_VERSION,
    documents: ["./src/core/graphql/**/*.{js,ts,jsx,tsx}"],
    default: shopifyApiProject({
      apiType: ApiType.Admin,
      apiVersion: LATEST_API_VERSION,
      documents: ["./src/core/graphql/**/*.{js,ts,jsx,tsx}"],
      outputDir: "./src/core/graphql/types",
    }),
  },
};
