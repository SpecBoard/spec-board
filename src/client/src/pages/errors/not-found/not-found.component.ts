import { Component } from '@angular/core';
import { NavigatorService } from '../../../modules/shared/services/navigator.service';
import { TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'app-not-found',
  imports: [TuiButton],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {
  constructor(private readonly navigator: NavigatorService) {}

  public goToHome() {
    this.navigator.toHome();
  }
}
