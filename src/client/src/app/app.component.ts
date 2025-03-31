import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TuiRoot } from '@taiga-ui/core';
import { LoadingScreenComponent } from '../modules/shared/components/loading-screen/loading-screen.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TuiRoot, LoadingScreenComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
