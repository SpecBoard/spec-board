import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { ButtonModule } from 'primeng/button';
import { GithubOptions } from '../../options/auth-options';

@Component({
  selector: 'app-login',
  imports: [ButtonModule],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss',
})
export class LoginPage {
  constructor(
    private readonly githubOptions: GithubOptions,
    private readonly oauthService: OAuthService
  ) {}

  public login(): void {
    this.oauthService.loginUrl = this.githubOptions.loginUrl;
    this.oauthService.redirectUri = this.githubOptions.redirectUri;
    this.oauthService.clientId = this.githubOptions.clientId;
    this.oauthService.scope = this.githubOptions.scope;
    this.oauthService.oidc = this.githubOptions.oidc;

    this.oauthService.initCodeFlow();
  }
}
