export interface LogLevels {
  fatal: number;
  error: number;
  warn: number;
  info: number;
  debug: number;
  [key: string]: number;
}

export interface LogEmojis {
  fatal: string;
  error: string;
  warn: string;
  info: string;
  debug: string;
}

export interface WinstonConfig {
  level: {
    cli: string;
    prisma: string;
    rollbar: string;
  };
  levels: LogLevels;
  emojis: LogEmojis;
}
