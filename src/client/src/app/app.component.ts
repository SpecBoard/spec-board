import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TuiAlerts } from '@taiga-ui/core';
import { NotificationService } from '../modules/shared/services/notification.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TuiAlerts],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(private readonly notificationService: NotificationService) {}

  ngOnInit(): void {
    void this.notificationService.connectAsync();
  }
}
