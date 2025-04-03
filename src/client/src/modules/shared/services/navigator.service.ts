import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigatorService {
  constructor(private readonly router: Router) {}

  public toHome(): void {
    this.router.navigate(['']);
  }

  public toBack(): void {
    this.router.navigate(['..']);
  }

  public toProjectSummary(key: string) {
    this.router.navigate(['project', key]);
  }

  public toUnexpectedError(): void {
    this.router.navigate(['error/unexpected-error']);
  }

  public toNotFound(): void {
    this.router.navigate(['error/not-found']);
  }
}
