import { ConsoleDriverOptions } from '../options/console-driver-options';
import { LogDriver } from './log-driver';
import { LogLabel, LogLevel } from '../models/types';
import { formatDate } from '@angular/common';

export class ConsoleDriver extends LogDriver {
  protected levels = ['VRB', 'DBG', 'INF', 'WRN', 'ERR'];
  private readonly _levels: string[];

  constructor(private readonly options: ConsoleDriverOptions) {
    super();

    this._levels = Object.keys(LogLevel);
  }

  verbose(template: string, labels: LogLabel): void {
    if (this._levels.indexOf(this.options.level) <= 0) console.trace(`%c${this.renderMessage(0, template, labels)}}`, 'color: DarkCyan');
  }
  debug(template: string, labels: LogLabel): void {
    if (this._levels.indexOf(this.options.level) <= 1) console.debug(`%c${this.renderMessage(1, template, labels)}`, 'color: blue');
  }
  information(template: string, labels: LogLabel): void {
    if (this._levels.indexOf(this.options.level) <= 2) console.info(`%c${this.renderMessage(2, template, labels)}`, 'color: green');
  }
  warning(template: string, labels: LogLabel): void {
    if (this._levels.indexOf(this.options.level) <= 3) console.warn(this.renderMessage(3, template, labels));
  }
  error(template: string, labels: LogLabel, error: Error | undefined = undefined): void {
    if (this._levels.indexOf(this.options.level) <= 4) {
      console.error(this.renderMessage(4, template, labels), {
        error: error,
      });
    }
  }

  override flush(): void {}

  private renderMessage(level: number, messageTemplate: string, labels: LogLabel): string {
    return this.options.format.replace('{timestamp}', formatDate(Date.now(), 'HH:mm:ss', 'en')).replace('{level}', this.levels[level]).replace('{message}', super.render(messageTemplate, labels));
  }
}
