import type { WebhookRequestParams } from '@generated/routes.types.js';
import logger from '@utils/logger/logger.utils.js';

const productsCreate = async ({ body }: WebhookRequestParams) => {
  if (!body) throw new Error('Missing Payload');
  const payload = JSON.parse(body);
  logger.info('Webhook payload', { payload });
};

const ProductWebhookController = {
  productsCreate,
};

export default ProductWebhookController;
