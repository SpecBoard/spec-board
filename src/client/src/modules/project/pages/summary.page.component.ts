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
import { TuiButton, TuiIcon, TuiLabel, TuiTextfield } from '@taiga-ui/core';
import { TuiDrawer } from '@taiga-ui/kit';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'project.summary.page',
  imports: [DatePipe, SummaryComponent, EvolutionComponent, StatusBarComponent, PageComponent, TuiIcon, TuiDrawer, TuiButton, TuiTextfield, TuiLabel, FormsModule],
  templateUrl: './summary.page.component.html',
  styleUrl: './summary.page.component.scss',
})
export class SummaryPageComponent implements OnInit {
  private project!: string;

  public settings = signal<boolean>(false);

  public readonly avatar: Signal<string> = computed(() => this.getAvatar(this.summary()?.key ?? ''));
  public readonly summary = signal<ProjectSummary | undefined>(undefined);
  public readonly evolution = signal<ProjectEvolution[] | undefined>(undefined);

  constructor(private readonly route: ActivatedRoute, private readonly projectService: ProjectService, private readonly loadingService: LoadingService) {}

  ngOnInit(): void {
    this.route.params.subscribe(async (p) => {
      await this.loadingService.loadAsync(async () => {
        this.project = p['key'];
        await this.refreshAsync();
      });
    });
  }

  private async refreshAsync(): Promise<void> {
    this.summary.set(await this.projectService.getSummaryAsync(this.project));
    this.evolution.set(await this.projectService.getEvolutionAsync(this.project));
  }

  private getAvatar(key: string | undefined) {
    if (!key) return '';

    const space = key.indexOf('_');
    let result = key.charAt(0);
    if (space > 0) result = `${result}${key.charAt(space + 1)}`;

    return result.toUpperCase();
  }

  public getTitle() {
    if (!this.summary()?.name || this.summary()?.name === '') return this.summary()?.key;

    return this.summary()?.name;
  }

  public save() {
    void this.loadingService.loadAsync(async () => {
      await this.projectService.updateAsync(this.summary()!.key, this.summary()!.name);
    });
  }
}
