import { createServiceFactory } from '@ngneat/spectator/jest';
import { LoadingService } from './loading.service';
import { timeout } from 'rxjs';

describe('LoadingService', () => {
  const createSUT = createServiceFactory({
    service: LoadingService,
  });

  it('[UNIT][LOD-001]: Show', () => {
    // Arrange
    const sut = createSUT();

    // Act
    sut.service.show();

    // Assert
    expect(sut.service.loading()).toEqual(true);
  });

  it('[UNIT][LOD-002]: Hide', () => {
    // Arrange
    const sut = createSUT();
    sut.service.show();

    // Act
    sut.service.hide();

    // Assert
    expect(sut.service.loading()).toEqual(false);
  });

  it('[UNIT][LOD-003]: Show Multiple Times', () => {
    // Arrange
    const sut = createSUT();
    sut.service.show();
    sut.service.show();

    // Act
    sut.service.hide();

    // Assert
    expect(sut.service.loading()).toEqual(true);
  });

  it('[UNIT][LOD-004]: Hide more than Shown', () => {
    // Arrange
    const sut = createSUT();
    sut.service.show();
    sut.service.hide();

    // Act
    sut.service.hide();

    // Assert
    expect(sut.service.loading()).toEqual(false);
  });

  it('[UNIT][LOD-005]: Show if loadAsync', () => {
    // Arrange
    const sut = createSUT();
    const promise = Promise.resolve();

    // Act
    sut.service.loadAsync(async () => await promise);

    // Assert
    expect(sut.service.loading()).toEqual(true);
  });

  it('[UNIT][LOD-006]: Hide if loadAsync resolved', async () => {
    // Arrange
    const sut = createSUT();

    // Act
    await sut.service.loadAsync(async () => {
      timeout(100);
    });

    // Arrange
    expect(sut.service.loading()).toEqual(false);
  });

  it('[UNIT][LOD-007]: Hide if loadAsync Rejected', async () => {
    // Arrange
    const sut = createSUT();

    // Act
    try {
      await sut.service.loadAsync(async () => {
        throw new Error();
      });
    } catch {
      // Arrange
      expect(sut.service.loading()).toEqual(false);
    }
  });

  it('[UNIT][LOD-008]: Show if load', () => {
    // Arrange
    const sut = createSUT();

    // Act
    // Assert
    sut.service.load(() => {
      expect(sut.service.loading()).toEqual(true);
    });
  });

  it('[UNIT][LOD-009]: Hide if load end', () => {
    // Arrange
    const sut = createSUT();

    // Act
    sut.service.load(() => {
      timeout(100);
    });

    // Assert
    expect(sut.service.loading()).toEqual(false);
  });

  it('[UNIT][LOD-010]: Hide if load ended with error', () => {
    // Arrange
    const sut = createSUT();

    // Act
    try {
      sut.service.load(() => {
        throw new Error();
      });
    } catch {
      // Assert
      expect(sut.service.loading()).toEqual(false);
    }
  });
});
