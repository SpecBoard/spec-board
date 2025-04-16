import { NotificationService } from '../services/notification.service';
import { MessageStore } from './message-store.service';
import { createServiceFactory } from '@ngneat/spectator/jest';

describe('NotificationStore', () => {
  const createSUT = createServiceFactory({
    service: MessageStore
  })

  it('[UNIT][NTS-001]: Subscribe to Report Uploaded', async () => {
    // Arrange
    const sut = createSUT();

    const spy = jest.spyOn(sut.inject(NotificationService), 'subscribe');

    // Act
    await sut.service.initializeAsync();

    // Assert
    expect(spy).toHaveBeenCalledWith('report.uploaded', expect.anything);
  })
});
