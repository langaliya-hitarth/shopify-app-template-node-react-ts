import Rollbar from 'rollbar';

export class RollbarConfig {
  private static instance: RollbarConfig | null = null;
  private static rollbar: Rollbar | null = null;

  private constructor() {
    if (!process.env.ROLLBAR_TOKEN) {
      console.warn('ROLLBAR_TOKEN is not defined. Error tracking will be disabled.');
      return;
    }

    RollbarConfig.rollbar = new Rollbar({
      accessToken: process.env.ROLLBAR_TOKEN,
      captureUncaught: true,
      captureUnhandledRejections: true,
      environment: process.env.NODE_ENV || 'development',
    });

    this.setupTerminationHandlers();
  }

  public static getInstance(): Rollbar | null {
    if (!RollbarConfig.instance) {
      RollbarConfig.instance = new RollbarConfig();
    }
    return RollbarConfig.rollbar;
  }

  private setupTerminationHandlers(): void {
    ['SIGTERM', 'SIGINT', 'SIGUSR2'].forEach(signal => {
      process.once(signal, () => {
        this.close();
        process.exit(0);
      });
    });

    process.once('beforeExit', this.close.bind(this));
  }

  private close(): void {
    if (RollbarConfig.rollbar) {
      RollbarConfig.rollbar.wait(() => {
        RollbarConfig.rollbar = null;
        RollbarConfig.instance = null;
      });
    }
  }
}

// Export the Rollbar instance
export default RollbarConfig.getInstance();
