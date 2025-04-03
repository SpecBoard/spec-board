import { Injectable } from '@angular/core';
import { ProjectOverview } from '../models/project-overview';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { ProjectSummary } from '../models/project-summary';
import { ProjectEvolution } from '../models/project-evolution';
import { LoggerService } from '../../logger/logger.service';
import { sourceContext } from '../../logger/enrichers/source-context-enricher';

@Injectable()
export class ProjectService {
  private readonly url = 'http://localhost:5000/';

  constructor(private readonly client: HttpClient, private readonly logger: LoggerService) {}

  public async getAllAsync(): Promise<ProjectOverview[]> {
    const result = await lastValueFrom<ProjectOverview[]>(this.client.get<ProjectOverview[]>(`${this.url}api/project`));
    sourceContext(ProjectService, () => {
      this.logger.information('{Count} project has been queried', result.length);
    });
    return result;
  }

  public async getSummaryAsync(key: string): Promise<ProjectSummary> {
    const result = await lastValueFrom<ProjectSummary>(this.client.get<ProjectSummary>(`${this.url}api/project/test/summary`));

    return result;
  }

  public async getEvolutionAsync(key: string): Promise<ProjectEvolution[]> {
    const result = await lastValueFrom<ProjectEvolution[]>(this.client.get<ProjectEvolution[]>(`${this.url}api/project/${key}/evolution`));

    return result;
  }
}
