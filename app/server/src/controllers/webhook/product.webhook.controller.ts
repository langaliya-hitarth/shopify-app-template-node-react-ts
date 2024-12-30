import logger from '../../core/logger/logger.js';
import type { WebhookRequestParams } from '../../core/types/routes.types.js';

const productsCreate = async ({ body }: WebhookRequestParams) => {
  if (!body) throw new Error('Missing Payload');
  const payload = JSON.parse(body);
  logger.info('Webhook payload', { payload });
};

const ProductWebhookController = {
  productsCreate,
};

export default ProductWebhookController;
