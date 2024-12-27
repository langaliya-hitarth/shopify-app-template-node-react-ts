import { GraphqlQueryError, Session } from "@shopify/shopify-api";
import shopify from "../../core/config/shopify.js";
import { Request, Response } from "express";
import { productCreate, productsCount } from "../../core/graphql/products.js";

const ADJECTIVES: string[] = [
  "autumn",
  "hidden",
  "bitter",
  "misty",
  "silent",
  "empty",
  "dry",
  "dark",
  "summer",
  "icy",
  "delicate",
  "quiet",
  "white",
  "cool",
  "spring",
  "winter",
  "patient",
  "twilight",
  "dawn",
  "crimson",
  "wispy",
  "weathered",
  "blue",
  "billowing",
  "broken",
  "cold",
  "damp",
  "falling",
  "frosty",
  "green",
  "long",
];

const NOUNS: string[] = [
  "waterfall",
  "river",
  "breeze",
  "moon",
  "rain",
  "wind",
  "sea",
  "morning",
  "snow",
  "lake",
  "sunset",
  "pine",
  "shadow",
  "leaf",
  "dawn",
  "glitter",
  "forest",
  "hill",
  "cloud",
  "meadow",
  "sun",
  "glade",
  "bird",
  "brook",
  "butterfly",
  "bush",
  "dew",
  "dust",
  "field",
  "fire",
  "flower",
];

const prod = "test";

const DEFAULT_PRODUCTS_COUNT: number = 5;

const ProductRouteHandler = {
  async getProductCount(req: Request, res: Response): Promise<void> {
    const session: Session = res.locals.shopify.session;
    const client = new shopify.api.clients.Graphql({ session });

    try {
      const countData = await client.request(productsCount);
      res.status(200).send({ count: countData.data?.productsCount.count });
    } catch (error) {
      console.error(
        `Failed to fetch product count: ${(error as Error).message}`
      );
      res.status(500).send({ error: (error as Error).message });
    }
  },

  async createProducts(req: Request, res: Response): Promise<void> {
    const session: Session = res.locals.shopify.session;
    const client = new shopify.api.clients.Graphql({ session });
    let status: number = 200;
    let error: string | null = null;

    try {
      const count: number = req.body.count || DEFAULT_PRODUCTS_COUNT;
      for (let i = 0; i < count; i++) {
        await client.request(productCreate, {
          variables: {
            product: {
              title: randomTitle(),
            },
          },
        });
      }
      res.status(status).send({ success: true });
    } catch (e) {
      console.error(`Failed to create products: ${(e as Error).message}`);
      status = 500;
      error = (e as Error).message;
      res.status(status).send({ success: false, error });
    }
  },
};

function randomTitle(): string {
  const adjective: string =
    ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const noun: string = NOUNS[Math.floor(Math.random() * NOUNS.length)];
  return `${adjective} ${noun}`;
}

export default ProductRouteHandler;
