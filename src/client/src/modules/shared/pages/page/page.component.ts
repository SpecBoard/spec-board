import { Component } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { LoadingScreenComponent } from '../../components/loading-screen/loading-screen.component';
import { TuiAlertService } from '@taiga-ui/core';

@Component({
  selector: 'page',
  imports: [LoadingScreenComponent],
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
})
export class PageComponent {
  constructor(public readonly loadingService: LoadingService, private readonly alertService: TuiAlertService) {}
}
