import { HttpClient } from '@angular/common/http';
import { LogDriver, LogLabel } from './log-driver';
import { Level } from '../logger.service';
import { Inject } from '@angular/core';
import { LokiDriverOptions } from './loki-driver-options';

export class LokiDriver extends LogDriver {
  private readonly lokiLevels = ['trace', 'debug', 'info', 'warning', 'error'];
  private readonly path = 'loki/api/v1/push';

  constructor(private readonly client: HttpClient, @Inject('LokiDriverOptions') private readonly options: LokiDriverOptions) {
    super();
  }

  override verbose(message: string, ...params: unknown[]): void {
    throw new Error('Method not implemented.');
  }
  override debug(message: string, ...params: unknown[]): void {
    const renderedMessage = this.renderMessage(message, this.getLabels(message, params));
    const entry = this.getEntry(this.getLabels(message, params));

    const labels = this.options.labels;
    labels.push({ key: 'level', value: this.lokiLevels[Level.Debug - 1] });
    labels.push({ key: 'Message', value: renderedMessage });
    labels.push({ key: 'MessageTemplate', value: message });

    this.client.post(`${this.options.url}${this.path}`, this.getRequest(labels, entry)).subscribe();
  }
  override information(message: string, ...params: unknown[]): void {
    const renderedMessage = this.renderMessage(message, this.getLabels(message, params));
    const entry = this.getEntry(this.getLabels(message, params));

    const labels = this.options.labels;
    labels.push({ key: 'level', value: this.lokiLevels[Level.Information - 1] });
    labels.push({ key: 'Message', value: renderedMessage });
    labels.push({ key: 'MessageTemplate', value: message });

    this.client.post(`${this.options.url}${this.path}`, this.getRequest(labels, entry)).subscribe();
  }

  override warning(message: string, ...params: string[]): void {
    throw new Error('Method not implemented.');
  }
  override error(message: string, error: Error | undefined, ...params: string[]): void {
    throw new Error('Method not implemented.');
  }

  private getEntry(labels: LogLabel[]): entry {
    const result: entry = {};

    for (const label of labels) {
      result[label.key] = label.value;
    }

    return result;
  }

  private getRequest(labels: LogLabel[], entry: entry): request {
    const stream: entry = {};
    for (const label of labels) {
      stream[label.key] = label.value;
    }

    return {
      streams: [{ stream: stream, values: [[(Date.now() * 1000000).toString(), JSON.stringify(entry)]] }],
    };
  }
}

export interface request {
  streams: [
    {
      stream: entry;
      values: string[][];
    }
  ];
}

export type entry = Record<string, unknown>;
