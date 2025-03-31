import { Component, Input } from '@angular/core';

@Component({
  selector: 'status-bar',
  imports: [],
  templateUrl: './status-bar.component.html',
  styleUrl: './status-bar.component.scss',
})
export class StatusBarComponent {
  @Input({ required: true })
  public pass!: number;
  @Input({ required: true })
  public fail!: number;
  @Input({ required: true })
  public skipped!: number;

  @Input()
  public showValue = true;
}
