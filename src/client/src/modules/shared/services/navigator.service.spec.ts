import { NavigatorService } from './navigator.service';
import { createServiceFactory } from '@ngneat/spectator/jest';
import { Router } from '@angular/router';
import { faker } from '@faker-js/faker';

describe('NavigatorService', () => {
  const createSUT = createServiceFactory({
    service: NavigatorService,
    mocks: [Router],
  });

  it('[UNIT][NVG-001]: Navigate to Home', () => {
    // Arrange
    const sut = createSUT();

    const spy = jest.spyOn(sut.inject(Router), 'navigate');

    // Act
    sut.service.toHome();

    // Assert
    expect(spy).toHaveBeenCalledWith(['']);
  });

  it('[UNIT][NVG-002]: Navigate to Unexpected Error Page', () => {
    // Arrange
    const sut = createSUT();

    const spy = jest.spyOn(sut.inject(Router), 'navigate');

    // Act
    sut.service.toUnexpectedError();

    // Assert
    expect(spy).toHaveBeenCalledWith(['error/unexpected-error']);
  });

  it('[UNIT][NGV-003]: Navigate to Project Summary', () => {
    // Arrange
    const sut = createSUT();
    const key = faker.string.alpha();

    const spy = jest.spyOn(sut.inject(Router), 'navigate');

    // Act
    sut.service.toProjectSummary(key);

    // Assert
    expect(spy).toHaveBeenCalledWith(['project', key]);
  });

  it('[UNIT][NGV-004]: Navigate to back', () => {
    // Arrange
    const sut = createSUT();

    const spy = jest.spyOn(sut.inject(Router), 'navigate');

    // Act
    sut.service.toBack();

    // Assert
    expect(spy).toHaveBeenCalledWith(['..']);
  });
});
