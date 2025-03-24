import { Injectable } from '@angular/core';
import { Project } from '../models/project';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ProjectService {
  private readonly url = 'http://localhost:5000/';

  constructor(private readonly client: HttpClient) {}

  public async getAsync(): Promise<Project[]> {
    return lastValueFrom<Project[]>(
      this.client.get<Project[]>(`${this.url}api/project`)
    );
  }
}
