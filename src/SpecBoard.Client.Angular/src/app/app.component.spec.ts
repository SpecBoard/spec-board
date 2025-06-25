import { createComponentFactory } from '@ngneat/spectator/jest';
import { byTestId } from '@ngneat/spectator';
import { AppComponent } from './app.component';
import { NavigationService } from '../modules/core/services/navigation.service';
import { LoggerService } from '../modules/logger/logger.service';

describe('AppComponent', () => {
  const createCUT = createComponentFactory({
    component: AppComponent,
    mocks: [NavigationService, LoggerService],
  });

  it('[UNIT][APC-001]: Log-In', () => {
    // Arrange
    const cut = createCUT();

    const spy = jest.spyOn(cut.inject(NavigationService), 'toLogIn');

    // Act
    cut.click(byTestId('btnLogIn'));

    // Assert
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
