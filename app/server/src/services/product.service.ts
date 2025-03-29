import { GraphqlClient, Session } from '@shopify/shopify-api';

import { productCreate, productsCount } from '../graphql/products.js';
import { shopify } from '@config/shopify.config.js';

const ADJECTIVES: string[] = [
  'autumn',
  'hidden',
  'bitter',
  'misty',
  'silent',
  'empty',
  'dry',
  'dark',
  'summer',
  'icy',
  'delicate',
  'quiet',
  'white',
  'cool',
  'spring',
  'winter',
  'patient',
  'twilight',
  'dawn',
  'crimson',
  'wispy',
  'weathered',
  'blue',
  'billowing',
  'broken',
  'cold',
  'damp',
  'falling',
  'frosty',
  'green',
  'long',
];

const NOUNS: string[] = [
  'waterfall',
  'river',
  'breeze',
  'moon',
  'rain',
  'wind',
  'sea',
  'morning',
  'snow',
  'lake',
  'sunset',
  'pine',
  'shadow',
  'leaf',
  'dawn',
  'glitter',
  'forest',
  'hill',
  'cloud',
  'meadow',
  'sun',
  'glade',
  'bird',
  'brook',
  'butterfly',
  'bush',
  'dew',
  'dust',
  'field',
  'fire',
  'flower',
];

// Function to get GraphQL Client
const getGraphQLClient = (session: Session): GraphqlClient => {
  return new shopify.api.clients.Graphql({ session });
};

// Function to get product count
const getProductCount = async (session: Session): Promise<number> => {
  const client = getGraphQLClient(session);
  const countData = await client.request(productsCount);
  return countData.data?.productsCount.count || 0;
};

// Function to create products
const createProducts = async (session: Session, count: number): Promise<void> => {
  const client = getGraphQLClient(session);
  for (let i = 0; i < count; i++) {
    const response = await client.request(productCreate, {
      variables: {
        productSet: {
          title: randomTitle(),
          status: 'ACTIVE',
          productOptions: [
            {
              name: 'Color',
              position: 1,
              values: [
                {
                  name: 'Grey',
                },
                {
                  name: 'Black',
                },
              ],
            },
          ],
          variants: [
            {
              optionValues: [
                {
                  optionName: 'Color',
                  name: 'Grey',
                },
              ],
              price: randomPrice(),
              sku: randomSKU(),
              inventoryItem: {
                requiresShipping: true,
                tracked: true,
              },
              inventoryPolicy: 'CONTINUE',
              inventoryQuantities: [
                {
                  locationId: 'gid://shopify/Location/92982739250',
                  name: 'available',
                  quantity: 99999,
                },
              ],
            },
            {
              optionValues: [
                {
                  optionName: 'Color',
                  name: 'Black',
                },
              ],
              price: randomPrice(),
              sku: randomSKU(),
              inventoryItem: {
                requiresShipping: true,
                tracked: true,
              },
              inventoryPolicy: 'CONTINUE',
              inventoryQuantities: [
                {
                  locationId: 'gid://shopify/Location/92982739250',
                  name: 'available',
                  quantity: 99999,
                },
              ],
            },
          ],
        },
        synchronous: true,
      },
    });
    console.log(response.data?.productSet?.userErrors);
  }
};

const randomSKU = (): string => {
  const prefix = Math.random().toString(36).substring(2, 5);
  return `${prefix}-${Math.random().toString(36).substring(2, 8)}`.toUpperCase();
};

// const randomImagesFromArray = (): string => {
//   const images = [
//     'https://plus.unsplash.com/premium_photo-1661964088064-dd92eaaa7dcf?q=80&w=3424&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     'https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     'https://images.unsplash.com/photo-1605870445919-838d190e8e1b?q=80&w=3544&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     'https://plus.unsplash.com/premium_photo-1679513691641-9aedddc94f96?q=80&w=3200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     'https://images.unsplash.com/photo-1587590227264-0ac64ce63ce8?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     'https://images.unsplash.com/photo-1485550409059-9afb054cada4?q=80&w=2598&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//   ];
//   return images[Math.floor(Math.random() * images.length)] || (images[0] as string);
// };

const randomPrice = (): number => {
  return Number((Math.floor(Math.random() * 9999) + Math.random()).toFixed(2));
};

// Function to generate a random title
const randomTitle = (): string => {
  const adjective: string =
    ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)] || 'defaultAdjective';
  const noun: string = NOUNS[Math.floor(Math.random() * NOUNS.length)] || 'defaultNoun';
  return `${adjective.charAt(0).toUpperCase() + adjective.slice(1)} ${noun.charAt(0).toUpperCase() + noun.slice(1)}`;
};

const productService = {
  getProductCount,
  createProducts,
};

export default productService;
