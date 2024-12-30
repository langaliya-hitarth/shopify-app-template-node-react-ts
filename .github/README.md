# Shopify App Template for Node + React (Typescript)

This is a template is heavily inspired from [shopify-app-template-node](https://github.com/Shopify/shopify-app-template-node) and is used for building a [Shopify app](https://shopify.dev/docs/apps/getting-started) using Node and React in Typescript. It contains the basics for building a Shopify app.

## Benefits

The Node app template comes with the following out-of-the-box functionality:

- OAuth: Installing the app and granting permissions
- GraphQL Admin API: Querying or mutating Shopify admin data
- GraphQL Admin API Types: Types are generated run-time for all the queries and mutations within server's graphql directory.
- REST Admin API: Resource classes to interact with the API
- Shopify-specific tooling:
  - AppBridge
  - Polaris
  - Webhooks with HMAC verification middleware
  - App Proxy with HMAC verification middleware
- Typescript Configuration: Recommended rules for typescript are implied by default 
- Linting and Formatting: Leveraging [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) to enforce linting rules and formatting code on pre-commit using [Husky](https://typicode.github.io/husky/) and [Lint-Staged](https://github.com/lint-staged/lint-staged).
- Logging: This template leverages the popular Winston library to provide a robust logging solution. It supports logging to multiple tools and services, including:
  - Prisma
  - Rollbar
  - Console

## Tech Stack

This template combines a number of third party open-source tools:

- [Express](https://expressjs.com/) builds the backend.
- [Prisma](https://www.prisma.io/) to talk with the database
- [Vite](https://vitejs.dev/) builds the [React](https://reactjs.org/) frontend.
- [Typescript](https://www.typescriptlang.org/) to enforce types.
- [React Router](https://reactrouter.com/) is used for routing. We wrap this with file-based routing.
- [React Query](https://react-query.tanstack.com/) queries the Admin API.
- [`i18next`](https://www.i18next.com/) and related libraries are used to internationalize the frontend.
  - [`react-i18next`](https://react.i18next.com/) is used for React-specific i18n functionality.
  - [`i18next-resources-to-backend`](https://github.com/i18next/i18next-resources-to-backend) is used to dynamically load app translations.
  - [`@formatjs/intl-localematcher`](https://formatjs.io/docs/polyfills/intl-localematcher/) is used to match the user locale with supported app locales.
  - [`@formatjs/intl-locale`](https://formatjs.io/docs/polyfills/intl-locale) is used as a polyfill for [`Intl.Locale`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale) if necessary.
  - [`@formatjs/intl-pluralrules`](https://formatjs.io/docs/polyfills/intl-pluralrules) is used as a polyfill for [`Intl.PluralRules`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules) if necessary.
- [Winston](https://github.com/winstonjs/winston) for logging to different services
- [Rollbar](https://rollbar.com/) for error logging and monitoring in real-time

The following Shopify tools complement these third-party tools to ease app development:

- [Shopify API library](https://github.com/Shopify/shopify-node-api) adds OAuth to the Express backend. This lets users install the app and grant scope permissions.
- [App Bridge React](https://shopify.dev/docs/apps/tools/app-bridge/getting-started/using-react) adds [authentication to API requests](https://shopify.dev/docs/api/app-bridge-library/apis/resource-fetching) in the frontend and renders components outside of the App’s iFrame.
- [Polaris React](https://polaris.shopify.com/) is a powerful design system and component library that helps developers build high quality, consistent experiences for Shopify merchants.
- [File-based routing](https://github.com/Shopify/shopify-frontend-template-react/blob/main/Routes.jsx) makes creating new pages easier.
- [`@shopify/i18next-shopify`](https://github.com/Shopify/i18next-shopify) is a plugin for [`i18next`](https://www.i18next.com/) that allows translation files to follow the same JSON schema used by Shopify [app extensions](https://shopify.dev/docs/apps/checkout/best-practices/localizing-ui-extensions#how-it-works) and [themes](https://shopify.dev/docs/themes/architecture/locales/storefront-locale-files#usage).

## Getting started

### Requirements

1. You must [download and install Node.js](https://nodejs.org/en/download/) if you don't already have it.
1. You must [create a Shopify partner account](https://partners.shopify.com/signup) if you don’t have one.
1. You must create a store for testing if you don't have one, either a [development store](https://help.shopify.com/en/partners/dashboard/development-stores#create-a-development-store) or a [Shopify Plus sandbox store](https://help.shopify.com/en/partners/dashboard/managing-stores/plus-sandbox-store).

#### Local Development

[The Shopify CLI](https://shopify.dev/docs/apps/tools/cli) connects to an app in your Partners dashboard. It provides environment variables, runs commands in parallel, and updates application URLs for easier development.

You can develop locally using npm package manager. Run one of the following commands from the root of your app.

Using npm:

```shell
npm run dev
```

Open the URL generated in your console. Once you grant permission to the app, you can start development.

## Deployment

### Application Storage

This template uses [MySQL](https://www.mysql.com/) to store session data, with [Prisma](https://www.prisma.io/) as the ORM to manage database interactions efficiently.

The choice of database depends on your app's data requirements and query patterns. You can either host your database on your own server or use a SaaS provider for managed hosting.

If you'd prefer to use a different form of storage for session data, you’ll need to update the session storage configuration accordingly. For guidance, refer to the list of available [SessionStorage adapter packages](https://github.com/Shopify/shopify-api-js/blob/main/packages/shopify-api/docs/guides/session-storage.md).

### Build

Proper configuration is required to build and run the app. You can find the necessary configurations on your app's page in the Shopify Partners Dashboard.

Copy and paste your app's configurations into the .env file to ensure the app functions correctly.

## Developer resources

- [Introduction to Shopify apps](https://shopify.dev/docs/apps/getting-started)
- [App authentication](https://shopify.dev/docs/apps/auth)
- [Shopify CLI](https://shopify.dev/docs/apps/tools/cli)
- [Shopify CLI command reference](https://shopify.dev/apps/tools/cli/app)
- [Shopify API Library documentation](https://github.com/Shopify/shopify-api-js#readme)
- [Getting started with internationalizing your app](https://shopify.dev/docs/apps/best-practices/internationalization/getting-started)
  - [i18next](https://www.i18next.com/)
    - [Configuration options](https://www.i18next.com/overview/configuration-options)
  - [react-i18next](https://react.i18next.com/)
    - [`useTranslation` hook](https://react.i18next.com/latest/usetranslation-hook)
    - [`Trans` component usage with components array](https://react.i18next.com/latest/trans-component#alternative-usage-components-array)
  - [i18n-ally VS Code extension](https://marketplace.visualstudio.com/items?itemName=Lokalise.i18n-ally)
