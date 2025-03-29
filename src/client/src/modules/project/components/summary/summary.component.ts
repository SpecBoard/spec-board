import { Component, Input, input } from '@angular/core';
import { ProjectSummary } from '../../models/project-summary';
import { TuiIcon } from '@taiga-ui/core';
import { Icons } from '../../helpers/Icons';

@Component({
  selector: 'project-summary',
  imports: [TuiIcon],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent {
  @Input({ required: true })
  public summary!: ProjectSummary;

  public Icons = Icons;
}
