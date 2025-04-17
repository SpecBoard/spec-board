import { Injectable } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { Channels } from '../../../messages/channels';
import { ReportUploadedMessage } from '../../../messages/report-uploaded-message';
import { BehaviorSubject } from 'rxjs';
import { HubConnectionState } from '@microsoft/signalr';
import { NotificationDescriptionEnumeration } from '../enumerations/notification-description-enumeration';
import { NotificationDescription } from '../models/notification-description';
import { TuiAlertService } from '@taiga-ui/core';

@Injectable({
  providedIn: 'root',
})
export class MessageStore {
  private readonly messages = new BehaviorSubject<NotificationDescription[]>([]);

  public messages$ = this.messages.asObservable();

  constructor(private readonly notificationService: NotificationService, private readonly alertService: TuiAlertService) {}

  public async initializeAsync() {
    this.notificationService.state$.subscribe((state) => {
      if (state !== HubConnectionState.Connected) return;

      this.notificationService.subscribe<ReportUploadedMessage>(Channels.reportUploaded, (message) => {
        const description = NotificationDescriptionEnumeration.reportUploaded(message);

        this.alertService
          .open(description.message, {
            icon: description.icon,
            label: description.title,
            data: description.message,
            appearance: 'neutral',
            autoClose: 5000,
            closeable: true,
          })
          .subscribe();
        this.messages.next([description, ...this.messages.value]);

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
