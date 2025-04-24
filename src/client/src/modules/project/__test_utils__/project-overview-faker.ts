import { ProjectOverview } from '../models/project-overview';
import { faker } from '@faker-js/faker';

export class ProjectOverviewFaker {
  public static random(): ProjectOverview {
    return {
      key: `${faker.string.alpha()}_${faker.string.alpha()}`,
      name: faker.string.sample(),
      version: faker.system.semver(),
      lastReport: faker.date.recent(),
      passCount: faker.number.int(),
      failCount: faker.number.int(),
      skippedCount: faker.number.int(),
    };
  }

  public static pass(): ProjectOverview {
    const result = this.random();
    result.failCount = 0;
    result.skippedCount = 0;

    return result;
  }

  public static fail(): ProjectOverview {
    const result = this.random();
    result.passCount = 0;
    result.skippedCount = 0;

    return result;
  }

  public static skipped(): ProjectOverview {
    const result = this.random();
    result.passCount = 0;
    result.failCount = 0;

    return result;
  }

  public static notPass(): ProjectOverview {
    const result = this.random();
    result.passCount = 0;

    return result;
  }

  public static notFail(): ProjectOverview {
    const result = this.random();
    result.failCount = 0;

    return result;
  }

  public static notSkipped(): ProjectOverview {
    const result = this.random();
    result.skippedCount = 0;

    return result;
  }

  public static name(value: string | undefined): ProjectOverview {
    const result = this.random();
    result.name = value;

    return result;
  }
}
