import { createComponentFactory, mockProvider } from '@ngneat/spectator/jest';
import { HomePageComponent } from './home.page.component';
import { ProjectStore } from '../stores/project.store.service';
import { ProjectService } from '../modules/project/services/project.service';

describe('HomePage', () => {
  const createCUT = createComponentFactory({
    component: HomePageComponent,
    providers: [mockProvider(ProjectStore), mockProvider(ProjectService)],
    detectChanges: false,
    shallow: true,
  });

  it('[UNIT][HMP-001]: Load Projects', () => {
    // Arrange
    const cut = createCUT();

    const spy = jest.spyOn(cut.component.projectStore, 'loadAsync');

    // Act
    cut.detectChanges();

    // Assert
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
