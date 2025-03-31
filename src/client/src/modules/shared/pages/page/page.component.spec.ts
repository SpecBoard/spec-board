import { byTestId, createComponentFactory, createHostFactory } from '@ngneat/spectator/jest';
import { PageComponent } from './page.component';
import { mockProvider } from '@ngneat/spectator/jest';
import { LoadingService } from '../../services/loading.service';
import { signal } from '@angular/core';

describe('PageComponent', () => {
  const loading = signal(false);

  const createCUT = createHostFactory({
    component: PageComponent,
    providers: [
      mockProvider(LoadingService, {
        loading: loading,
      }),
    ],
    detectChanges: false,
  });

  it('[UNIT][PAG-001]: Hide Content', () => {
    // Arrange
    const cut = createCUT(`<page><div data-testid="divContent"></div></page>`);

    // Act
    loading.set(true);
    cut.detectChanges();

    // Assert
    expect(cut.query(byTestId('divContent'))).toBeNull();
  });

  it('[UNIT][PAG-002]: Show Content', () => {
    // Arrange
    const cut = createCUT(`<page><div data-testid="divContent"></div><page>`);
    loading.set(true);
    cut.detectChanges();

    // Act
    loading.set(false);
    cut.detectChanges();

    // Assert
    expect(cut.query(byTestId('divContent'))).not.toBeNull();
  });
});
