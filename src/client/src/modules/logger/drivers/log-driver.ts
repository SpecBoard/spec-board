import { formatDate } from '@angular/common';
import { Level } from '../logger.service';

export abstract class LogDriver {
  private readonly _expression = '{.[^}]*}';
  private readonly levels = ['VRB', 'DBG', 'INF', 'WAR', 'ERR'];

  abstract verbose(message: string, ...params: unknown[]): void;
  abstract debug(message: string, ...params: unknown[]): void;
  abstract information(message: string, ...params: unknown[]): void;
  abstract warning(message: string, ...params: string[]): void;
  abstract error(message: string, error: Error | undefined, ...params: string[]): void;

  protected render(template: string, entry: LogEntry): string {
    let result = template;

    result = result.replace(`{timestamp}`, formatDate(new Date(entry.timestamp), 'HH:mm:ss', 'en'));
    result = result.replace(`{level}`, this.levels[entry.level - 1]);
    result = result.replace(`{message}`, String(entry.message));

    return result.trim();
  }

  protected getLabels(template: string, values: unknown[]): LogLabel[] {
    const result: LogLabel[] = [];

    const placeholders = new RegExp(this._expression).exec(template) ?? [];
    for (let i = 0; i < placeholders.length; i++) {
      result.push({
        key: placeholders[i].replace('{', '').replace('}', '').trim(),
        value: values[i],
      });
    }

    return result;
  }

  protected renderMessage(template: string, labels: LogLabel[]) {
    let message = template;
    for (const label of labels) {
      message = message.replace(`{${label.key}}`, `'${String(label.value)}'`);
    }
    return message;
  }
}

export class LogEntry {
  public timestamp: number = Date.now();
  public level: Level;
  public message: string;
  public error: Error | undefined;

  public labels: LogLabel[];

  constructor(level: Level, message: string, error: Error | undefined = undefined, labels: LogLabel[] = []) {
    this.level = level;
    this.message = message;
    this.error = error;
    this.labels = labels;
  }

  public static verbose(message: string) {
    return new LogEntry(Level.Verbose, message);
  }

  public static debug(message: string) {
    return new LogEntry(Level.Debug, message);
  }

  public static information(message: string) {
    return new LogEntry(Level.Information, message);
  }

  public static warning(message: string) {
    return new LogEntry(Level.Warning, message);
  }

  public static error(message: string, error: Error | undefined) {
    return new LogEntry(Level.Error, message, error);
  }
}

export interface LogLabel {
  key: string;
  value: unknown;
}
