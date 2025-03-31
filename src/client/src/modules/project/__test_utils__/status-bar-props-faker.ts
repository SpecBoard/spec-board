import { faker } from '@faker-js/faker';

export class StatusBarPropsFaker {
  public static random() {
    return {
      pass: faker.number.int(),
      fail: faker.number.int(),
      skipped: faker.number.int(),
      showValues: faker.datatype.boolean(),
    };
  }

  public static showValue() {
    return {
      pass: faker.number.int(),
      fail: faker.number.int(),
      skipped: faker.number.int(),
      showValue: true,
    };
  }

  public static hideValue() {
    return {
      pass: faker.number.int(),
      fail: faker.number.int(),
      skipped: faker.number.int(),
      showValue: false,
    };
  }

  public static pass(value: number) {
    return {
      pass: value,
      fail: faker.number.int(),
      skipped: faker.number.int(),
      showValue: true,
    };
  }

  public static fail(value: number) {
    return {
      pass: faker.number.int(),
      fail: value,
      skipped: faker.number.int(),
      showValue: true,
    };
  }

  public static skipped(value: number) {
    return {
      pass: faker.number.int(),
      fail: faker.number.int(),
      skipped: value,
      showValue: true,
    };
  }
}
