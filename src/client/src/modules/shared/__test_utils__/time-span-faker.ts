import { faker } from '@faker-js/faker';
import { TimeSpan } from '../types/time-span';

export class TimeSpanFaker {
  public static random() {
    return new TimeSpan(`${faker.number.int()}:${faker.number.int({ min: 0, max: 60 })}:${faker.number.int({ min: 0, max: 60 })}.${faker.number.int({ min: 0, max: 1000 })}`);
  }

  public static hours(value: number) {
    return new TimeSpan(`${value}:${faker.number.int({ min: 0, max: 60 })}:${faker.number.int({ min: 0, max: 60 })}.${faker.number.int({ min: 0, max: 1000 })}`);
  }

  public static minutes(value: number) {
    return new TimeSpan(`${faker.number.int({ min: 0, max: 24 })}:${value}:${faker.number.int({ min: 0, max: 60 })}.${faker.number.int({ min: 0, max: 1000 })}`);
  }

  public static seconds(value: number) {
    return new TimeSpan(`${faker.number.int({ min: 0, max: 24 })}:${faker.number.int({ min: 0, max: 60 })}:${value}.${faker.number.int({ min: 0, max: 1000 })}`);
  }

  public static milliseconds(value: number) {
    return new TimeSpan(`${faker.number.int({ min: 0, max: 24 })}:${faker.number.int({ min: 0, max: 60 })}:${faker.number.int({ min: 0, max: 60 })}.${value}`);
  }
}
