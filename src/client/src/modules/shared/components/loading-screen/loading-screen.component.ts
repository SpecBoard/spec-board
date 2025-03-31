import { Component } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { TuiLoader } from '@taiga-ui/core';

@Component({
  selector: 'loading-screen',
  imports: [TuiLoader],
  templateUrl: './loading-screen.component.html',
  styleUrl: './loading-screen.component.scss',
})
export class LoadingScreenComponent {
  constructor(public readonly loadingService: LoadingService) {}
}
