import { createServiceFactory } from '@ngneat/spectator/jest';
import { ErrorFaker } from '../__test_utils__/error-faker';
import { GlobalErrorHandler } from './global-error-handler';
import { NavigatorService } from '../modules/shared/services/navigator.service';
import { LoggerService } from '../modules/logger/logger.service';
import { TuiAlertService } from '@taiga-ui/core';
import { of, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('GlobalErrorHandler', () => {
  const createSUT = createServiceFactory({
    service: GlobalErrorHandler,
    mocks: [NavigatorService, TuiAlertService, LoggerService],
  });

  it('[UNIT][GEH-001]: Handle frontend error', () => {
    // Arrange
    const sut = createSUT();
    const error = ErrorFaker.random();

    const spy = jest.spyOn(sut.inject(NavigatorService), 'toUnexpectedError');

    // Act
    sut.service.handleError(error);

    // Assert
    expect(spy).toHaveBeenCalledTimes(1);
  });
  it('[UNIT][GEH-002]: Handle route not match', () => {
    // Arrange
    const sut = createSUT();
    const error = ErrorFaker.routeNotMatch();

    const spy = jest.spyOn(sut.inject(NavigatorService), 'toNotFound');

    // Act
    sut.service.handleError(error);

    // Assert
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('[UNIT][GEH-003]: Handle endpoint not found', () => {
    // Arrange
    const sut = createSUT();
    const error = ErrorFaker.endpointNotFound();

    const spy = jest.spyOn(sut.inject(NavigatorService), 'toNotFound');

    // Act
    sut.service.handleError(error);

    // Assert
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('[UNIT][GEH-004]: Handle resource not found', (done) => {
    // Arrange
    const sut = createSUT();
    const error = ErrorFaker.resourceNotFound();

    const toBackSpy = jest.spyOn(sut.inject(NavigatorService), 'toBack');
    const openSpy = jest.spyOn(sut.inject(TuiAlertService), 'open').mockReturnValue(
      of(undefined).pipe(
        tap(() => {
          // Assert
          expect(openSpy).toHaveBeenCalledWith(error.error.detail, {
            label: error.error.title,
            appearance: 'negative',
            autoClose: 5000,
          });

          done();
        })
      )
    );

    // Act
    sut.service.handleError(error);

    // Assert
    expect(toBackSpy).toHaveBeenCalledTimes(1);
  });

  it('[UNIT][GEH-005]: Handle validation exception', (done) => {
    // Arrange
    const sut = createSUT();
    const error = ErrorFaker.validation();

    const openSpy = jest.spyOn(sut.inject(TuiAlertService), 'open').mockReturnValue(
      of(undefined).pipe(
        tap(() => {
          // Assert
          expect(openSpy).toHaveBeenCalledWith(getValiationErrorDetail(error), {
            label: 'Validation Error',
            appearance: 'negative',
            autoClose: 5000,
          });

          done();
        })
      )
    );

    // Act
    sut.service.handleError(error);
  });

  const getValiationErrorDetail = (error: HttpErrorResponse): string => {
    let result = '<ul>';
    for (const validationError of error.error.extensions) {
      result += `<li><strong>${validationError.property}</strong>: ${validationError.message}</li>`;
    }
    result += '</ul>';

    return result;
  };
});
