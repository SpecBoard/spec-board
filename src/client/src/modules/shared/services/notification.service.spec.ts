import { NotificationService } from './notification.service';
import { createServiceFactory } from '@ngneat/spectator/jest';

describe('NotificationService', () => {
  const createSUT = createServiceFactory({
    service: NotificationService,
  });
});
