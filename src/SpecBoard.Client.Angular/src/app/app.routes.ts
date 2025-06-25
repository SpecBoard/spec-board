import { Routes } from '@angular/router';
import { LoginPage } from '../modules/core/pages/login/login.page';
import { HomePage } from '../modules/core/pages/home/home.page';
import { LoginCallbackPage } from '../modules/core/pages/login/login-callback.page';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'login/callback',
    component: LoginCallbackPage,
  },
  {
    path: '',
    component: HomePage,
  },
];
