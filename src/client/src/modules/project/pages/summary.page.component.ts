import { Component, computed, OnDestroy, OnInit, Signal, signal } from '@angular/core';
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
import { NotificationService, NotificationSubscription } from '../../shared/services/notification.service';
import { Channels } from '../../../messages/channels';
import { ReportUploadedMessage } from '../../../messages/report-uploaded-message';
import { TuiAlertService } from '@taiga-ui/core';
import { NotificationDescriptionEnumeration } from '../../shared/enumerations/notification-description-enumeration';
import { de } from '@faker-js/faker';

@Component({
  selector: 'project.summary.page',
  imports: [DatePipe, SummaryComponent, EvolutionComponent, StatusBarComponent, PageComponent],
  templateUrl: './summary.page.component.html',
  styleUrl: './summary.page.component.scss',
})
export class SummaryPageComponent implements OnInit, OnDestroy {
  private project!: string;
  private subscription?: NotificationSubscription<ReportUploadedMessage>;

  public readonly avatar: Signal<string> = computed(() => this.getAvatar(this.summary()?.key ?? ''));
  public readonly summary = signal<ProjectSummary | undefined>(undefined);
  public readonly evolution = signal<ProjectEvolution[] | undefined>(undefined);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly projectService: ProjectService,
    private readonly loadingService: LoadingService,
    private readonly notificationService: NotificationService,
    private readonly alertService: TuiAlertService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(async (p) => {
      await this.loadingService.loadAsync(async () => {
        this.project = p['key'];
        await this.refreshAsync();
      });
    });

    this.subscription = this.notificationService.subscribe<ReportUploadedMessage>(Channels.reportUploaded, async (message) => {
      const description = NotificationDescriptionEnumeration.reportUploaded(message);

      this.alertService
        .open(description.message, {
          appearance: 'neutral',
          autoClose: 5000,
          closeable: true,
          label: description.title,
        })
        .subscribe();

      if (message.project === this.project) await this.refreshAsync();

      return message;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private async refreshAsync(): Promise<void> {
    console.log(this.project);
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
}
