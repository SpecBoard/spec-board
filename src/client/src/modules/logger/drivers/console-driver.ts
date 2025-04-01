import { Inject } from '@angular/core';
import { Level } from '../logger.service';
import { ConsoleDriverOptions } from '../options/console-driver-options';
import { LogDriver, LogEntry } from './log-driver';

export class ConsoleDriver extends LogDriver {
  constructor(@Inject('ConsoleDriverOptions') private readonly options: ConsoleDriverOptions) {
    super();
  }

  verbose(message: string, ...params: string[]): void {
    if (this.options.level <= Level.Verbose) console.trace(`%c${super.render(this.options.format, LogEntry.verbose(super.renderMessage(message, super.getLabels(message, params))))}}`, 'color: DarkCyan');
  }
  debug(message: string, ...params: unknown[]): void {
    if (this.options.level <= Level.Debug) console.debug(`%c${super.render(this.options.format, LogEntry.debug(super.renderMessage(message, super.getLabels(message, params))))}`, 'color: blue');
  }
  information(message: string, ...params: unknown[]): void {
    if (this.options.level <= Level.Information) console.info(`%c${super.render(this.options.format, LogEntry.information(super.renderMessage(message, super.getLabels(message, params))))}`, 'color: green');
  }
  warning(message: string, ...params: string[]): void {
    if (this.options.level <= Level.Warning) console.warn(super.render(this.options.format, LogEntry.warning(super.renderMessage(message, super.getLabels(message, params)))));
  }
  error(message: string, error: Error | undefined = undefined, ...params: string[]): void {
    if (this.options.level <= Level.Error) {
      const entry = LogEntry.error(super.renderMessage(message, super.getLabels(message, params)), error);
      console.error(super.render(this.options.format, entry), {
        error: entry.error,
      });
    }
  }
}
