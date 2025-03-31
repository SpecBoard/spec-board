import { createPipeFactory } from '@ngneat/spectator/jest';
import { DurationPipe } from './duration.pipe';
import { TimeSpanFaker } from '../__test_utils__/time-span-faker';
import { faker } from '@faker-js/faker';

describe('DurationPipe', () => {
  const createPUT = createPipeFactory({
    pipe: DurationPipe,
  });

  it('[UNIT][DRP-001]: Show Full Duration', () => {
    // Arrange
    const hours = faker.number.int({ min: 24, max: 36 });
    const timespan = TimeSpanFaker.hours(hours);

    // Act
    const put = createPUT(`{{ '${timespan}' | duration }}`);

    // Assert
    expect(put.element).toHaveExactText(`${Math.floor(timespan.hours / 24)}d ${timespan.hours % 24}h ${timespan.minutes}m ${timespan.seconds}s`);
  });

  it('[UNIT][DRP-002]: Hours less then 24', () => {
    // Arrange
    const hours = faker.number.int({ min: 1, max: 23 });
    const timespan = TimeSpanFaker.hours(hours);

    // Act
    const put = createPUT(`{{ '${timespan}' | duration }}`);

    // Assert
    expect(put.element).toHaveExactText(`${timespan.hours % 24}h ${timespan.minutes}m ${timespan.seconds}s`);
  });

  it('[UNIT][DRP-003]: Hours is 0', () => {
    // Arrange
    const timespan = TimeSpanFaker.hours(0);

    // Act
    const put = createPUT(`{{ '${timespan}' | duration }}`);

    // Assert
    expect(put.element).toHaveExactText(`${timespan.minutes}m ${timespan.seconds}s`);
  });
});
