import { createHttpFactory } from '@ngneat/spectator';
import { ProjectService } from './project.service';
import { MockService } from 'ng-mocks';
import { ProjectFaker } from '../modules/project/__test_utils__/project-faker';
import { of } from 'rxjs';

describe('ProjectService', () => {
  const createSUT = createHttpFactory({
    service: ProjectService,
    mockProvider: MockService,
  });

  it('[UNIT][PRS-001]: Query projects', async () => {
    // Arrange
    const sut = createSUT();
    const projects = [ProjectFaker.random(), ProjectFaker.random()];

    sut.httpClient.get = jest.fn(() => of(projects)) as never;

    // Act
    const result = await sut.service.getAsync();

    // Assert
    expect(result).toEqual(projects);
  });
});
