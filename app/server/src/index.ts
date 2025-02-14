import { join } from 'path';
import { readFileSync } from 'fs';
import express from 'express';
import serveStatic from 'serve-static';
import { shopify } from './core/config/shopify.config.js';
import webhooksRouter from './routes/webhook.route.js';
import productRouter from './routes/product.route.js';
import logger from './core/logger/logger.js';
import { validateShopifyWebhookHmac } from './core/middleware/validateShopifyHmac.js';
import ignoreRoutes from './core/middleware/ignoreRoutes.js';
import rollbarConfig from './core/config/rollbar.config.js';
import { configDotenv } from 'dotenv';
import appConfig from './core/config/app.config.js';
import scheduler from './core/config/cron.config.js';

configDotenv({
  path: '../../../.env',
});

// If you are adding routes outside of the /api path, remember to
// also add a proxy rule for them in web/frontend/vite.config.js

const app = express();

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot(),
);

// App proxy api routes
// app.use('/proxy', validateShopifyProxyHmac);

// App webhook routes
app.use('/webhooks', express.text({ type: '*/*' }), validateShopifyWebhookHmac, webhooksRouter);

// App api routes
app.use('/api/*', ignoreRoutes(shopify.validateAuthenticatedSession()));

// App json middleware
app.use(express.json());

// App product routes
app.use(productRouter);

// App csp headers
app.use(shopify.cspHeaders());

// App static files
app.use(serveStatic(appConfig.STATIC_PATH, { index: false }));

// App index route
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

// App cron jobs
scheduler();

// App server listener
app.listen(appConfig.PORT, () => {
  logger.debug(`Server is running on port: ${appConfig.PORT}`);
});

// App rollbar error handler
app.use(rollbarConfig.errorHandler());

// App uncaught exception handler
process.on('uncaughtException', error => {
  if (error instanceof Error) logger.error(error.message, { stack: error.stack });
});

// App unhandled rejection handler
process.on('unhandledRejection', error => {
  if (error instanceof Error) logger.error(error.message, { stack: error.stack });
});
