import { Router } from '@angular/router';
import { createServiceFactory } from '@ngneat/spectator';
import { NavigationService } from './navigation.service';

describe('NavigationService', () => {
  const createSUT = createServiceFactory({
    service: NavigationService,
    providers: [Router],
  });

  it('[UNIT][RTN-001]: Navigate to LogIn', () => {
    // Arrange
    const sut = createSUT();

    const spy = jest.spyOn(sut.inject(Router), 'navigate');

    // Act
    sut.service.toLogIn();

    // Assert
    expect(spy).toHaveBeenCalledWith(['login']);
  });
});
