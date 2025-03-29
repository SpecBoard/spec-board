import { faker } from '@faker-js/faker';
import { ProjectSummary } from '../models/project-summary';

export class ProjectSummaryFaker {
  public static random(): ProjectSummary {
    return {
      key: faker.string.alpha(),
      version: faker.system.semver(),
      lastReport: faker.date.recent(),
      passCount: faker.number.int(),
      failCount: faker.number.int(),
      skippedCount: faker.number.int(),
    };
  }
}
