import { Injectable } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { Channels } from '../../../messages/channels';
import { ReportUploadedMessage } from '../../../messages/report-uploaded-message';
import { BehaviorSubject } from 'rxjs';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageStore {
  private messages = new BehaviorSubject<Message[]>([{
    title: 'New Report Uploaded',
    message: `New report was uploaded to spec-store project`,
    timestamp: Date.now()
  }]);

  public messages$ = this.messages.asObservable();

  constructor(private readonly notificationService: NotificationService) { }

  public async initializeAsync() {
    this.notificationService.subscribe<ReportUploadedMessage>(Channels.reportUploaded, (message) => {
      this.messages.next([{ title: 'New Report Uploaded', message: `New report was uploaded for ${message.project}`, timestamp: Date.now() }])

      return Promise.resolve(message);
    });
  }

  public clear(message: Message) {
    this.messages.next(this.messages.value.splice(this.messages.value.indexOf(message), 1));
  }
}
