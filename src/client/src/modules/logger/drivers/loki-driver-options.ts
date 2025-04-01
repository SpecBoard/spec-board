import { LogLabel } from './log-driver';

export interface LokiDriverOptions {
  url: string;
  labels: LogLabel[];
}
