import { GraphqlClient, Session } from '@shopify/shopify-api';
import shopify from '../core/config/shopify.config.js';
import { productCreate, productsCount } from '../core/graphql/products.js';

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
    await client.request(productCreate, {
      variables: {
        product: {
          title: randomTitle(),
        },
      },
    });
  }
};

// Function to generate a random title
const randomTitle = (): string => {
  const adjective: string =
    ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)] || 'defaultAdjective';
  const noun: string = NOUNS[Math.floor(Math.random() * NOUNS.length)] || 'defaultNoun';
  return `${adjective} ${noun}`;
};

const productService = {
  getProductCount,
  createProducts,
};

export default productService;
