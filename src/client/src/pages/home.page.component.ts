import { Component, OnInit } from '@angular/core';
import { ProjectStore } from '../stores/project.store.service';
import { CommonModule } from '@angular/common';
import { HlmSwitchComponent } from '@spartan-ng/ui-switch-helm';
import { OverviewComponent } from '../modules/project/components/overview/overview.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.page.component.html',
  imports: [CommonModule, HlmSwitchComponent, OverviewComponent],
  providers: [ProjectStore],
  styleUrls: ['./home.page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(public readonly projectStore: ProjectStore) {}

  ngOnInit() {
    void this.projectStore.loadAsync();
  }
}
