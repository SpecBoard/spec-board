import { LogDriver, LogEntry } from '../drivers/log-driver';

export class TestLogDriver extends LogDriver {
  public readonly template = '{timestamp} - {level} - {message}';
  public renderedEntry = '';

  private log(message: string, entry: LogEntry) {
    this.renderedEntry = super.render(this.template, entry);
  }

  override verbose(message: string, ...params: unknown[]): void {
    this.log(this.template, LogEntry.verbose(super.renderMessage(message, super.getLabels(message, params))));
  }
  override debug(message: string, ...params: unknown[]): void {
    this.log(this.template, LogEntry.debug(super.renderMessage(message, super.getLabels(message, params))));
  }
  override information(message: string, ...params: unknown[]): void {
    this.log(this.template, LogEntry.information(super.renderMessage(message, super.getLabels(message, params))));
  }
  override warning(message: string, ...params: string[]): void {
    this.log(this.template, LogEntry.warning(super.renderMessage(message, super.getLabels(message, params))));
  }
  override error(message: string, error: Error | undefined, ...params: string[]): void {
    this.log(this.template, LogEntry.error(super.renderMessage(message, super.getLabels(message, params)), error));
  }
}
