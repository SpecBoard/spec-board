import { Component, computed, OnInit, Signal, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectSummary } from '../models/project-summary';
import { ProjectService } from '../services/project.service';
import { DatePipe } from '@angular/common';
import { SummaryComponent } from '../components/summary/summary.component';
import { ProjectEvolution } from '../models/project-evolution';
import { EvolutionComponent } from '../components/evolution/evolution.component';
import { StatusBarComponent } from '../components/status-bar/status-bar.component';
import { LoadingService } from '../../shared/services/loading.service';
import { PageComponent } from '../../shared/pages/page/page.component';

@Component({
  selector: 'project.summary.page',
  imports: [DatePipe, SummaryComponent, EvolutionComponent, StatusBarComponent, PageComponent],
  templateUrl: './summary.page.component.html',
  styleUrl: './summary.page.component.scss',
})
export class SummaryPageComponent implements OnInit {
  public readonly avatar: Signal<string> = computed(() => this.getAvatar(this.summary()?.key ?? ''));
  public readonly summary = signal<ProjectSummary | undefined>(undefined);
  public readonly evolution = signal<ProjectEvolution[] | undefined>(undefined);

  constructor(private readonly route: ActivatedRoute, private readonly projectService: ProjectService, private readonly loadingService: LoadingService) {}

  ngOnInit(): void {
    this.route.params.subscribe(async (p) => {
      await this.loadingService.loadAsync(async () => {
        const key = p['key'];
        this.summary.set(await this.projectService.getSummaryAsync(key));
        this.evolution.set(await this.projectService.getEvolutionAsync(key));
      });
    });
  }

  private getAvatar(key: string) {
    const space = key.indexOf('_');
    let result = key.charAt(0);
    if (space > 0) result = `${result}${key.charAt(space + 1)}`;

    return result.toUpperCase();
  }
}
