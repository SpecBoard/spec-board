import { byTestId, createComponentFactory } from '@ngneat/spectator/jest';
import { LoadingScreenComponent } from './loading-screen.component';
import { LoadingService } from '../../services/loading.service';
import { signal } from '@angular/core';
import { mockProvider } from '@ngneat/spectator/jest';

describe('LoadingScreenComponent', () => {
  const loading = signal(false);

  const createCUT = createComponentFactory({
    component: LoadingScreenComponent,
    providers: [
      mockProvider(LoadingService, {
        loading: loading,
      }),
    ],
    detectChanges: false,
  });

  it('[UNIT][LSC-001]: Show Loading Screen', () => {
    // Arrange
    const cut = createCUT();

    // Act
    loading.set(true);
    cut.detectChanges();

    // Assert
    expect(cut.query(byTestId('divLoadingScreen'))).not.toBeNull();
  });

  it('[UNIT][LSC-002]: Hide Loading Screen', () => {
    // Arrange
    const cut = createCUT();

    loading.set(true);
    cut.detectChanges();

    // Act
    loading.set(false);
    cut.detectChanges();

    // Assert
    expect(cut.query(byTestId('divLoadingScreen'))).toBeNull();
  });
});
