import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideEventPlugins } from '@taiga-ui/event-plugins';

import { routes } from './app.routes';
import { ProjectStore } from '../stores/project.store.service';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { ProjectService } from '../modules/project/services/project.service';

import { provideConsoleDriver, provideLogger, provideLokiDriver } from '../modules/logger/providers';
import { LogLevel } from '../modules/logger/models/types';
import { LogHttpInterceptor } from '../modules/logger/interceptors/log-http-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    ProjectStore,
    ProjectService,
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    provideEventPlugins(),
    provideLogger((options) => (options.level = LogLevel.Verbose)),
    provideConsoleDriver((options) => (options.level = LogLevel.Information)),
    provideLokiDriver((options) => {
      options.url = 'https://loki.mihben.site/';
      options.labels = {
        Application: 'SpecBoard',
        Component: 'Client',
        Environment: 'Development',
      };
    }),
    { provide: HTTP_INTERCEPTORS, useClass: LogHttpInterceptor, multi: true },
  ],
};
