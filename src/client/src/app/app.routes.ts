import { Routes } from '@angular/router';
import { HomePageComponent } from '../pages/home.page.component';
import { SummaryPageComponent } from '../modules/project/pages/summary.page.component';
import { UnexpectedErrorPageComponent } from '../pages/errors/unexpected-error/unexpected-error.page.component';
import { NotFoundComponent } from '../pages/errors/not-found/not-found.component';

export const routes: Routes = [
  {
    path: 'project/:key',
    component: SummaryPageComponent,
  },
  {
    path: 'error/unexpected-error',
    component: UnexpectedErrorPageComponent,
  },
  {
    path: 'error/not-found',
    component: NotFoundComponent,
  },
  {
    path: '',
    component: HomePageComponent,
  },
];
