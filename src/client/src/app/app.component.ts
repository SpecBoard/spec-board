import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TuiAlerts } from '@taiga-ui/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TuiAlerts],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
