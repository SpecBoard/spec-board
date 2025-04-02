import { LogLabel } from '../models/types';
import { LogEnricher } from './log-enricher';

export class BrowserLogEnricher implements LogEnricher {
  enrich(label: LogLabel): void {
    label['UserAgent'] = window.navigator.userAgent;
  }
}
