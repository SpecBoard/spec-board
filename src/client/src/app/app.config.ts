import { ApplicationConfig, ErrorHandler, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideEventPlugins } from '@taiga-ui/event-plugins';
import { environment } from '../environments/environment';

import { routes } from './app.routes';
import { ProjectStore } from '../stores/project.store.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ProjectService } from '../modules/project/services/project.service';

import { provideBrowserLogEnricher, provideConsoleDriver, provideHttpLogInterceptor, provideLogger, provideLokiDriver, provideSourceContextLogEnricher } from '../modules/logger/providers';
import { GlobalErrorHandler } from './global-error-handler';
import { TUI_ALERT_POSITION } from '@taiga-ui/core';

import { LoggerOptions } from '../modules/logger/options/logger-options';
import { ConsoleDriverOptions } from '../modules/logger/options/console-driver-options';
import { LokiDriverOptions } from '../modules/logger/options/loki-driver-options';

import { provideConfiguration, provideOptions } from '@mihben/ngx-configuration';
import { BackendOptions } from '../options/backendOptions';
import { NotificationService } from '../modules/shared/services/notification.service';
import { NotificationOptions } from '../modules/shared/options/notification-options';

export const appConfig: ApplicationConfig = {
  providers: [
    provideConfiguration((builder) => builder.registerJson('appsettings.json').registerJson(`appsettings.${environment.environment}.json`, true)),

    provideOptions(LoggerOptions, (builder) => builder.bind('logging').validateDecorators()),
    provideOptions(ConsoleDriverOptions, (builder) => builder.bind('logging:console').validateDecorators()),
    provideOptions(LokiDriverOptions, (builder) =>
      builder
        .bind('logging:loki')
        .validateDecorators()
        .configure((options, configuration) => {
          options.labels = {
            Application: configuration.get('logging:loki:labels:Application'),
            Component: configuration.get('logging:loki:labels:Component'),
            Environment: configuration.get('logging:loki:labels:Environment'),
          };
        })
    ),
    provideOptions(BackendOptions, (builder) => builder.bind('backend').validateDecorators()),

    provideOptions(NotificationOptions, (builder) => builder.bind('notification').validateDecorators()),

    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    ProjectStore,
    ProjectService,
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    provideEventPlugins(),

    provideLogger(),
    provideConsoleDriver(),
    provideLokiDriver(),
    provideBrowserLogEnricher(),
    provideSourceContextLogEnricher(),

    provideHttpLogInterceptor(),
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: TUI_ALERT_POSITION, useValue: 'auto auto 2rem auto' },

    { provide: NotificationService, useClass: NotificationService },
  ],
};
