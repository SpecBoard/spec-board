import { ReportUploadedMessage } from '../../../messages/report-uploaded-message';
import { NotificationDescription } from '../models/notification-description';

export class NotificationDescriptionEnumeration {
  public static reportUploaded(message: ReportUploadedMessage): NotificationDescription {
    return {
      icon: 'clipboard-plus',
      title: 'Report Uploaded',
      message: `New <span class='message__status message__status--${message.status.toLocaleLowerCase()}'>${message.status.toUpperCase()}</span> report was uploaded to <strong>${message.project}</strong> project`,
      timestamp: Date.now(),
    };
  }
}
