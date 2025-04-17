import { Injectable } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { Channels } from '../../../messages/channels';
import { ReportUploadedMessage } from '../../../messages/report-uploaded-message';
import { BehaviorSubject } from 'rxjs';
import { HubConnectionState } from '@microsoft/signalr';
import { NotificationDescriptionEnumeration } from '../enumerations/notification-description-enumeration';
import { NotificationDescription } from '../models/notification-description';

@Injectable({
  providedIn: 'root',
})
export class MessageStore {
  private readonly messages = new BehaviorSubject<NotificationDescription[]>([]);

  public messages$ = this.messages.asObservable();

  constructor(private readonly notificationService: NotificationService) {}

  public async initializeAsync() {
    this.notificationService.state$.subscribe((state) => {
      if (state !== HubConnectionState.Connected) return;

      this.notificationService.subscribe<ReportUploadedMessage>(Channels.reportUploaded, (message) => {
        this.messages.next([NotificationDescriptionEnumeration.reportUploaded(message), ...this.messages.value]);

        return Promise.resolve(message);
      });
    });
  }

  public clear(message: NotificationDescription) {
    const messages = this.messages.value;

    messages.splice(messages.indexOf(message), 1);
    this.messages.next(messages);
  }

  public clearAll() {
    this.messages.next([]);
  }
}
