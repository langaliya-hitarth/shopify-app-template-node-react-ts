export interface LogLevels {
  fatal: number;
  error: number;
  warn: number;
  info: number;
  debug: number;
  [key: string]: number;
}

export interface WinstonConfig {
  level: {
    cli: string;
    prisma: string;
    rollbar: string;
  };
  levels: LogLevels;
}
