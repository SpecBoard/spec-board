import { createComponentFactory } from '@ngneat/spectator/jest';
import { HomePageComponent } from './home.page.component';
import { ProjectStore } from '../stores/project.store.service';
import { NotificationService, NotificationSubscription } from '../modules/shared/services/notification.service';
import { ReportUploadedMessage } from '../messages/report-uploaded-message';
import { MockService } from 'ng-mocks';
import { TuiAlertService } from '@taiga-ui/core';
import { ReportUploadedMessageFaker } from '../__test_utils__/report-uploaded-message-faker';
import { ProjectService } from '../modules/project/services/project.service';

describe('HomePage', () => {
  const createCUT = createComponentFactory({
    component: HomePageComponent,
    mocks: [NotificationService, ProjectStore, ProjectService],
    detectChanges: false,
    shallow: true,
  });

  it('[UNIT][HMP-001]: Load Projects', () => {
    // Arrange
    const cut = createCUT();

    const spy = jest.spyOn(cut.component.projectStore, 'loadAsync');

    // Act
    cut.detectChanges();

    // Assert
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('[UNIT][HMP-002]: Subscribed to Report Uploaded Channel', () => {
    // Arrange
    const cut = createCUT();

    const spy = jest.spyOn(cut.inject(NotificationService), 'subscribe');

    // Act
    cut.detectChanges();

    // Assert
    expect(spy).toHaveBeenLastCalledWith('report.uploaded', expect.anything());
  });

  it('[UNIT][HMP-003]: Unsubscribe from Report Uploaded Channel', () => {
    // Arrange
    const cut = createCUT();
    const subscriptionMock = MockService(NotificationSubscription<ReportUploadedMessage>);

    jest.spyOn(cut.inject(NotificationService), 'subscribe').mockReturnValue(subscriptionMock);
    const spy = jest.spyOn(subscriptionMock, 'unsubscribe');

    cut.detectChanges();

    // Act
    cut.component.ngOnDestroy();

    // Assert
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('[UNIT][HMP-004]: Receive Report Uploaded Message', async () => {
    // Arrange
    const cut = createCUT();
    let event!: (message: unknown) => Promise<unknown>;
    const message = ReportUploadedMessageFaker.random();

    jest.spyOn(cut.inject(NotificationService), 'subscribe').mockImplementation((_, action) => {
      event = action;

      return MockService(NotificationSubscription<unknown>);
    });

    cut.detectChanges();

    const openSpy = jest.spyOn(cut.inject(TuiAlertService), 'open');
    const loadSpy = jest.spyOn(cut.component.projectStore, 'loadAsync');

    // Act
    await event(message);

    // Assert
    expect(openSpy).toHaveBeenCalledWith(`New report was uploaded for ${message.project} project`, {
      appearance: 'neutral',
      autoClose: 5000,
      closeable: true,
      label: 'New Report',
    });
    expect(loadSpy).toHaveBeenCalledTimes(1);
  });
});
