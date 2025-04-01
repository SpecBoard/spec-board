import { Injectable } from '@angular/core';
import { ProjectOverview } from '../models/project-overview';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { ProjectSummary } from '../models/project-summary';
import { ProjectEvolution } from '../models/project-evolution';
import { LoggerService } from '../../logger/logger.service';

@Injectable()
export class ProjectService {
  private readonly url = 'http://localhost:5000/';

  constructor(private readonly client: HttpClient, private readonly logger: LoggerService) {}

  public async getAllAsync(): Promise<ProjectOverview[]> {
    this.logger.debug('Querying projects');
    const result = await lastValueFrom<ProjectOverview[]>(this.client.get<ProjectOverview[]>(`${this.url}api/project`));
    this.logger.information('Projects have been queried');

    return result;
  }

  public async getSummaryAsync(key: string): Promise<ProjectSummary> {
    this.logger.debug('Querying summary of {Project} project', key);
    const result = await lastValueFrom<ProjectSummary>(this.client.get<ProjectSummary>(`${this.url}api/project/${key}/summary`));
    this.logger.information('Summary has been queried of {Project} project', key);

    return result;
  }

  public async getEvolutionAsync(key: string): Promise<ProjectEvolution[]> {
    this.logger.debug('Querying evolution of {Project} project', key);
    const result = await lastValueFrom<ProjectEvolution[]>(this.client.get<ProjectEvolution[]>(`${this.url}api/project/${key}/evolution`));
    this.logger.information('Evolution has been queried of {Project} project', key);

    return result;
  }
}
