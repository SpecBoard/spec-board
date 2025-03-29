import { Component, computed, OnInit, Signal, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectSummary } from '../models/project-summary';
import { ProjectService } from '../services/project.service';
import { DatePipe } from '@angular/common';
import { SummaryComponent } from '../components/summary/summary.component';

@Component({
  selector: 'project.summary.page',
  imports: [DatePipe, SummaryComponent],
  templateUrl: './summary.page.component.html',
  styleUrl: './summary.page.component.scss',
})
export class SummaryPageComponent implements OnInit {
  public readonly avatar: Signal<string> = computed(() => this.getAvatar(this.summary()?.key ?? ''));
  public readonly summary = signal<ProjectSummary | undefined>(undefined);

  constructor(private readonly route: ActivatedRoute, private readonly projectService: ProjectService) {}

  ngOnInit(): void {
    this.route.params.subscribe(async (p) => {
      this.summary.set(await this.projectService.getSummaryAsync(p['key']));
    });
  }

  private getAvatar(key: string) {
    const space = key.indexOf('_');
    let result = key.charAt(0);
    if (space > 0) result = `${result}${key.charAt(space + 1)}`;

    return result.toUpperCase();
  }
}
