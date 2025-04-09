import { LogLevel } from '../models/types';

export class ConsoleDriverOptions {
  public level: LogLevel = LogLevel.Information;
  public format = '[{timestamp} {level}] {message}';
}
