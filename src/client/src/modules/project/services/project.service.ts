import { Injectable } from '@angular/core';
import { ProjectOverview } from '../models/project-overview';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { ProjectSummary } from '../models/project-summary';
import { ProjectEvolution } from '../models/project-evolution';
import { LoggerService } from '../../logger/logger.service';
import { sourceContext } from '../../logger/enrichers/source-context-enricher';
import { BackendOptions } from '../../../options/backendOptions';

@Injectable()
export class ProjectService {
  constructor(private readonly client: HttpClient, private readonly options: BackendOptions, private readonly logger: LoggerService) {}

  public async getAllAsync(): Promise<ProjectOverview[]> {
    this.logger.verbose('Getting Projects');
    const result = await lastValueFrom<ProjectOverview[]>(this.client.get<ProjectOverview[]>(`${this.options.baseAddress}api/project`));
    sourceContext(ProjectService, () => {
      this.logger.information('{Count} project has been queried', result.length);
    });
    return result;
  }

  public async getSummaryAsync(key: string): Promise<ProjectSummary> {
    return await lastValueFrom<ProjectSummary>(this.client.get<ProjectSummary>(`${this.options.baseAddress}api/project/${key}/summary`));
  }

  public async getEvolutionAsync(key: string): Promise<ProjectEvolution[]> {
    return await lastValueFrom<ProjectEvolution[]>(this.client.get<ProjectEvolution[]>(`${this.options.baseAddress}api/project/${key}/evolution`));
  }

  public async updateAsync(key: string, name?: string) {
    await lastValueFrom(this.client.patch(`${this.options.baseAddress}api/project/${key}`, { name: name }));
  }
}
