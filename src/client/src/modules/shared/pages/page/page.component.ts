import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { LoadingScreenComponent } from '../../components/loading-screen/loading-screen.component';
import { NotificationService } from '../../services/notification.service';
import { TuiAlertService } from '@taiga-ui/core';
import { LoggerService } from '../../../logger/logger.service';
import { ProjectService } from '../../../project/services/project.service';
import { ProjectStore } from '../../../../stores/project.store.service';

@Component({
  selector: 'page',
  imports: [LoadingScreenComponent],
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
})
export class PageComponent implements OnInit, OnDestroy {
  private readonly uploadedHandler = async (message: { project: string; version: string }): Promise<void> => {
    this.alertService
      .open(`New report has been uploaded to ${message.project}`, {
        appearance: 'positive',
        autoClose: 2000,
        label: 'New Report',
      })
      .subscribe();

    await this.projectStore.loadAsync();
  };

  constructor(private readonly projectStore: ProjectStore, private readonly notificationService: NotificationService, public readonly loadingService: LoadingService, private readonly alertService: TuiAlertService) {}

  ngOnInit(): void {
    this.notificationService.subscribe('report.uploaded', this.uploadedHandler);
  }

  ngOnDestroy(): void {
    this.notificationService.unsubscribe('report.uploaded', this.uploadedHandler);
  }
}
