import { Component, OnInit } from '@angular/core';
import { ProjectStore } from '../stores/project.store.service';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from '../modules/project/components/overview/overview.component';
import { TuiSwitch, tuiSwitchOptionsProvider } from '@taiga-ui/kit';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingService } from '../modules/shared/services/loading.service';
import { PageComponent } from '../modules/shared/pages/page/page.component';
import { TuiAlertService, TuiButton } from '@taiga-ui/core';

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
export class HomePageComponent implements OnInit {
  constructor(public readonly projectStore: ProjectStore, public readonly loadingService: LoadingService, public readonly alertService: TuiAlertService) {}

  ngOnInit() {
    void this.loadingService.loadAsync(async () => {
      await this.projectStore.loadAsync();
    });
  }
}
