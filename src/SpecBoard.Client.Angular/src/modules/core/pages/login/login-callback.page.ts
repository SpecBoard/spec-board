import { Component } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-login-callback',
  imports: [],
  templateUrl: './login-callback.page.html',
  styleUrl: './login-callback.page.scss',
})
export class LoginCallbackPage {
  constructor(private readonly navigationService: NavigationService) {
    this.navigationService.back();
  }
}
