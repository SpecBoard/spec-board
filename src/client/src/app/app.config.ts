import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideEventPlugins } from '@taiga-ui/event-plugins';

import { routes } from './app.routes';
import { ProjectStore } from '../stores/project.store.service';
import { provideHttpClient } from '@angular/common/http';
import { ProjectService } from '../modules/project/services/project.service';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), ProjectStore, ProjectService, provideHttpClient(), provideAnimations(), provideEventPlugins()],
};
