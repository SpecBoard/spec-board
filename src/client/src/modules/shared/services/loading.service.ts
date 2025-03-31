import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private _counter = 0;
  private set counter(value: number) {
    this._counter = value;
    this.loading.set(this._counter != 0);
  }
  private get counter(): number {
    return this._counter;
  }

  public readonly loading = signal(false);

  public show() {
    this.counter = this.counter + 1;
  }

  public hide() {
    if (this.counter == 0) return;

    this.counter = this.counter - 1;
  }

  public async loadAsync(func: () => Promise<void>) {
    this.show();
    try {
      await func();
    } finally {
      this.hide();
    }
  }

  public load(func: () => void) {
    this.show();
    try {
      func();
    } finally {
      this.hide();
    }
  }
}
