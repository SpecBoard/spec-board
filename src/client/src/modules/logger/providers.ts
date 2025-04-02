import { Provider } from '@angular/core';
import { LoggerService } from './logger.service';
import { LoggerOptions } from './options/logger-options';
import { ConsoleDriverOptions } from './options/console-driver-options';
import { ConsoleDriver } from './drivers/console-driver';
import { LokiDriverOptions } from './options/loki-driver-options';
import { LokiDriver } from './drivers/loki-driver';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { LogLevel } from './models/types';
import { BrowserLogEnricher } from './enrichers/browser-log-enricher';
import { SourceContextEnricher } from './enrichers/source-context-enricher';
import { LogHttpInterceptor } from './interceptors/log-http-interceptor';

export const LOG_DRIVER = 'LogDriver';
export const LOG_ENRICHER = 'LogEnricher';

export function provideLogger(configure: (options: LoggerOptions) => void = () => {}): Provider[] {
  return [
    {
      provide: LoggerService,
      useClass: LoggerService,
      deps: [LOG_DRIVER, LOG_ENRICHER, 'LoggerOptions'],
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
      provide: LOG_DRIVER,
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
    { provide: LOG_DRIVER, useClass: LokiDriver, deps: [HttpClient, 'LokiDriverOptions'], multi: true },
    {
      provide: 'LokiDriverOptions',
      useFactory: () => {
        const result: LokiDriverOptions = {
          labels: {},
          level: LogLevel.Information,
          url: '',
          bufferSize: 50,
          pushInterval: 5000,
        };
        configure(result);
        return result;
      },
    },
  ];
}

export function provideBrowserLogEnricher(): Provider[] {
  return [{ provide: LOG_ENRICHER, useClass: BrowserLogEnricher, multi: true }];
}

export function provideSourceContextLogEnricher(): Provider[] {
  return [{ provide: LOG_ENRICHER, useClass: SourceContextEnricher, multi: true }];
}

export function provideHttpLogInterceptor(): Provider[] {
  return [{ provide: HTTP_INTERCEPTORS, useClass: LogHttpInterceptor, multi: true }];
}
