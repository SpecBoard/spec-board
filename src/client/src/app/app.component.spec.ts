import { createComponentFactory } from '@ngneat/spectator';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  const createCUT = createComponentFactory(AppComponent);

  it('[UNIT][TEST-001] - Test of Jest', () => {
    // Act
    const cut = createCUT();

    // Assert
    expect(cut).not.toBeNull();
  });
});
