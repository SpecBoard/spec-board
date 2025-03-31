import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TuiRoot } from '@taiga-ui/core';
import { LoadingScreenComponent } from '../modules/shared/components/loading-screen/loading-screen.component';
import { LoadingService } from '../modules/shared/services/loading.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TuiRoot, LoadingScreenComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(public readonly loadingService: LoadingService) {}
}
