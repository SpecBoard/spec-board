import { byTestId, createComponentFactory } from '@ngneat/spectator/jest';
import { OverviewComponent } from './overview.component';
import { ProjectFaker } from '../../__test_utils__/project-faker';

describe('OverviewComponent', () => {
  const createCUT = createComponentFactory({
    component: OverviewComponent,
    detectChanges: true,
  });

  it('[UNIT][POC-001]: Calculate Avatar', () => {
    // Arrange
    const project = ProjectFaker.random();

    // Act
    const cut = createCUT({
      props: {
        project: project,
      },
    });

    // Assert
    cut.detectChanges();
    expect(cut.query(byTestId('divAvatar'))?.textContent).toEqual(
      getAvatar(project.key)
    );
  });

  const getAvatar = (key: string): string => {
    return `${key.charAt(0)}${key.charAt(key.indexOf('_') + 1)}`.toUpperCase();
  };
});
