import { LogLabel, LogLevel } from '../models/types';

export interface LokiDriverOptions {
  url: string;
  labels: LogLabel;
  level: LogLevel;

  bufferSize: number;
  pushInterval: number;
}
