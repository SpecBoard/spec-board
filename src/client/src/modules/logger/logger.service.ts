import { Inject, Injectable } from '@angular/core';
import { LogDriver } from './drivers/log-driver';
import { LoggerOptions } from './options/logger-options';
import { LogLabel, LogLevel } from './models/types';
import { LogEnricher } from './enrichers/log-enricher';
import { LOG_DRIVER, LOG_ENRICHER } from './providers';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  private readonly _expression = '{.[^}]*}';

  constructor(@Inject(LOG_DRIVER) private readonly drivers: LogDriver[], @Inject(LOG_ENRICHER) private readonly enrichers: LogEnricher[], @Inject('LoggerOptions') private readonly options: LoggerOptions) {}

  public verbose(message: string, ...params: unknown[]) {
    if (this.options.level > LogLevel.Verbose) return;

    for (const driver of this.drivers) {
      void this.logAsync(() => {
        const labels = this.getLabels(message, params);
        for (const enricher of this.enrichers) enricher.enrich(labels);
        driver.verbose(message, labels);
      });
    }
  }

  public debug(message: string, ...params: unknown[]) {
    if (this.options.level > LogLevel.Debug) return;

    for (const driver of this.drivers) {
      void this.logAsync(() => {
        const labels = this.getLabels(message, params);
        for (const enricher of this.enrichers) enricher.enrich(labels);
        driver.debug(message, labels);
      });
    }
  }

  public information(message: string, ...params: unknown[]) {
    if (this.options.level > LogLevel.Information) return;

    for (const driver of this.drivers) {
      void this.logAsync(() => {
        const labels = this.getLabels(message, params);
        for (const enricher of this.enrichers) enricher.enrich(labels);
        driver.information(message, labels);
      });
    }
  }

  public warning(message: string, ...params: unknown[]) {
    if (this.options.level > LogLevel.Warning) return;

    for (const driver of this.drivers) {
      void this.logAsync(() => {
        const labels = this.getLabels(message, params);
        for (const enricher of this.enrichers) enricher.enrich(labels);
        driver.warning(message, labels);
      });
    }
  }

  public error(message: string, error: Error | undefined = undefined, ...params: unknown[]) {
    if (this.options.level > LogLevel.Error) return;

    for (const driver of this.drivers) {
      void this.logAsync(() => {
        const labels = this.getLabels(message, params);
        for (const enricher of this.enrichers) enricher.enrich(labels);
        driver.error(message, labels, error);
      });
    }
  }

  protected logAsync(func: () => void): Promise<void> {
    return new Promise(() => {
      func();
    });
  }

  protected getLabels(template: string, values: unknown[]): LogLabel {
    const result: LogLabel = {};

    const expression = new RegExp(this._expression);
    let iteration = 0;
    let value = template;
    for (let placeholder = expression.exec(value); placeholder; placeholder = expression.exec(value)) {
      result[placeholder[0].replace('{', '').replace('}', '').trim()] = String(values[iteration++]);
      value = value.replace(placeholder[0], '');
    }

    return result;
  }
}
