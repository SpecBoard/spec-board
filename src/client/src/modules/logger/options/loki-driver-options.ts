import { LogLabel } from '../models/types';

export interface LokiDriverOptions {
  url: string;
  labels: LogLabel;
  bufferSize: number;
  pushInterval: number;
}
