import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProjectStore } from '../stores/project.store.service';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from '../modules/project/components/overview/overview.component';
import { TuiSwitch, tuiSwitchOptionsProvider } from '@taiga-ui/kit';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingService } from '../modules/shared/services/loading.service';
import { PageComponent } from '../modules/shared/pages/page/page.component';
import { TuiButton } from '@taiga-ui/core';
import { NotificationService, NotificationSubscription } from '../modules/shared/services/notification.service';
import { Channels } from '../messages/channels';
import { ReportUploadedMessage } from '../messages/report-uploaded-message';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.page.component.html',
  imports: [CommonModule, OverviewComponent, TuiSwitch, ReactiveFormsModule, FormsModule, CommonModule, PageComponent, TuiButton],
  providers: [
    ProjectStore,
    tuiSwitchOptionsProvider({
      showIcons: false,
      size: 'm',
    }),
  ],
  styleUrls: ['./home.page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  private subscription?: NotificationSubscription<ReportUploadedMessage>;

  constructor(public readonly projectStore: ProjectStore, private readonly notificationService: NotificationService, public readonly loadingService: LoadingService) {}

  ngOnInit(): void {
    this.subscription = this.notificationService.subscribe<ReportUploadedMessage>(Channels.reportUploaded, async (_) => {
      await this.projectStore.loadAsync();

      return _;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
