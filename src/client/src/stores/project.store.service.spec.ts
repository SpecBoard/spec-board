import { createServiceFactory } from '@ngneat/spectator/jest';
import { ProjectStore } from './project.store.service';
import { ProjectOverviewFaker } from '../modules/project/__test_utils__/project-overview-faker';
import { ProjectService } from '../modules/project/services/project.service';

describe('ProjectStore', () => {
  const createSUT = createServiceFactory({
    service: ProjectStore,
    mocks: [ProjectService],
  });

  it('[UNIT][PRS-001]: Load projects', async () => {
    // Arrange
    const sut = createSUT();
    const projects = [ProjectOverviewFaker.random(), ProjectOverviewFaker.random()];

    jest.spyOn(sut.inject(ProjectService), 'getAllAsync').mockResolvedValue(projects);

    // Act
    await sut.service.loadAsync();

    // Assert
    expect(sut.service.Value).toEqual(projects);
  });
});
