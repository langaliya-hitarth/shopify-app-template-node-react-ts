import type { Request, Response, NextFunction } from 'express';
import logger from '../logger/logger.js';
import { shopify } from '../config/shopify.config.js';
import { isInvalid } from '../utils/validation.utils.js';
import { createSHA256HMAC, HashFormat } from '@shopify/shopify-api/runtime';

const timingSafeEqual = (bufA: ArrayBuffer, bufB: ArrayBuffer): boolean => {
  const viewA = new Uint8Array(bufA);
  const viewB = new Uint8Array(bufB);

  let out = 0;
  for (let i = 0; i < viewA.length; i++) {
    out |= (viewA[i] ?? 0) ^ (viewB[i] ?? 0);
  }
  return out === 0;
};

const safeCompare = async (
  input: { [k: string]: string },
  secret: string,
  signature: string,
  shop: string,
) => {
  if (input.signature) {
    delete input.signature;
  }

  const serializedInput = Object.entries(input)
    .sort(([val1], [val2]) => val1.localeCompare(val2))
    .reduce((acc, [key, value]) => {
      return `${acc}${key}=${Array.isArray(value) ? value.join(',') : value}`;
    }, '');

  // Calculate HMAC
  logger.debug(`Calculating HMAC for shop: ${shop}`);

  const hmac = await createSHA256HMAC(secret, serializedInput, HashFormat.Hex);

  const bufA = Buffer.from(hmac, 'utf-8');
  const bufB = Buffer.from(signature, 'utf-8');

  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
};

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
      const sessionId = shopify.api.session.getOfflineId(webhook.domain);
      const session = await shopify.config.sessionStorage.loadSession(sessionId);

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
  try {
    const secret = shopify.api.config.apiSecretKey;
    const baseUrl = `https://${req.get('host')}`;
    const url = new URL(req.url, baseUrl);

    let searchParams = new URLSearchParams(url.search);
    if (!searchParams.get('index')) {
      searchParams.delete('index');
    }

    const shop = url.searchParams.get('shop') || undefined;
    const signature = url.searchParams.get('signature') || undefined;

    logger.debug('Authenticating app proxy request', { shop });

    if (!shop || !signature) {
      res.status(401);
      throw new Error(`Unauthorized request`);
    }

    const input = Object.fromEntries(searchParams.entries());
    let isValid = await safeCompare(input, secret, signature, shop);

    if (!isValid) {
      const cleanPath = url.pathname.replace(/^\//, '').replace(/\/$/, '').replaceAll('/', '.');
      const data = `routes%2F${cleanPath}`;

      searchParams = new URLSearchParams(
        `?_data=${data}&${searchParams.toString().replace(/^\?/, '')}`,
      );

      isValid = await safeCompare(input, secret, signature, shop);

      if (!isValid) {
        searchParams = new URLSearchParams(
          `?_data=${data}._index&${url.search.replace(/^\?/, '')}`,
        );

        isValid = await safeCompare(input, secret, signature, shop);
      }
    }

    if (!isValid) {
      logger.debug('App proxy request has invalid signature', { shop });

      res.status(400);
      throw new Error('Bad Request');
    } else {
      const sessionId = shopify.api.session.getOfflineId(shop);
      const session = await shopify.config.sessionStorage.loadSession(sessionId);

      if (isInvalid(session)) {
        logger.debug('Could not find offline session', {
          shop,
          ...Object.fromEntries(url.searchParams.entries()),
        });
        res.status(401);
        throw new Error('Unauthorized request');
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
  validateShopifyProxyHmac,
};

export default validateShopifyHmac;
