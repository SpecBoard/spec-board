import { faker } from '@faker-js/faker';
import { TimeSpanFaker } from '../__test_utils__/time-span-faker';

describe('TimeSpan', () => {
  it('[UNIT][TMS-001]: Get Hours', () => {
    // Arrange
    const hours = faker.number.int({ min: 0, max: 60 });
    const tut = TimeSpanFaker.hours(hours);

    // Act
    const result = tut.hours;

    // Assert
    expect(result).toEqual(hours);
  });

  it('[UNIT][TMS-002]: Get Minutes', () => {
    // Arrange
    const minutes = faker.number.int({ min: 0, max: 60 });
    const tut = TimeSpanFaker.minutes(minutes);

    // Act
    const result = tut.minutes;

    // Assert
    expect(result).toEqual(minutes);
  });

  it('[UNIT][TMS-003]: Get Seconds', () => {
    // Arrange
    const seconds = faker.number.int({ min: 0, max: 60 });
    const tut = TimeSpanFaker.seconds(seconds);

    // Act
    const result = tut.seconds;

    // Assert
    expect(result).toEqual(seconds);
  });
  it('[UNIT][TMS-004]: Get Milliseconds', () => {
    // Arrange
    const milliseconds = faker.number.int({ min: 0, max: 1000 });
    const tut = TimeSpanFaker.milliseconds(milliseconds);

    // Act
    const result = tut.milliseconds;

    // Assert
    expect(result).toEqual(milliseconds);
  });
});
