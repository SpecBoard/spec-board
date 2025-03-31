import { Injectable } from '@angular/core';
import { ProjectService } from '../modules/project/services/project.service';
import { ProjectOverview } from '../modules/project/models/project-overview';
import { BehaviorSubject } from 'rxjs';
import { LoadingService } from '../modules/shared/services/loading.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectStore {
  private readonly value = new BehaviorSubject<ProjectOverview[]>([]);

  constructor(private readonly projectService: ProjectService, public readonly loadingService: LoadingService) {}

  public Value$ = this.value.asObservable();
  public get Value(): ProjectOverview[] {
    return this.value.value;
  }

  public async loadAsync(): Promise<void> {
    console.log('Loading Projects');
    this.loadingService.loadAsync(async () => this.value.next(await this.projectService.getAllAsync()));
  }
}
