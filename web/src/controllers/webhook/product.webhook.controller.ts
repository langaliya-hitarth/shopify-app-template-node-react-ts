import type { WebhookRequestParams } from '../../routes/routes.js';

const productsCreate = async ({ body }: WebhookRequestParams) => {
  if (!body) throw new Error('Missing Payload');
  // const payload = JSON.parse(body);
};

const ProductWebhookController = {
  productsCreate,
};

export default ProductWebhookController;
