import { LoginPage } from './login.page';
import { byTestId, createComponentFactory } from '@ngneat/spectator/jest';
import { GithubOptions } from '../../options/auth-options';
import { OAuthService } from 'angular-oauth2-oidc';
import { faker } from '@faker-js/faker';

describe('LoginPage', () => {
  const createCUT = createComponentFactory({
    component: LoginPage,
    mocks: [GithubOptions, OAuthService],
  });

  it('[UNIT][LGP-001]: Login via GitHub', () => {
    // Arrange
    const cut = createCUT();
    const optionsMock = cut.inject(GithubOptions);
    const oauthServiceMock = cut.inject(OAuthService);

    optionsMock.loginUrl = faker.internet.url();
    optionsMock.redirectUri = faker.internet.url();
    optionsMock.clientId = faker.string.uuid();
    optionsMock.scope = faker.string.alpha(10);
    optionsMock.oidc = faker.datatype.boolean();

    const spy = jest.spyOn(oauthServiceMock, 'initCodeFlow');

    // Act
    cut.click(byTestId('btnGithub'));

    // Assert
    expect(oauthServiceMock.loginUrl).toEqual(optionsMock.loginUrl);
    expect(oauthServiceMock.redirectUri).toEqual(optionsMock.redirectUri);
    expect(oauthServiceMock.clientId).toEqual(optionsMock.clientId);
    expect(oauthServiceMock.scope).toEqual(optionsMock.scope);
    expect(oauthServiceMock.oidc).toEqual(optionsMock.oidc);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
