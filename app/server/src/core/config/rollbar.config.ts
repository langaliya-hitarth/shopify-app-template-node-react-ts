import Rollbar from 'rollbar';

// Rollbar config
const rollbarConfig = new Rollbar({
  accessToken: process.env.ROLLBAR_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
});

export default rollbarConfig;
