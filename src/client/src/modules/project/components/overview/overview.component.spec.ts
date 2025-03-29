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
    expect(cut.query(byTestId('divAvatar'))?.textContent).toEqual(getAvatar(project.key));
  });

  it('[UNIT][POC-002]: Show Status as Pass', () => {
    // Arrange
    const project = ProjectFaker.pass();

    // Act
    const cut = createCUT({
      props: {
        project: project,
      },
    });

    // Assert
    expect(cut.query(byTestId('secOverview'))?.classList).toContain('pass');
  });

  it('[UNIT][POC-003]: Show Status as Fail', () => {
    // Arrange
    const project = ProjectFaker.fail();

    // Act
    const cut = createCUT({
      props: {
        project: project,
      },
    });

    // Assert
    expect(cut.query(byTestId('secOverview'))?.classList).toContain('fail');
  });

  it('[UNIT][POC-004]: Show Status as Skipped', () => {
    // Arrange
    const project = ProjectFaker.skipped();

    // Act
    const cut = createCUT({
      props: {
        project: project,
      },
    });

    // Assert
    expect(cut.query(byTestId('secOverview'))?.classList).toContain('skipped');
  });

  it('[UNIT][POC-005]: Show Pass is Not Relevant', () => {
    // Arrange
    const project = ProjectFaker.notPass();

    // Act
    const cut = createCUT({
      props: {
        project: project,
      },
    });

    // Assert
    expect(cut.query(byTestId('pdgPass'))?.classList).toContain('not-relevant');
  });

  it('[UNIT][POC-006]: Show Fail is Not Relevant', () => {
    // Arrange
    const project = ProjectFaker.notFail();

    // Act
    const cut = createCUT({
      props: {
        project: project,
      },
    });

    // Assert
    expect(cut.query(byTestId('pdgFail'))?.classList).toContain('not-relevant');
  });

  it('[UNIT][POC-006]: Show Fail is Not Relevant', () => {
    // Arrange
    const project = ProjectFaker.notSkipped();

    // Act
    const cut = createCUT({
      props: {
        project: project,
      },
    });

    // Assert
    expect(cut.query(byTestId('pdgSkipped'))?.classList).toContain('not-relevant');
  });

  const getAvatar = (key: string): string => {
    return `${key.charAt(0)}${key.charAt(key.indexOf('_') + 1)}`.toUpperCase();
  };
});
