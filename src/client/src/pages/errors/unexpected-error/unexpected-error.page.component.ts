import { Component } from '@angular/core';
import { TuiButton } from '@taiga-ui/core';
import { NavigatorService } from '../../../modules/shared/services/navigator.service';

@Component({
  selector: 'app-unexpected-error.page',
  imports: [TuiButton],
  templateUrl: './unexpected-error.page.component.html',
  styleUrl: './unexpected-error.page.component.scss',
})
export class UnexpectedErrorPageComponent {
  constructor(private readonly navigator: NavigatorService) {}

  public goToHome() {
    this.navigator.toHome();
  }
}
