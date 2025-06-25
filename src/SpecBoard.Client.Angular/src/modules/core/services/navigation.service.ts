import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private readonly router: Router) {}

  back(): void {
    this.router.navigate(['..']);
  }

  toLogIn(): void {
    this.router.navigate(['login']);
  }
}
