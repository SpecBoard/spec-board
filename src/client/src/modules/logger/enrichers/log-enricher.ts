import { LogLabel } from '../models/types';

export interface LogEnricher {
  enrich(label: LogLabel): void;
}
