import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Message } from '../../models/message';
import { TuiFormatDatePipe, TuiFormatDateService, TuiIcon } from '@taiga-ui/core';
import { AsyncPipe } from '@angular/common';
import { TimeDistanceService } from '../../services/time-distance.service';

@Component({
  selector: 'app-message',
  imports: [TuiIcon, TuiFormatDatePipe, AsyncPipe],
  providers: [{provide: TuiFormatDateService, useClass: TimeDistanceService}],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent {
  @Input({required: true})
  public message!: Message

  @Output()
  public closed = new EventEmitter<Message>();
}
