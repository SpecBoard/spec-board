import { LogLabel, LogLevel } from '../models/types';

export class LokiDriverOptions {
  public url!: string;
  public labels: LogLabel = {
    Application: 'Application',
    Component: 'Client',
    Environment: 'Development',
  };
  public level: LogLevel = LogLevel.Information;

  public bufferSize = 50;
  public pushInterval = 5000;
}
