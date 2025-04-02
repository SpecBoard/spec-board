import { LogLevel } from './types';

export class LogEntry {
  public timestamp: number = Date.now();
  public level: LogLevel;
  public message: string;
  public error: Error | undefined;

  public labels: LogLevel[];

  constructor(level: LogLevel, message: string, error: Error | undefined = undefined, labels: LogLabel[] = []) {
    this.level = level;
    this.message = message;
    this.error = error;
    this.labels = labels;
  }

  public static verbose(message: string) {
    return new LogEntry(LogLevel.Verbose, message);
  }

  public static debug(message: string) {
    return new LogEntry(LogLevel.Debug, message);
  }

  public static information(message: string) {
    return new LogEntry(LogLevel.Information, message);
  }

  public static warning(message: string) {
    return new LogEntry(LogLevel.Warning, message);
  }

  public static error(message: string, error: Error | undefined) {
    return new LogEntry(LogLevel.Error, message, error);
  }
}
