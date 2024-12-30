export const PORT: number = parseInt(process.env.BACKEND_PORT || process.env.PORT || '3000', 10);

export const STATIC_PATH: string =
  process.env.NODE_ENV === 'production'
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

const appConfig = {
  PORT,
  STATIC_PATH,
};

export default appConfig;
