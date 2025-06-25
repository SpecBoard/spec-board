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

  it('[UNIT][RTN-003]: Navigate back', () => {
    // Arrange
    const sut = createSUT();

    const spy = jest.spyOn(sut.inject(Router), 'navigate');

    // Act
    sut.service.back();

    // Assert
    expect(spy).toHaveBeenCalledWith(['..']);
  });
});
