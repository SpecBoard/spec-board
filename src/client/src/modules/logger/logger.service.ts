import { Inject, Injectable } from '@angular/core';
import { LogDriver } from './drivers/log-driver';
import { LoggerOptions } from './options/logger-options';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  constructor(@Inject('LogDriver') private readonly drivers: LogDriver[], @Inject('LoggerOptions') private readonly options: LoggerOptions) {}

  public verbose(message: string, ...params: string[]) {
    if (this.options.level > Level.Verbose) return;

    for (const driver of this.drivers) {
      driver.verbose(message, ...params);
    }
  }

  public debug(message: string, ...params: unknown[]) {
    if (this.options.level > Level.Debug) return;

    for (const driver of this.drivers) {
      driver.debug(message, ...params);
    }
  }

  public information(message: string, ...params: string[]) {
    if (this.options.level > Level.Information) return;

    for (const driver of this.drivers) {
      driver.information(message, ...params);
    }
  }

  public warning(message: string, ...params: string[]) {
    if (this.options.level > Level.Warning) return;

    for (const driver of this.drivers) {
      driver.warning(message, ...params);
    }
  }

  public error(message: string, error: Error | undefined = undefined, ...params: string[]) {
    if (this.options.level > Level.Error) return;

    for (const driver of this.drivers) {
      driver.error(message, error, ...params);
    }
  }
}

export enum Level {
  Verbose = 1,
  Debug = 2,
  Information = 3,
  Warning = 4,
  Error = 5,

  Off = 6,
}
