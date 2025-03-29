import { createHttpFactory } from '@ngneat/spectator';
import { ProjectService } from './project.service';
import { MockService } from 'ng-mocks';
import { ProjectOverviewFaker } from '../__test_utils__/project-overview-faker';
import { of } from 'rxjs';
import { ProjectSummaryFaker } from '../__test_utils__/project-summary-faker';

describe('ProjectService', () => {
  const createSUT = createHttpFactory({
    service: ProjectService,
    mockProvider: MockService,
  });

  it('[UNIT][PRS-001]: Query projects', async () => {
    // Arrange
    const sut = createSUT();
    const projects = [ProjectOverviewFaker.random(), ProjectOverviewFaker.random()];

    sut.httpClient.get = jest.fn(() => of(projects)) as never;

    // Act
    const result = await sut.service.getAsync();

    // Assert
    expect(result).toEqual(projects);
  });

  it('[UNIT][PRS-001]: Query project summary', async () => {
    // Arrange
    const sut = createSUT();
    const summary = ProjectSummaryFaker.random();

    sut.httpClient.get = jest.fn(() => of(summary)) as never;

    // Act
    const result = await sut.service.getSummaryAsync(summary.key);

    // Assert
    expect(result).toEqual(summary);
  });
});
