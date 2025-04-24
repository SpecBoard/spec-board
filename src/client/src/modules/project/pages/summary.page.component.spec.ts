import { byTestId, createComponentFactory } from '@ngneat/spectator/jest';
import { SummaryPageComponent } from './summary.page.component';
import { ProjectService } from '../services/project.service';
import { ActivatedRoute, convertToParamMap, Params } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { faker } from '@faker-js/faker';
import { ProjectSummaryFaker } from '../__test_utils__/project-summary-faker';
import { effect } from '@angular/core';
import { ProjectEvolutionFaker } from '../__test_utils__/project-evolution-faker';
import { NotificationService } from '../../shared/services/notification.service';
import { MockService } from 'ng-mocks';

describe('SummaryPageComponent', () => {
  const params = new BehaviorSubject<Params>({});

  const createCUT = createComponentFactory({
    component: SummaryPageComponent,
    mocks: [NotificationService],
    providers: [
      {
        provide: ActivatedRoute,
        useValue: MockService(ActivatedRoute, {
          params: params.asObservable(),
        }),
      },
      {
        provide: ProjectService,
        useValue: MockService(ProjectService, {
          getEvolutionAsync(key) {
            return Promise.resolve([ProjectEvolutionFaker.random()]);
          },
          getSummaryAsync(key) {
            return Promise.resolve(ProjectSummaryFaker.random());
          },
        }),
      },
    ],
    detectChanges: false,
    shallow: true,
  });

  it('[UNIT][SMP-001]: Query Project Summary', (done) => {
    // Arrange
    const cut = createCUT();
    const key = faker.string.alphanumeric();
    const summary = ProjectSummaryFaker.random();

    const mock = cut.inject(ActivatedRoute);
    mock.params = of(convertToParamMap({ key: key }));

    const projectServiceMock = cut.inject(ProjectService);
    jest.spyOn(projectServiceMock, 'getSummaryAsync').mockResolvedValue(summary);
    jest.spyOn(projectServiceMock, 'getEvolutionAsync').mockResolvedValue([]);

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

    const projectServiceMock = cut.inject(ProjectService);
    jest.spyOn(projectServiceMock, 'getSummaryAsync').mockResolvedValue(ProjectSummaryFaker.random());
    jest.spyOn(projectServiceMock, 'getEvolutionAsync').mockResolvedValue(evolution);

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

  it('[UNIT][SMP-003]: Show Name if Defined', (done) => {
    // Arrange
    const summary = ProjectSummaryFaker.random();
    const cut = createCUT();

    const projectServiceMock = cut.inject(ProjectService);
    jest.spyOn(projectServiceMock, 'getSummaryAsync').mockResolvedValue(summary);

    // Act
    cut.detectChanges();

    // Assert
    setTimeout(() => {
      cut.detectChanges();
      expect(cut.query(byTestId('spnTitle'))?.textContent).toEqual(summary.name);

      done();
    }, 100);
  });

  it('[UNIT][SMP-004]: Show Key if Name is not Defined', (done) => {
    // Arrange
    const cut = createCUT();
    const summary = ProjectSummaryFaker.withoutName();

    const projectServiceMock = cut.inject(ProjectService);
    jest.spyOn(projectServiceMock, 'getSummaryAsync').mockResolvedValue(summary);

    // Act
    cut.detectChanges();

    // Assert
    setTimeout(() => {
      cut.detectChanges();
      expect(cut.query(byTestId('spnTitle'))?.textContent).toEqual(summary.key);

      done();
    }, 100);
  });
});
