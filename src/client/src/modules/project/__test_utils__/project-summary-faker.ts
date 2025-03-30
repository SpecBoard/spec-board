import { faker } from '@faker-js/faker';
import { ProjectSummary, ScenarioSummary } from '../models/project-summary';
import { TimeSpanFaker } from '../../shared/__test_utils__/time-span-faker';

export class ProjectSummaryFaker {
  public static random(): ProjectSummary {
    return {
      key: faker.string.alpha(),
      version: faker.system.semver(),
      lastReport: faker.date.recent(),
      pass: faker.number.int(),
      fail: faker.number.int(),
      skipped: faker.number.int(),
      duration: TimeSpanFaker.random(),
      failedScenarios: faker.helpers.multiple<ScenarioSummary>(
        (_, __) => {
          return {
            id: faker.number.int(),
            segments: faker.helpers.multiple((_, __) => faker.string.alphanumeric(), { count: { min: 1, max: 3 } }),
          };
        },
        { count: { min: 1, max: 3 } }
      ),
    };
  }

  public static pass(): ProjectSummary {
    const result = this.random();
    result.failedScenarios = [];
    result.fail = 0;
    result.skipped = 0;
    result.pass = faker.number.int({ min: 1 });

    return result;
  }

  public static fail(): ProjectSummary {
    const result = this.random();
    result.fail = faker.number.int({ min: 1 });

    return result;
  }

  public static skipped(): ProjectSummary {
    const result = this.random();
    result.skipped = faker.number.int({ min: 1 });
    result.fail = 0;

    return result;
  }
}
