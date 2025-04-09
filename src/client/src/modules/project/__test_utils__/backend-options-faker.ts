import { faker } from '@faker-js/faker';
import { BackendOptions } from '../../../options/backendOptions';

export class BackendOptionsFaker {
  public static random(): BackendOptions {
    const result = new BackendOptions();
    result.baseAddress = faker.internet.url({ appendSlash: true });

    return result;
  }
}
