import { Inject, Injectable } from '@angular/core';
import { LogDriver } from './drivers/log-driver';
import { LoggerOptions } from './options/logger-options';
import { LogLabel, LogLevel } from './models/types';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  private readonly _expression = '{.[^}]*}';

  constructor(@Inject('LogDriver') private readonly drivers: LogDriver[], @Inject('LoggerOptions') private readonly options: LoggerOptions) {}

  public verbose(message: string, ...params: string[]) {
    if (this.options.level > LogLevel.Verbose) return;

    for (const driver of this.drivers) {
      void this.logAsync(() => driver.verbose(message, this.getLabels(message, params)));
    }
  }

  public debug(message: string, ...params: unknown[]) {
    if (this.options.level > LogLevel.Debug) return;

    for (const driver of this.drivers) {
      void this.logAsync(() => driver.debug(message, this.getLabels(message, params)));
    }
  }

  public information(message: string, ...params: string[]) {
    if (this.options.level > LogLevel.Information) return;

    for (const driver of this.drivers) {
      void this.logAsync(() => driver.information(message, this.getLabels(message, params)));
    }
  }

  public warning(message: string, ...params: string[]) {
    if (this.options.level > LogLevel.Warning) return;

    for (const driver of this.drivers) {
      void this.logAsync(() => driver.warning(message, this.getLabels(message, params)));
    }
  }

  public error(message: string, error: Error | undefined = undefined, ...params: string[]) {
    if (this.options.level > LogLevel.Error) return;

    for (const driver of this.drivers) {
      void this.logAsync(() => driver.error(message, this.getLabels(message, params), error));
    }
  }

  protected logAsync(func: () => void): Promise<void> {
    return new Promise(() => {
      func();

      return Promise.resolve();
    });
  }

  protected getLabels(template: string, values: unknown[]): LogLabel {
    const result: LogLabel = {};

    const expression = new RegExp(this._expression);
    let iteration = 0;
    let value = template;
    for (let placeholder = expression.exec(value); placeholder; placeholder = expression.exec(value)) {
      result[`${placeholder[0].replace('{', '').replace('}', '').trim()}`] = values[iteration++];
      value = value.replace(placeholder[0], '');
    }

    return result;
  }
}
