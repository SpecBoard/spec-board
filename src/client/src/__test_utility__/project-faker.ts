import { Project } from '../models/project';
import { faker } from '@faker-js/faker';

export class ProjectFaker {
  public static random(): Project {
    return {
      key: faker.string.alpha(),
    };
  }
}
