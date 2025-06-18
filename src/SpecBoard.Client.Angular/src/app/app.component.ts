import { Component } from '@angular/core';
import { LoggerService } from '../modules/logger/logger.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private readonly logger: LoggerService) {
    this.logger.information('Applicaton is starting up...');
  }
}
