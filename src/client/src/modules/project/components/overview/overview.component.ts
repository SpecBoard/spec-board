import { Component, Input, signal } from '@angular/core';
import { Project } from '../../models/project';

@Component({
  selector: 'project-overview',
  imports: [],
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

  private getAvatar(key: string) {
    const space = key.indexOf('_');
    let result = key.charAt(0);
    if (space > 0) result = `${result}${key.charAt(space + 1)}`;

    return result.toUpperCase();
  }
}
