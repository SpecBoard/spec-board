import { required } from '@mihben/ngx-configuration';

export class NotificationOptions {
  @required()
  public url!: string;
}
