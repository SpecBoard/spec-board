import { createHttpFactory } from '@ngneat/spectator';
import { ProjectService } from './project.service';
import { ProjectFaker } from '../__test_utility__/project-faker';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('ProjectService', () => {
  const createSUT = createHttpFactory({
    service: ProjectService,
  });

  it('[UNIT][PRS-001]: Get Projects', async () => {
    // Arrange
    const sut = createSUT();
    const projects = [ProjectFaker.random(), ProjectFaker.random()];

    const mock = sut.inject(HttpClient);
    jest.spyOn(mock, 'get').mockResolvedValue(of(projects));

    // Act
    const result = await sut.service.getAsync();

    // Assert
    expect(result).toEqual(projects);
  });
});
