// Define the log levels
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  NONE = 4,
}

// ANSI color codes
const COLORS = {
  RESET: "\x1b[0m",
  RED: "\x1b[31m",
  YELLOW: "\x1b[33m",
  BLUE: "\x1b[34m",
  GRAY: "\x1b[90m",
};

// Current log level (can be changed at runtime)
let currentLogLevel: LogLevel = LogLevel.INFO;

// Set the log level
export function setLogLevel(level: LogLevel): void {
  currentLogLevel = level;
}

// The main logger object
export const Logger = {
  debug: (...args: any[]): void => {
    if (currentLogLevel <= LogLevel.DEBUG) {
      console.log(COLORS.GRAY, "🔍 [DEBUG]", ...args, COLORS.RESET);
    }
  },

  info: (...args: any[]): void => {
    if (currentLogLevel <= LogLevel.INFO) {
      console.log(COLORS.BLUE, "ℹ️ [INFO]", ...args, COLORS.RESET);
    }
  },

  warn: (...args: any[]): void => {
    if (currentLogLevel <= LogLevel.WARN) {
      console.warn(COLORS.YELLOW, "⚠️ [WARN]", ...args, COLORS.RESET);
    }
  },

  error: (...args: any[]): void => {
    if (currentLogLevel <= LogLevel.ERROR) {
      console.error(COLORS.RED, "❌ [ERROR]", ...args, COLORS.RESET);
    }
  },
};

export default Logger;
