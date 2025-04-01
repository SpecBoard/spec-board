import { Provider } from '@angular/core';
import { Level, LoggerService } from './logger.service';
import { LoggerOptions } from './options/logger-options';
import { ConsoleDriverOptions } from './options/console-driver-options';
import { ConsoleDriver } from './drivers/console-driver';

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
          level: Level.Verbose,
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
          level: Level.Warning,
          format: '[{timestamp} {level}] {message}',
        };
        configure(result);
        return result;
      },
    },
  ];
}
