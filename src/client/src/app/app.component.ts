import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BrnSeparatorComponent } from '@spartan-ng/brain/separator';
import { HlmSeparatorDirective } from '@spartan-ng/ui-separator-helm';
import { lucideImageOff, lucideCircleUser } from '@ng-icons/lucide';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';
import { NgIcon, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    BrnSeparatorComponent,
    HlmSeparatorDirective,
    HlmIconDirective,
    NgIcon,
  ],
  providers: [provideIcons({ lucideImageOff, lucideCircleUser })],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
