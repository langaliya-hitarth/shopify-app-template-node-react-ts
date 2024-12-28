export interface WebhookRequestParams {
  topic: string;
  shopDomain: string;
  body: string;
  webhookId: string;
  apiVersion?: string;
  subTopic?: string;
  context?: unknown;
}

export interface WebhookCallbackHandler {
  execute: (params: WebhookRequestParams) => Promise<void>;
  url?: string | '/api/webhooks';
}

export interface WebhookDefinitions {
  [key: string]: WebhookCallbackHandler;
}
