import { Provider } from '@angular/core';
import { LoggerService } from './logger.service';
import { LoggerOptions } from './options/logger-options';
import { ConsoleDriverOptions } from './options/console-driver-options';
import { ConsoleDriver } from './drivers/console-driver';
import { LokiDriverOptions } from './drivers/loki-driver-options';
import { LokiDriver } from './drivers/loki-driver';
import { HttpClient } from '@angular/common/http';
import { LogLevel } from './models/types';

export function provideLogger(configure: (options: LoggerOptions) => void = () => {}): Provider[] {
  return [
    {
      provide: LoggerService,
      useClass: LoggerService,
      deps: ['LogDriver', 'LoggerOptions'],
    },
    {
      provide: 'LoggerOptions',
      useFactory: () => {
        const result: LoggerOptions = {
          level: LogLevel.Verbose,
        };
        configure(result);
        return result;
      },
    },
  ];
}

export function provideConsoleDriver(configure: (options: ConsoleDriverOptions) => void = () => {}): Provider[] {
  return [
    {
      provide: 'LogDriver',
      useClass: ConsoleDriver,
      deps: ['ConsoleDriverOptions'],
      multi: true,
    },
    {
      provide: 'ConsoleDriverOptions',
      useFactory: () => {
        const result: ConsoleDriverOptions = {
          level: LogLevel.Warning,
          format: '[{timestamp} {level}] {message}',
        };
        configure(result);
        return result;
      },
    },
  ];
}

export function provideLokiDriver(configure: (otpions: LokiDriverOptions) => void = () => {}): Provider[] {
  return [
    { provide: 'LogDriver', useClass: LokiDriver, deps: [HttpClient, 'LokiDriverOptions'], multi: true },
    {
      provide: 'LokiDriverOptions',
      useFactory: () => {
        const result: LokiDriverOptions = {
          labels: {},
          url: '',
        };
        configure(result);
        return result;
      },
    },
  ];
}
