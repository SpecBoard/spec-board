import { Component, OnInit } from '@angular/core';
import { ProjectStore } from '../stores/project.store.service';
import { CommonModule } from '@angular/common';
import { HlmSwitchComponent } from '@spartan-ng/ui-switch-helm';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.page.component.html',
  imports: [CommonModule, HlmSwitchComponent],
  providers: [ProjectStore],
  styleUrls: ['./home.page.component.css'],
})
export class HomePageComponent implements OnInit {
  constructor(public readonly projectStore: ProjectStore) {}

  ngOnInit() {
    void this.projectStore.loadAsync();
  }
}
