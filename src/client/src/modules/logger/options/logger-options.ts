import { valueOfEnum } from '@mihben/ngx-configuration';
import { LogLevel } from '../models/types';

export class LoggerOptions {
  @valueOfEnum(LogLevel)
  public level!: LogLevel;
}
