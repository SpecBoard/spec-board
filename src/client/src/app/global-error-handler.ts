import { ErrorHandler, Injectable } from '@angular/core';
import { NavigatorService } from '../modules/shared/services/navigator.service';
import { LoggerService } from '../modules/logger/logger.service';
import { sourceContext } from '../modules/logger/enrichers/source-context-enricher';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { TuiAlertService } from '@taiga-ui/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private readonly navigator: NavigatorService, private readonly alertService: TuiAlertService, private readonly logger: LoggerService) {}

  handleError(error: unknown): void {
    sourceContext(GlobalErrorHandler, () => {
      this.logger.error('Error happened', error as Error);
    });

    if (isValidation(error)) {
      this.alertService
        .open(this.readValidationError(error.error.extensions), {
          label: 'Validation Error',
          appearance: 'negative',
          autoClose: 5000,
        })
        .subscribe();
    }
    if (isResourceNotFound(error)) {
      this.alertService
        .open(error.error.detail, {
          label: error.error.title,
          appearance: 'negative',
          autoClose: 5000,
        })
        .subscribe();
      this.navigator.toBack();
    } else if (isRouteNotFound(error) || isNotFound(error)) {
      this.navigator.toNotFound();
    } else {
      this.navigator.toUnexpectedError();
    }
  }

  private readValidationError(errors: { property: string; message: string }[]) {
    let result = '<ul>';
    for (const error of errors) {
      result += `<li><strong>${error.property}</strong>: ${error.message}</li>`;
    }
    result += '</ul>';

    return result;
  }
}

function isRouteNotFound(value: unknown): value is Error {
  return typeof value == 'object' && value !== null && 'code' in value && value.code === 4002;
}

function isHttpError(value: unknown, status: number): value is HttpErrorResponse {
  return typeof value == 'object' && value !== null && 'status' in value && value.status === status;
}

function isNotFound(value: unknown): value is HttpErrorResponse {
  return isHttpError(value, HttpStatusCode.NotFound);
}

function isType(value: unknown, status: number, type: string): value is HttpErrorResponse {
  return isHttpError(value, status) && value.error != null && 'type' in value.error && value.error.type !== null && value.error.type === type;
}

function isResourceNotFound(value: unknown): value is HttpErrorResponse {
  return isType(value, HttpStatusCode.NotFound, '/errors/resource-not-found');
}

function isValidation(value: unknown): value is HttpErrorResponse {
  return (
    isType(value, HttpStatusCode.BadRequest, '/errors/invalid-request') && 'error' in value && typeof value.error === 'object' && value.error !== null && 'extensions' in value.error && typeof value.error === 'object'
  );
}
