import { Component, signal } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { LoadingScreenComponent } from '../../components/loading-screen/loading-screen.component';
import { ProjectStore } from '../../../../stores/project.store.service';
import { CommonModule } from '@angular/common';
import { TuiButton, TuiIcon, TuiLink, TuiPopup, TuiScrollbar, TuiTitle } from '@taiga-ui/core';
import { TuiBadge, TuiBadgedContent, TuiBadgeNotification, TuiDrawer, TuiTabs } from '@taiga-ui/kit';

@Component({
  selector: 'page',
  imports: [LoadingScreenComponent, CommonModule, TuiIcon, TuiBadgeNotification, TuiBadgedContent, TuiDrawer, TuiPopup, TuiBadge, TuiButton, TuiDrawer, TuiLink, TuiPopup, TuiScrollbar, TuiTabs, TuiTitle],
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
})
export class PageComponent {
  public readonly notifications = signal(false);

  constructor(public readonly loadingService: LoadingService, public readonly projectStore: ProjectStore) {}
}
