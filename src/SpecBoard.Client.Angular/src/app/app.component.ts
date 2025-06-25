import { Component } from '@angular/core';
import { LoggerService } from '../modules/logger/logger.service';
import { ButtonModule } from 'primeng/button';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ButtonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private readonly logger: LoggerService) {
    this.logger.information('Applicaton is starting up...');
  }
}
