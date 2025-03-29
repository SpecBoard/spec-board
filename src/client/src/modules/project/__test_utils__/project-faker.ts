import { Project } from '../models/project';
import { faker } from '@faker-js/faker';

export class ProjectFaker {
  public static random(): Project {
    return {
      key: `${faker.string.alpha()}_${faker.string.alpha()}`,
      version: faker.system.semver(),
      lastReport: faker.date.recent(),
      passCount: faker.number.int(),
      failCount: faker.number.int(),
      skippedCount: faker.number.int(),
    };
  }

  public static pass(): Project {
    const result = this.random();
    result.failCount = 0;
    result.skippedCount = 0;

    return result;
  }

  public static fail(): Project {
    const result = this.random();
    result.passCount = 0;
    result.skippedCount = 0;

    return result;
  }

  public static skipped(): Project {
    const result = this.random();
    result.passCount = 0;
    result.failCount = 0;

    return result;
  }

  public static notPass(): Project {
    const result = this.random();
    result.passCount = 0;

    return result;
  }

  public static notFail(): Project {
    const result = this.random();
    result.failCount = 0;

    return result;
  }

  public static notSkipped(): Project {
    const result = this.random();
    result.skippedCount = 0;

    return result;
  }
}
