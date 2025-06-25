import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideOAuthClient } from 'angular-oauth2-oidc';

import { defaultConfiguration, provideConfiguration, provideOptions } from '@mihben/ngx-configuration';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideBrowserLogEnricher, provideConsoleDriver, provideLogger, provideLokiDriver, provideSourceContextLogEnricher } from '../modules/logger/providers';
import { LoggerOptions } from '../modules/logger/options/logger-options';
import { LokiDriverOptions } from '../modules/logger/options/loki-driver-options';
import { ConsoleDriverOptions } from '../modules/logger/options/console-driver-options';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { Light as LightTheme } from './presets';
import { GithubOptions } from '../modules/core/options/auth-options';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: LightTheme,
      },
    }),

    provideHttpClient(withInterceptorsFromDi()),

    provideConfiguration((builder) => defaultConfiguration(builder, 'Development')),

    provideOptions(LoggerOptions, (builder) => builder.bind('logging').validateDecorators()),
    provideOptions(LokiDriverOptions, (builder) =>
      builder
        .bind('logging:loki')
        .validateDecorators()
        .configure((options, configuration) => {
          options.labels = {
            Application: configuration.get('logging:loki:labels:Application'),
            Service: configuration.get('logging:loki:labels:Service'),
            Environment: configuration.get('logging:loki:labels:Environment'),
          };
        })
    ),
    provideOptions(ConsoleDriverOptions, (builder) => builder.bind('logging:console').validateDecorators()),
    provideLogger(),
    provideSourceContextLogEnricher(),
    provideBrowserLogEnricher(),
    provideLokiDriver(),
    provideConsoleDriver(),

    provideOAuthClient(),
    provideOptions(GithubOptions, (builder) => builder.bind('authorization:github').validateDecorators()),
  ],
};
