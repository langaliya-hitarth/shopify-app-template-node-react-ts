import type { WebhookRequestParams } from '../../core/types/routes.types.js';

const customerDataRequest = async ({ body }: WebhookRequestParams) => {
  if (!body) throw new Error('Missing Payload');
  // const payload = JSON.parse(body);
};

const customersRedact = async ({ body }: WebhookRequestParams) => {
  if (!body) throw new Error('Missing Payload');
  // const payload = JSON.parse(body);
};

const shopRedact = async ({ body }: WebhookRequestParams) => {
  if (!body) throw new Error('Missing Payload');
  // const payload = JSON.parse(body);
};

const PrivacyWebhookController = {
  customerDataRequest,
  customersRedact,
  shopRedact,
};

export default PrivacyWebhookController;
