import { createComponentFactory } from '@ngneat/spectator/jest';
import { SummaryPageComponent } from './summary.page.component';
import { ProjectService } from '../services/project.service';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { lastValueFrom, of } from 'rxjs';
import { faker } from '@faker-js/faker';
import { ProjectSummaryFaker } from '../__test_utils__/project-summary-faker';
import { effect } from '@angular/core';
import { ProjectEvolutionFaker } from '../__test_utils__/project-evolution-faker';
import { NotificationService, NotificationSubscription } from '../../shared/services/notification.service';
import { MockService } from 'ng-mocks';
import { ReportUploadedMessage } from '../../../messages/report-uploaded-message';
import { ReportUploadedMessageFaker } from '../../../__test_utils__/report-uploaded-message-faker';
import { TuiAlertService } from '@taiga-ui/core';

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

  it('[UNIT][SMP-003]: Subscribe to Report Uploaded Message', () => {
    // Arrange
    const cut = createCUT();

    const routeMock = cut.inject(ActivatedRoute);
    routeMock.params = of(convertToParamMap({ key: faker.string.alphanumeric() }));

    const spy = jest.spyOn(cut.inject(NotificationService), 'subscribe');

    // Act
    cut.detectChanges();

    // Assert
    expect(spy).toHaveBeenCalledWith('report.uploaded', expect.anything());
  });

  it('[UNIT][SMP-004]: Unsubscribe from Report Uploaded Message', () => {
    // Arrange
    const cut = createCUT();
    const subscriptionMock = MockService(NotificationSubscription<ReportUploadedMessage>);

    const routeMock = cut.inject(ActivatedRoute);
    routeMock.params = of(convertToParamMap({ key: faker.string.alphanumeric() }));

    jest.spyOn(cut.inject(NotificationService), 'subscribe').mockReturnValue(subscriptionMock);

    const spy = jest.spyOn(subscriptionMock, 'unsubscribe');

    cut.detectChanges();

    // Act
    cut.component.ngOnDestroy();

    // Assert
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('[UNIT][SMP-005]: Received Report Uploaded Message for Loaded Project', async () => {
    // Arrange
    const cut = createCUT();
    let event!: (message: unknown) => Promise<unknown>;
    const message = ReportUploadedMessageFaker.random();

    const routeMock = cut.inject(ActivatedRoute);
    routeMock.params = of({ key: message.project });

    jest.spyOn(cut.inject(NotificationService), 'subscribe').mockImplementation((_, action) => {
      event = action;

      return MockService(NotificationSubscription<unknown>);
    });

    cut.detectChanges();
    await lastValueFrom(routeMock.params);

    const openSpy = jest.spyOn(cut.inject(TuiAlertService), 'open');
    const projectServiceMock = cut.inject(ProjectService);
    const getSummarySpy = jest.spyOn(projectServiceMock, 'getSummaryAsync');
    const getEvolutionSpy = jest.spyOn(projectServiceMock, 'getEvolutionAsync');

    // Act
    await event(message);

    // Assert
    expect(openSpy).toHaveBeenCalledWith(`New report was uploaded for ${message.project} project`, {
      appearance: 'neutral',
      autoClose: 5000,
      closeable: true,
      label: 'New Report',
    });
    expect(getSummarySpy).toHaveBeenCalledWith(message.project);
    expect(getEvolutionSpy).toHaveBeenCalledWith(message.project);
  });

  it('[UNIT][SMP-005]: Received Report Uploaded Message for Different Project', async () => {
    // Arrange
    const cut = createCUT();
    let event!: (message: unknown) => Promise<unknown>;
    const message = ReportUploadedMessageFaker.random();

    const routeMock = cut.inject(ActivatedRoute);
    routeMock.params = of({ key: faker.string.sample() });

    jest.spyOn(cut.inject(NotificationService), 'subscribe').mockImplementation((_, action) => {
      event = action;

      return MockService(NotificationSubscription<unknown>);
    });

    cut.detectChanges();
    await lastValueFrom(routeMock.params);

    const openSpy = jest.spyOn(cut.inject(TuiAlertService), 'open');
    const projectServiceMock = cut.inject(ProjectService);
    const getSummarySpy = jest.spyOn(projectServiceMock, 'getSummaryAsync');
    const getEvolutionSpy = jest.spyOn(projectServiceMock, 'getEvolutionAsync');

    // Act
    await event(message);

    // Assert
    expect(openSpy).toHaveBeenCalledWith(`New report was uploaded for ${message.project} project`, {
      appearance: 'neutral',
      autoClose: 5000,
      closeable: true,
      label: 'New Report',
    });
    expect(getSummarySpy).not.toHaveBeenCalledWith(message.project);
    expect(getEvolutionSpy).not.toHaveBeenCalledWith(message.project);
  });
});
