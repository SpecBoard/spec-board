import { faker } from '@faker-js/faker';
import { ProjectEvolution } from '../models/project-evolution';

export class ProjectEvolutionFaker {
  public static random(): ProjectEvolution {
    return {
      id: faker.number.int(),
      version: faker.system.semver(),
      pass: faker.number.int(),
      fail: faker.number.int(),
      skipped: faker.number.int(),
    };
  }
}
