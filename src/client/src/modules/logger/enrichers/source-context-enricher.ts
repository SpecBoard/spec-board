import { Type } from '@angular/core';
import { LogLabel } from '../models/types';
import { LogEnricher } from './log-enricher';

export class SourceContextEnricher implements LogEnricher {
  public static sourceContext?: Type<unknown>;

  enrich(label: LogLabel): void {
    if (!SourceContextEnricher.sourceContext) return;

    label['SourceContext'] = SourceContextEnricher.sourceContext.name.replace('_', '');
  }
}

export function sourceContext(type: Type<unknown>, action: () => void) {
  SourceContextEnricher.sourceContext = type;
  action();
}
