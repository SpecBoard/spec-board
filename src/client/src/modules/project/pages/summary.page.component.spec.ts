import { createComponentFactory } from '@ngneat/spectator/jest';
import { SummaryPageComponent } from './summary.page.component';
import { ProjectService } from '../services/project.service';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { faker } from '@faker-js/faker';
import { ProjectSummaryFaker } from '../__test_utils__/project-summary-faker';
import { effect } from '@angular/core';

describe('SummaryPageComponent', () => {
  const createCUT = createComponentFactory({
    component: SummaryPageComponent,
    mocks: [ProjectService, ActivatedRoute],
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
});
