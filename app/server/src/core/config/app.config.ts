import { resolve } from 'path';

export const PORT: number = parseInt(process.env.BACKEND_PORT || process.env.PORT || '3000', 10);

export const STATIC_PATH: string = resolve(
  process.env.NODE_ENV === 'production' ? '../../dist/client' : '../client',
);

const appConfig = {
  PORT,
  STATIC_PATH,
};

export default appConfig;
