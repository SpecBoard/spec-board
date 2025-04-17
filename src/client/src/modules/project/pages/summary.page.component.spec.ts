import { createComponentFactory } from '@ngneat/spectator/jest';
import { SummaryPageComponent } from './summary.page.component';
import { ProjectService } from '../services/project.service';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { faker } from '@faker-js/faker';
import { ProjectSummaryFaker } from '../__test_utils__/project-summary-faker';
import { effect } from '@angular/core';
import { ProjectEvolutionFaker } from '../__test_utils__/project-evolution-faker';
import { NotificationService } from '../../shared/services/notification.service';

describe('SummaryPageComponent', () => {
  const createCUT = createComponentFactory({
    component: SummaryPageComponent,
    mocks: [ProjectService, ActivatedRoute, NotificationService],
    detectChanges: false,
  });

  it('[UNIT][SMP-001]: Query Project Summary', (done) => {
    // Arrange
    const cut = createCUT();
    const key = faker.string.alphanumeric();
    const summary = ProjectSummaryFaker.random();

    const mock = cut.inject(ActivatedRoute);
    mock.params = of(convertToParamMap({ key: key }));

    jest.spyOn(cut.inject(ProjectService), 'getSummaryAsync').mockResolvedValue(summary);

    // Act
    cut.detectChanges();

    // Assert
    cut.runInInjectionContext(() =>
      effect(() => {
        expect(cut.component.summary()).toEqual(summary);

        done();
      })
    );
  });

  it('[UNIT][SMP-002]: Query Project Evolution', (done) => {
    // Arrange
    const cut = createCUT();
    const key = faker.string.alphanumeric();
    const evolution = faker.helpers.multiple(() => ProjectEvolutionFaker.random(), { count: { min: 1, max: 4 } });

    const mock = cut.inject(ActivatedRoute);
    mock.params = of(convertToParamMap({ key: key }));

    jest.spyOn(cut.inject(ProjectService), 'getEvolutionAsync').mockResolvedValue(evolution);

    // Act
    cut.detectChanges();

    // Assert
    cut.runInInjectionContext(() =>
      effect(() => {
        expect(cut.component.evolution()).toEqual(evolution);

        done();
      })
    );
  });
});
