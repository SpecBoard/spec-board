import { LogLabel } from '../models/types';

export abstract class LogDriver {
  abstract verbose(template: string, labels: LogLabel): void;
  abstract debug(template: string, labels: LogLabel): void;
  abstract information(template: string, labels: LogLabel): void;
  abstract warning(template: string, labels: LogLabel): void;
  abstract error(template: string, labels: LogLabel, error: Error | undefined): void;

  abstract flush(): void;

  protected render(template: string, labels: LogLabel) {
    let message = template;
    for (const key of Object.keys(labels)) {
      message = message.replace(`{${key}}`, String(labels[key]));
    }
    return message;
  }
}
