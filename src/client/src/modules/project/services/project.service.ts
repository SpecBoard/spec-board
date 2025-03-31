import { Injectable } from '@angular/core';
import { ProjectOverview } from '../models/project-overview';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { ProjectSummary } from '../models/project-summary';
import { ProjectEvolution } from '../models/project-evolution';

@Injectable()
export class ProjectService {
  private readonly url = 'http://localhost:5000/';

  constructor(private readonly client: HttpClient) {}

  public async getAllAsync(): Promise<ProjectOverview[]> {
    return lastValueFrom<ProjectOverview[]>(this.client.get<ProjectOverview[]>(`${this.url}api/project`));
  }

  public async getSummaryAsync(key: string): Promise<ProjectSummary> {
    return lastValueFrom<ProjectSummary>(this.client.get<ProjectSummary>(`${this.url}api/project/${key}/summary`));
  }

  public async getEvolutionAsync(key: string): Promise<ProjectEvolution[]> {
    return lastValueFrom<ProjectEvolution[]>(this.client.get<ProjectEvolution[]>(`${this.url}api/project/${key}/evolution`));
  }
}
