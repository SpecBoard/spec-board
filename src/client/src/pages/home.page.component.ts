import { Component, OnInit } from '@angular/core';
import { ProjectStore } from '../stores/project.store.service';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from '../modules/project/components/overview/overview.component';
import { TuiSkeleton, TuiSwitch, tuiSwitchOptionsProvider } from '@taiga-ui/kit';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingService } from '../modules/shared/services/loading.service';
import { PageComponent } from '../modules/shared/pages/page/page.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.page.component.html',
  imports: [CommonModule, OverviewComponent, TuiSwitch, ReactiveFormsModule, FormsModule, CommonModule, TuiSkeleton, PageComponent],
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
  constructor(public readonly projectStore: ProjectStore, public readonly loadingService: LoadingService) {}

  ngOnInit() {
    void this.loadingService.loadAsync(async () => {
      void this.projectStore.loadAsync();
    });
  }
}
