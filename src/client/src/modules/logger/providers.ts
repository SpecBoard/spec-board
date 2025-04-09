import { Provider } from '@angular/core';
import { LoggerService } from './logger.service';
import { LoggerOptions } from './options/logger-options';
import { ConsoleDriverOptions } from './options/console-driver-options';
import { ConsoleDriver } from './drivers/console-driver';
import { LokiDriverOptions } from './options/loki-driver-options';
import { LokiDriver } from './drivers/loki-driver';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { BrowserLogEnricher } from './enrichers/browser-log-enricher';
import { SourceContextEnricher } from './enrichers/source-context-enricher';
import { LogHttpInterceptor } from './interceptors/log-http-interceptor';

export const LOG_DRIVER = 'LogDriver';
export const LOG_ENRICHER = 'LogEnricher';

export function provideLogger(): Provider[] {
  return [
    {
      provide: LoggerService,
      useClass: LoggerService,
      deps: [LOG_DRIVER, LOG_ENRICHER, LoggerOptions],
    },
  ];
}

export function provideConsoleDriver(): Provider[] {
  return [
    {
      provide: LOG_DRIVER,
      useClass: ConsoleDriver,
      deps: [ConsoleDriverOptions],
      multi: true,
    },
  ];
}

export function provideLokiDriver(): Provider[] {
  return [{ provide: LOG_DRIVER, useClass: LokiDriver, deps: [HttpClient, LokiDriverOptions], multi: true }];
}

export function provideBrowserLogEnricher(): Provider[] {
  return [{ provide: LOG_ENRICHER, useClass: BrowserLogEnricher, multi: true }];
}

export function provideSourceContextLogEnricher(): Provider[] {
  return [{ provide: LOG_ENRICHER, useClass: SourceContextEnricher, multi: true }];
}

export function provideHttpLogInterceptor(): Provider[] {
  return [{ provide: HTTP_INTERCEPTORS, useClass: LogHttpInterceptor, deps: [LoggerService], multi: true }];
}
