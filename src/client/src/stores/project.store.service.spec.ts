import { createServiceFactory } from '@ngneat/spectator/jest';
import { ProjectStore } from './project.store.service';
import { ProjectFaker } from '../modules/project/__test_utils__/project-faker';
import { ProjectService } from '../services/project.service';

describe('ProjectStore', () => {
  const createSUT = createServiceFactory({
    service: ProjectStore,
    mocks: [ProjectService],
  });

  it('[UNIT][PRS-001]: Load projects', async () => {
    // Arrange
    const sut = createSUT();
    const projects = [ProjectFaker.random(), ProjectFaker.random()];

    jest
      .spyOn(sut.inject(ProjectService), 'getAsync')
      .mockResolvedValue(projects);

    // Act
    await sut.service.loadAsync();

    // Assert
    expect(sut.service.Value).toEqual(projects);
  });
});
