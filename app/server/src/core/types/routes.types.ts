import type { Request, Response } from 'express';

export type WebhookRequestParams = {
  topic: string;
  shopDomain: string;
  body: string;
  webhookId: string;
  apiVersion?: string;
  subTopic?: string;
  context?: unknown;
};

export type WebhookCallbackHandler = {
  execute: (params: WebhookRequestParams) => Promise<void>;
  path?: string;
};

export type WebhookDefinitions = {
  [key: string]: WebhookCallbackHandler;
};

export type ProxyDefinitions = {
  execute: (req: Request, res: Response) => Promise<void>;
  path: string;
};
