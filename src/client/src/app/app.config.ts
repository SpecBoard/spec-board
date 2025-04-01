import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideEventPlugins } from '@taiga-ui/event-plugins';

import { routes } from './app.routes';
import { ProjectStore } from '../stores/project.store.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { ProjectService } from '../modules/project/services/project.service';

import { Level } from '../modules/logger/logger.service';
import { provideConsoleDriver, provideLogger } from '../modules/logger/providers';
import { LokiDriver } from '../modules/logger/drivers/loki-driver';
import { LokiDriverOptions } from '../modules/logger/drivers/loki-driver-options';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    ProjectStore,
    ProjectService,
    provideHttpClient(),
    provideAnimations(),
    provideEventPlugins(),
    provideLogger((options) => (options.level = Level.Verbose)),
    provideConsoleDriver((options) => (options.level = Level.Information)),
    {
      provide: 'LogDriver',
      useClass: LokiDriver,
      deps: [HttpClient, 'LokiDriverOptions'],
      multi: true,
    },
    {
      provide: 'LokiDriverOptions',
      useFactory: () => {
        const result: LokiDriverOptions = {
          url: 'https://loki.mihben.site/',
          labels: [
            { key: 'Application', value: 'SpecBoard' },
            { key: 'Component', value: 'Client' },
            { key: 'Environment', value: 'Development' },
          ],
        };
        return result;
      },
    },
  ],
};
