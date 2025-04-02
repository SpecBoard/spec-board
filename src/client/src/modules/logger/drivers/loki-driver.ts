import { HttpClient } from '@angular/common/http';
import { LogDriver } from './log-driver';
import { Inject } from '@angular/core';
import { LokiDriverOptions } from '../options/loki-driver-options';
import { LogLabel, LogLevel } from '../models/types';
import { BehaviorSubject } from 'rxjs';

export class LokiDriver extends LogDriver {
  private readonly levels = ['trace', 'debug', 'info', 'warning', 'error'];
  private readonly path = 'loki/api/v1/push';

  private readonly entries = new BehaviorSubject<{ timestamp: number; level: LogLevel; template: string; labels: LogLabel }[]>([]);

  constructor(private readonly client: HttpClient, @Inject('LokiDriverOptions') private readonly options: LokiDriverOptions) {
    super();

    this.entries.subscribe((entries) => {
      if (entries.length >= this.options.bufferSize) this.flush();
    });
    setInterval(this.flush.bind(this), this.options.pushInterval);
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

  override flush(): void {
    void new Promise(() => {
      const values = this.entries.getValue();
      if (values.length > 0) {
        this.entries.next([]);

        const streams: { stream: LogLabel; values: string[][] }[] = [];
        for (const entry of values) {
          const stream: LogLabel = {
            level: this.levels[entry.level],
            MessageTemplate: entry.template,
            Message: this.render(entry.template, entry.labels),
          };

          for (const key of Object.keys(this.options.labels)) {
            stream[key] = this.options.labels[key];
          }

          streams.push({ stream: stream, values: [[entry.timestamp.toString(), JSON.stringify(entry.labels)]] });
        }

        this.client.post(`${this.options.url}${this.path}`, { streams: streams }).subscribe();
        this.entries.next([]);
      }
    });
  }

  private log(level: LogLevel, template: string, labels: LogLabel): void {
    const entries = this.entries.getValue();
    entries.push({ timestamp: Date.now() * 1000000, level: level, template: template, labels: labels });
    this.entries.next(entries);
  }
}
