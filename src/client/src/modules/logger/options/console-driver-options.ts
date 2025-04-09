import { valueOfEnum } from '@mihben/ngx-configuration';
import { LogLevel } from '../models/types';

export class ConsoleDriverOptions {
  @valueOfEnum(LogLevel)
  public level: LogLevel = LogLevel.Information;
  public format = '[{timestamp} {level}] {message}';
}
