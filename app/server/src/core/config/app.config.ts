import { resolve } from 'path';

// App port
export const PORT: number = parseInt(process.env.BACKEND_PORT || process.env.PORT || '3000', 10);

// App static path
export const STATIC_PATH: string = resolve(
  process.env.NODE_ENV === 'production' ? '../../dist/client' : '../client',
);

// App config
const appConfig = {
  PORT,
  STATIC_PATH,
};

export default appConfig;
