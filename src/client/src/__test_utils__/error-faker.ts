import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { faker } from '@faker-js/faker';

export class ErrorFaker {
  public static random(): Error {
    const result = new Error();
    result.name = faker.string.alpha();
    result.cause = faker.string.alpha();
    result.message = faker.string.alpha();
    result.stack = faker.string.alpha();

    return result;
  }

  public static routeNotMatch(): object {
    return {
      code: 4002,
    };
  }

  public static endpointNotFound(): HttpErrorResponse {
    return new HttpErrorResponse({
      status: HttpStatusCode.NotFound,
    });
  }

  public static resourceNotFound(): HttpErrorResponse {
    return new HttpErrorResponse({
      status: HttpStatusCode.NotFound,
      error: {
        type: '/errors/resource-not-found',
        title: faker.string.alpha(),
        detail: faker.string.alpha(),
      },
    });
  }

  public static validation(): HttpErrorResponse {
    return new HttpErrorResponse({
      status: HttpStatusCode.BadRequest,
      error: {
        type: '/errors/invalid-request',
        extensions: faker.helpers.multiple(
          () => {
            return {
              property: faker.string.sample(),
              message: faker.string.sample(),
            };
          },
          { count: { min: 1, max: 5 } }
        ),
      },
    });
  }
}
