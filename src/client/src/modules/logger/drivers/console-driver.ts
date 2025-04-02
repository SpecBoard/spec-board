import { Inject } from '@angular/core';
import { ConsoleDriverOptions } from '../options/console-driver-options';
import { LogDriver } from './log-driver';
import { LogLabel, LogLevel } from '../models/types';
import { formatDate } from '@angular/common';

export class ConsoleDriver extends LogDriver {
  protected levels = ['VRB', 'DBG', 'INF', 'WRN', 'ERR'];

  constructor(@Inject('ConsoleDriverOptions') private readonly options: ConsoleDriverOptions) {
    super();
  }

  verbose(template: string, labels: LogLabel): void {
    if (this.options.level <= LogLevel.Verbose) console.trace(`%c${this.renderMessage(LogLevel.Verbose, template, labels)}}`, 'color: DarkCyan');
  }
  debug(template: string, labels: LogLabel): void {
    if (this.options.level <= LogLevel.Debug) console.debug(`%c${this.renderMessage(LogLevel.Debug, template, labels)}`, 'color: blue');
  }
  information(template: string, labels: LogLabel): void {
    if (this.options.level <= LogLevel.Information) console.info(`%c${this.renderMessage(LogLevel.Information, template, labels)}`, 'color: green');
  }
  warning(template: string, labels: LogLabel): void {
    if (this.options.level <= LogLevel.Warning) console.warn(this.renderMessage(LogLevel.Warning, template, labels));
  }
  error(template: string, labels: LogLabel, error: Error | undefined = undefined): void {
    if (this.options.level <= LogLevel.Error) {
      console.error(this.renderMessage(LogLevel.Error, template, labels), {
        error: error,
      });
    }
  }

  override flush(): void {}

  private renderMessage(level: LogLevel, messageTemplate: string, labels: LogLabel): string {
    return this.options.format.replace('{timestamp}', formatDate(Date.now(), 'HH:mm:ss', 'en')).replace('{level}', this.levels[level]).replace('{message}', super.render(messageTemplate, labels));
  }
}
