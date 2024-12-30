import { shopify } from '../config/shopify.config.js';
import type { Request, Response, NextFunction } from 'express';
import logger from '../logger/logger.js';
import { isInvalid } from '../utils/validation.utils.js';
import crypto from 'crypto';
import type { ParsedQs } from 'qs';
import { findSessionByShop } from '../../repositories/session.repository.js';

function validateHMAC(
  input: crypto.BinaryLike,
  secret: crypto.BinaryLike,
  signature: string | ParsedQs | string[] | ParsedQs[],
  shop: string,
) {
  // Calculate HMAC
  logger.debug(`Calculating HMAC for shop: ${shop}`);
  const hmac = crypto.createHmac('sha256', secret).update(input).digest('hex');
  const digest = Buffer.from(hmac, 'utf-8');
  const checksum = Buffer.from(signature as string, 'utf-8');

  return digest.length === checksum.length && crypto.timingSafeEqual(digest, checksum);
}

export const validateShopifyWebhookHmac = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const webhook = await shopify.api.webhooks.validate({
    rawBody: req.body,
    rawRequest: req,
    rawResponse: res,
  });

  try {
    if (!webhook.valid) {
      res.status(400);
      throw new Error('Invalid webhook payload');
    } else {
      const session = await findSessionByShop(webhook.domain);

      if (isInvalid(session)) {
        res.status(401);
        throw new Error(`Unauthorized request`);
      }

      res.locals.shopify = {
        ...res.locals.shopify,
        session,
      };

      next();
    }
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.message, { stack: error.stack });
      res.send(error.message);
    } else {
      res.status(500).send('Something went wrong');
    }
  }
};

export const validateShopifyProxyHmac = async (req: Request, res: Response, next: NextFunction) => {
  const { signature = '', ...queryParams } = req.query;
  console.log('Received request', req.query);
  const secret = shopify.api.config.apiSecretKey;
  const shop = queryParams.shop as string;

  const input = Object.entries(queryParams)
    .sort()
    .map(([key, value]) => `${key}=${value}`)
    .join('');

  try {
    if (!validateHMAC(input, secret, signature, shop)) {
      res.status(400);
      throw new Error('Invalid webhook payload');
    } else {
      const session = findSessionByShop(shop);

      if (isInvalid(session)) {
        res.status(401);
        throw new Error(`Unauthorized request`);
      }

      res.locals.shopify = {
        ...res.locals.shopify,
        session,
      };

      next();
    }
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.message, { stack: error.stack });
      res.send(error.message);
    } else {
      res.status(500).send('Something went wrong');
    }
  }
};

const validateShopifyHmac = {
  validateShopifyWebhookHmac,
};

export default validateShopifyHmac;
