export class TimeSpan {
  private readonly value: string;
  private readonly splitted: string[];

  public get hours(): number {
    return Number.parseInt(this.splitted[0]);
  }

  public get minutes(): number {
    return Number.parseInt(this.splitted[1]);
  }

  public get seconds(): number {
    return Number.parseInt(this.splitted[2].split('.')[0]);
  }

  public get milliseconds(): number {
    return Number.parseInt(this.splitted[2].split('.')[1]);
  }

  constructor(value: string | TimeSpan) {
    this.value = value.toString();
    this.splitted = this.value.split(':');
  }

  public toString(): string {
    return this.value;
  }
}
