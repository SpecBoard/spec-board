import { range, required, valueOfEnum } from '@mihben/ngx-configuration';
import { LogLabel, LogLevel } from '../models/types';

export class LokiDriverOptions {
  @required()
  public url!: string;
  public labels: LogLabel = {
    Application: 'SpecBoard',
    Component: 'Client',
    Environment: 'Development',
  };
  @valueOfEnum(LogLevel)
  public level: LogLevel = LogLevel.Information;

  @range({ min: 1 })
  public bufferSize = 50;
  @range({ min: 1000 })
  public pushInterval = 5000;
}
