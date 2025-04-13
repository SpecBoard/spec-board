import { Injectable } from '@angular/core';
import * as SignalR from '@microsoft/signalr';
import { NotificationOptions } from '../options/notification-options';
import { LoggerService } from '../../logger/logger.service';
import { sourceContext } from '../../logger/enrichers/source-context-enricher';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private connection!: SignalR.HubConnection;

  constructor(private readonly options: NotificationOptions, private readonly logger: LoggerService) {}

  public async connectAsync(): Promise<void> {
    sourceContext(NotificationService, () => {
      this.logger.debug('Establishing SignalR connection...');
      this.logger.verbose('Options: {Options}', this.options);
    });

    this.connection = new SignalR.HubConnectionBuilder().withUrl(this.options.url).build();
    await this.connection.start();

    sourceContext(NotificationOptions, () => this.logger.debug('SignalR connection has been established'));
  }

  public subscribe<T>(channel: string, handler: (message: T) => Promise<void>) {
    this.connection.on(channel, async (message: T) => {
      this.logger.debug('Receiving message on {Channel} channel', channel);
      await handler(message);
    });
    this.logger.debug('Listening on {Channel} channel', channel);
  }

  public unsubscribe<T>(channel: string, handler: (message: T) => Promise<void>) {
    this.connection.off(channel, handler);
    this.logger.debug('Listening has been stopped on {Channel} channel', channel);
  }
}
