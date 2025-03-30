import { Pipe, PipeTransform } from '@angular/core';
import { TimeSpan } from '../types/time-span';

@Pipe({
  name: 'duration',
  standalone: true,
})
export class DurationPipe implements PipeTransform {
  transform(value: TimeSpan | string, ...args: string[]): string {
    const timespan = new TimeSpan(value);
    let result = '';

    const days = Math.floor(timespan.hours / 24);
    if (days > 0) result = `${days}d `;

    if (timespan.hours > 0) result = `${result}${timespan.hours % 24}h `;

    return `${result}${timespan.minutes}m ${timespan.seconds}s`;
  }
}
