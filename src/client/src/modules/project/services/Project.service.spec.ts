import { createHttpFactory } from '@ngneat/spectator';
import { ProjectService } from './project.service';
import { MockService } from 'ng-mocks';
import { ProjectOverviewFaker } from '../__test_utils__/project-overview-faker';
import { of } from 'rxjs';
import { ProjectSummaryFaker } from '../__test_utils__/project-summary-faker';
import { faker } from '@faker-js/faker';
import { ProjectEvolutionFaker } from '../__test_utils__/project-evolution-faker';

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
    const result = await sut.service.getAllAsync();

    // Assert
    expect(result).toEqual(projects);
  });

  it('[UNIT][PRS-002]: Query project summary', async () => {
    // Arrange
    const sut = createSUT();
    const summary = ProjectSummaryFaker.random();

    sut.httpClient.get = jest.fn(() => of(summary)) as never;

    // Act
    const result = await sut.service.getSummaryAsync(summary.key);

    // Assert
    expect(result).toEqual(summary);
  });

  it('[UNIT][PRS-003]:  Query project evolution', async () => {
    // Arrange
    const sut = createSUT();
    const evolution = faker.helpers.multiple(() => ProjectEvolutionFaker.random(), { count: { min: 1, max: 4 } });

    sut.httpClient.get = jest.fn(() => of(evolution)) as never;

    // Act
    const result = await sut.service.getEvolutionAsync(faker.string.alphanumeric());

    // Assert
    expect(result).toEqual(evolution);
  });
});
