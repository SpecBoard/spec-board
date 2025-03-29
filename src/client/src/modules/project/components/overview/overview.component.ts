import { Component, Input, signal } from '@angular/core';
import { Project } from '../../models/project';
import { DatePipe } from '@angular/common';
import { TuiBadge } from '@taiga-ui/kit';
import { TuiIcon, TuiIconPipe } from '@taiga-ui/core';
import { Icons } from '../../helpers/Icons';
import { Router } from '@angular/router';

@Component({
  selector: 'project-overview',
  imports: [DatePipe, TuiBadge, TuiIcon, TuiIconPipe],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
})
export class OverviewComponent {
  private _project!: Project;

  public get project(): Project {
    return this._project;
  }
  @Input({ required: true })
  public set project(value: Project) {
    this._project = value;
    this.avatar.set(this.getAvatar(this._project.key));
  }

  public avatar = signal<string | undefined>(undefined);

  constructor(private readonly router: Router) {}

  private getAvatar(key: string) {
    const space = key.indexOf('_');
    let result = key.charAt(0);
    if (space > 0) result = `${result}${key.charAt(space + 1)}`;

    return result.toUpperCase();
  }

  public open() {
    console.log('Navigate');
    this.router.navigate([`project/${this._project.key}`]);
  }

  public Icons = Icons;
}
