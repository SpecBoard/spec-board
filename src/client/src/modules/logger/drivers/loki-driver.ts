import { HttpClient } from '@angular/common/http';
import { LogDriver } from './log-driver';
import { Inject } from '@angular/core';
import { LokiDriverOptions } from './loki-driver-options';
import { LogLabel, LogLevel } from '../models/types';

export class LokiDriver extends LogDriver {
  private readonly levels = ['trace', 'debug', 'info', 'warning', 'error'];
  private readonly path = 'loki/api/v1/push';

  constructor(private readonly client: HttpClient, @Inject('LokiDriverOptions') private readonly options: LokiDriverOptions) {
    super();
  }

  override verbose(template: string, labels: LogLabel): void {
    this.log(LogLevel.Verbose, template, labels);
  }

  override debug(template: string, labels: LogLabel): void {
    this.log(LogLevel.Debug, template, labels);
  }

  override information(template: string, labels: LogLabel): void {
    this.log(LogLevel.Information, template, labels);
  }

  override warning(template: string, labels: LogLabel): void {
    this.log(LogLevel.Warning, template, labels);
  }

  override error(template: string, labels: LogLabel, error: Error | undefined): void {
    if (error) {
      labels['ErrorMessage'] = error?.message;
      labels['ErrorCause'] = error?.cause;
    }
    this.log(LogLevel.Error, template, labels);
  }

  private log(level: LogLevel, template: string, labels: LogLabel): void {
    const stream: LogLabel = {
      level: this.levels[level],
      MessageTemplate: template,
      Message: this.render(template, labels),
    };

    for (const key of Object.keys(this.options.labels)) {
      stream[key] = this.options.labels[key];
    }

    this.client.post(`${this.options.url}${this.path}`, this.getRequest(stream, JSON.stringify(labels))).subscribe();
  }

  private getRequest(labels: LogLabel, message: string) {
    return {
      streams: [{ stream: labels, values: [[(Date.now() * 1000000).toString(), message]] }],
    };
  }
}
