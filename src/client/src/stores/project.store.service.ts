import { Injectable } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Project } from '../modules/project/models/project';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectStore {
  private readonly value = new BehaviorSubject<Project[]>([]);

  constructor(private readonly projectService: ProjectService) {}

  public Value$ = this.value.asObservable();
  public get Value(): Project[] {
    return this.value.value;
  }

  public async loadAsync(): Promise<void> {
    console.log('Loading Projects');
    this.value.next(await this.projectService.getAsync());
  }
}
