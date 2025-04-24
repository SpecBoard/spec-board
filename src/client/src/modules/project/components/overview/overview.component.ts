import { Component, Input, signal } from '@angular/core';
import { ProjectOverview } from '../../models/project-overview';
import { DatePipe } from '@angular/common';
import { TuiBadge } from '@taiga-ui/kit';
import { TuiIcon, TuiIconPipe } from '@taiga-ui/core';
import { Icons } from '../../helpers/Icons';
import { NavigatorService } from '../../../shared/services/navigator.service';

@Component({
  selector: 'project-overview',
  imports: [DatePipe, TuiBadge, TuiIcon, TuiIconPipe],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
})
export class OverviewComponent {
  private _project!: ProjectOverview;

  public get project(): ProjectOverview {
    return this._project;
  }
  @Input({ required: true })
  public set project(value: ProjectOverview) {
    this._project = value;
    this.avatar.set(this.getAvatar(this._project.key));
    this.title.set(this.getTitle());
  }

  public avatar = signal<string | undefined>(undefined);
  public title = signal<string | undefined>(undefined);

  constructor(private readonly navigator: NavigatorService) {}

  private getAvatar(key: string) {
    const space = key.indexOf('_');
    let result = key.charAt(0);
    if (space > 0) result = `${result}${key.charAt(space + 1)}`;

    return result.toUpperCase();
  }

  public open() {
    this.navigator.toProjectSummary(this.project.key);
  }

  private getTitle() {
    if (this._project.name && this._project.name !== '') return this._project.name;
    return this._project.key;
  }

  public Icons = Icons;
}
