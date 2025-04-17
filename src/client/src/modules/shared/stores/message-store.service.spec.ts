import { NotificationService } from '../services/notification.service';
import { MessageStore } from './message-store.service';
import { createServiceFactory } from '@ngneat/spectator/jest';
import * as SignalR from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { MockService } from 'ng-mocks';

describe('NotificationStore', () => {
  const state$ = new Subject<SignalR.HubConnectionState>();
  const notificationServiceMock = MockService(NotificationService, {
    state$: state$,
  });

  const createSUT = createServiceFactory({
    service: MessageStore,
    providers: [{ provide: NotificationService, useValue: notificationServiceMock }],
  });
});
