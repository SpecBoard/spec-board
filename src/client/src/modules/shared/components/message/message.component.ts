import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TuiButton, TuiFormatDatePipe, TuiFormatDateService, TuiIcon } from '@taiga-ui/core';
import { AsyncPipe } from '@angular/common';
import { TimeDistanceService } from '../../services/time-distance.service';
import { NotificationDescription } from '../../models/notification-description';

@Component({
  selector: 'app-message',
  imports: [TuiIcon, TuiFormatDatePipe, AsyncPipe, TuiButton],
  providers: [{ provide: TuiFormatDateService, useClass: TimeDistanceService }],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {
  @Input({ required: true })
  public message!: NotificationDescription;

  @Output()
  public closed = new EventEmitter<NotificationDescription>();
}
