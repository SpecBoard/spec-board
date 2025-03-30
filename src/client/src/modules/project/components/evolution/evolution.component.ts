import { Component, Input } from '@angular/core';
import { ProjectEvolution } from '../../models/project-evolution';
import { TuiIcon } from '@taiga-ui/core';
import { StatusBarComponent } from '../status-bar/status-bar.component';

@Component({
  selector: 'project-evolution',
  imports: [TuiIcon, StatusBarComponent],
  templateUrl: './evolution.component.html',
  styleUrl: './evolution.component.scss',
})
export class EvolutionComponent {
  @Input({ required: true })
  public evolution!: ProjectEvolution[];
}
