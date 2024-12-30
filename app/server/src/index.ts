import { join } from 'path';
import { readFileSync } from 'fs';
import express from 'express';
import serveStatic from 'serve-static';
import { shopify } from './core/config/shopify.config.js';
import appConfig from './core/config/app.config.js';
import webhooksRouter from './routes/webhook.route.js';
import productRouter from './routes/product.route.js';
import logger from './core/logger/logger.js';
import { validateShopifyWebhookHmac } from './core/middleware/validateShopifyHmac.js';
import ignoreRoutes from './core/middleware/ignoreRoutes.js';
import rollbarConfig from './core/config/rollbar.config.js';
import { configDotenv } from 'dotenv';

configDotenv({
  path: '../../../.env',
});

// If you are adding routes outside of the /api path, remember to
// also add a proxy rule for them in web/frontend/vite.config.js

//TODO: Setup husky

const app = express();

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot(),
);

app.use('/webhooks', express.text({ type: '*/*' }), validateShopifyWebhookHmac, webhooksRouter);

// app.use('/proxy', validateShopifyProxyHmac);

app.use('/api/*', ignoreRoutes(shopify.validateAuthenticatedSession()));

app.use(express.json());

app.use(productRouter);

app.use(shopify.cspHeaders());
app.use(serveStatic(appConfig.STATIC_PATH, { index: false }));

app.use('/*', ignoreRoutes(shopify.ensureInstalledOnShop()), async (_req, res) => {
  res
    .status(200)
    .set('Content-Type', 'text/html')
    .send(
      readFileSync(join(appConfig.STATIC_PATH, 'index.html'))
        .toString()
        .replace('%VITE_SHOPIFY_API_KEY%', process.env.SHOPIFY_API_KEY || ''),
    );
});

app.listen(appConfig.PORT, () => {
  logger.debug(`Server is running on port: ${appConfig.PORT}`);
});

app.use(rollbarConfig.errorHandler());

process.on('uncaughtException', error => {
  if (error instanceof Error) logger.error(error.message, { stack: error.stack });
});

process.on('unhandledRejection', error => {
  if (error instanceof Error) logger.error(error.message, { stack: error.stack });
});
