import { faker } from '@faker-js/faker';
import { TestLogDriver } from '../__test_utils__/test-log-driver';
import { formatDate } from '@angular/common';
import { Level } from '../logger.service';

describe('LogDriver', () => {
  const createSUT = () => new TestLogDriver();

  it('[UNIT][LGD-001]: Rendering Trace Entry', () => {
    // Arrange
    const sut = createSUT();
    const placeholder = faker.string.alpha();
    const message = 'Message: {Placeholder}';

    // Act
    sut.verbose(message, placeholder);

    // Assert
    expect(sut.renderedEntry).toEqual(getEntry(sut.template, Date.now(), Level.Verbose, message, placeholder));
  });

  it('[UNIT][LGD-002]: Rendering Debug Entry', () => {
    // Arrange
    const sut = createSUT();
    const placeholder = faker.string.alpha();
    const message = 'Message: {Placeholder}';

    // Act
    sut.debug(message, placeholder);

    // Assert
    expect(sut.renderedEntry).toEqual(getEntry(sut.template, Date.now(), Level.Debug, message, placeholder));
  });

  it('[UNIT][LGD-003]: Rendering Information Entry', () => {
    // Arrange
    const sut = createSUT();
    const placeholder = faker.string.alpha();
    const message = 'Message: {Placeholder}';

    // Act
    sut.information(message, placeholder);

    // Assert
    expect(sut.renderedEntry).toEqual(getEntry(sut.template, Date.now(), Level.Information, message, placeholder));
  });

  it('[UNIT][LGD-004]: Rendering Warning Entry', () => {
    // Arrange
    const sut = createSUT();
    const placeholder = faker.string.alpha();
    const message = 'Message: {Placeholder}';

    // Act
    sut.warning(message, placeholder);

    // Assert
    expect(sut.renderedEntry).toEqual(getEntry(sut.template, Date.now(), Level.Warning, message, placeholder));
  });

  it('[UNIT][LGD-005]: Rendering Error Entry', () => {
    // Arrange
    const sut = createSUT();
    const placeholder = faker.string.alpha();
    const message = 'Message: {Placeholder}';

    // Act
    sut.error(message, undefined, placeholder);

    // Assert
    expect(sut.renderedEntry).toEqual(getEntry(sut.template, Date.now(), Level.Error, message, placeholder));
  });

  const levels = ['VRB', 'DBG', 'INF', 'WAR', 'ERR'];

  const getEntry = (template: string, timestamp: number, level: Level, message: string, placeholder: string) => {
    return template
      .replace('{timestamp}', formatDate(new Date(timestamp), 'HH:mm:ss', 'en'))
      .replace('{level}', levels[level - 1].toString())
      .replace('{message}', message.replace('{Placeholder}', `'${placeholder}'`));
  };
});
