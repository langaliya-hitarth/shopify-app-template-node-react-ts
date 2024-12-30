import Rollbar from 'rollbar';

const rollbarConfig = new Rollbar({
  accessToken: process.env.ROLLBAR_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
});

export default rollbarConfig;
