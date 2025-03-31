import { Routes } from '@angular/router';
import { HomePageComponent } from '../pages/home.page.component';
import { SummaryPageComponent } from '../modules/project/pages/summary.page.component';

export const routes: Routes = [
  {
    path: 'project/:key',
    component: SummaryPageComponent,
  },
  {
    path: '',
    component: HomePageComponent,
  },
];
