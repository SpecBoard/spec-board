import { Component, computed, Input, input, Signal } from '@angular/core';
import { ProjectSummary } from '../../models/project-summary';
import { TuiIcon } from '@taiga-ui/core';
import { Icons } from '../../helpers/Icons';
import { DurationPipe } from '../../../shared/pipes/duration.pipe';

@Component({
  selector: 'project-summary',
  imports: [TuiIcon, DurationPipe],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent {
  State: typeof State = State;

  @Input({ required: true })
  public summary!: ProjectSummary;

  public state: Signal<State> = computed(() => {
    if (this.summary.fail > 0) return State.Fail;
    if (this.summary.skipped > 0) return State.Skipped;
    return State.Pass;
  });
  public scenarios: Signal<number> = computed(() => {
    return this.summary.fail + this.summary.pass + this.summary.skipped;
  });

  public Icons = Icons;
}

enum State {
  Pass,
  Fail,
  Skipped,
}
