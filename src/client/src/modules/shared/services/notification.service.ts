import { Injectable } from '@angular/core';
import * as SignalR from '@microsoft/signalr';
import { NotificationOptions } from '../options/notification-options';
import { LoggerService } from '../../logger/logger.service';
import { sourceContext } from '../../logger/enrichers/source-context-enricher';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private connection?: SignalR.HubConnection;
  private readonly state = new BehaviorSubject<SignalR.HubConnectionState>(SignalR.HubConnectionState.Disconnected);

  public state$ = this.state.asObservable();

  constructor(private readonly options: NotificationOptions, private readonly logger: LoggerService) {}

  public async connectAsync(): Promise<void> {
    sourceContext(NotificationService, () => {
      this.logger.debug('Establishing SignalR connection...');
    });

    this.connection = new SignalR.HubConnectionBuilder().withUrl(this.options.url).build();
    await this.connection.start();

    this.state.next(SignalR.HubConnectionState.Connected);

    sourceContext(NotificationOptions, () => {
      this.logger.debug('SignalR connection has been established');
    });
  }

  public subscribe<T>(channel: string, action: (message: T) => Promise<T>): NotificationSubscription<T> {
    const on = async (message: T) => {
      sourceContext(NotificationSubscription<T>, () => {
        this.logger.debug('Receive message on {Channel} channel', channel);
        this.logger.verbose('Message: {Message}', JSON.stringify(message));
      });
      await action(message);
    };

    if (!this.connection) {
      throw new Error('SignalR connection has not been established');
    }

    this.connection.on(channel, on);
    sourceContext(NotificationService, () => {
      this.logger.debug('Subscribed to {Channel} channel', channel);
    });

    return new NotificationSubscription(channel, action, this.connection, this.logger);
  }
}

export class NotificationSubscription<T> {
  constructor(private readonly channel: string, private readonly action: (message: T) => Promise<T>, private readonly connection: SignalR.HubConnection, private readonly logger: LoggerService) {}

  public unsubscribe() {
    this.connection.off(this.channel, this.action);
    sourceContext(NotificationSubscription<T>, () => {
      this.logger.debug('Unsubscribed from {Channel} channel', this.channel);
    });
  }
}
