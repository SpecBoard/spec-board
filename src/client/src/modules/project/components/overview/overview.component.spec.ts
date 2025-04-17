import { byTestId, createComponentFactory } from '@ngneat/spectator/jest';
import { OverviewComponent } from './overview.component';
import { ProjectOverviewFaker } from '../../__test_utils__/project-overview-faker';
import { NavigatorService } from '../../../shared/services/navigator.service';

describe('OverviewComponent', () => {
  const createCUT = createComponentFactory({
    component: OverviewComponent,
    mocks: [NavigatorService],
    detectChanges: true,
  });

  it('[UNIT][POC-001]: Calculate Avatar', () => {
    // Arrange
    const project = ProjectOverviewFaker.random();

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
    const project = ProjectOverviewFaker.pass();

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
    const project = ProjectOverviewFaker.fail();

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
    const project = ProjectOverviewFaker.skipped();

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
    const project = ProjectOverviewFaker.notPass();

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
    const project = ProjectOverviewFaker.notFail();

    // Act
    const cut = createCUT({
      props: {
        project: project,
      },
    });

    // Assert
    expect(cut.query(byTestId('pdgFail'))?.classList).toContain('not-relevant');
  });

  it('[UNIT][POC-007]: Show Fail is Not Relevant', () => {
    // Arrange
    const project = ProjectOverviewFaker.notSkipped();

    // Act
    const cut = createCUT({
      props: {
        project: project,
      },
    });

    // Assert
    expect(cut.query(byTestId('pdgSkipped'))?.classList).toContain('not-relevant');
  });

  it('[UNIT][POC-008]: Open Project Summary', () => {
    // Arrange
    const project = ProjectOverviewFaker.random();
    const cut = createCUT({
      props: {
        project: project,
      },
    });

    const spy = jest.spyOn(cut.inject(NavigatorService), 'toProjectSummary');

    // Act
    cut.click(byTestId('divOpen'));

    // Assert
    expect(spy).toHaveBeenCalledWith(project.key);
  });

  const getAvatar = (key: string): string => {
    return `${key.charAt(0)}${key.charAt(key.indexOf('_') + 1)}`.toUpperCase();
  };

  it('[UNIT][POC-009]: Show Name', () => {
    // Arrange
    const project = ProjectOverviewFaker.random();

    // Act
    const cut = createCUT({
      props: {
        project: project,
      },
    });

    // Assert
    expect(cut.query(byTestId('spnProject'))?.textContent).toEqual(project.name);
  });

  it('[UNIT][POC-010]: Show Key if Name is Undefined', () => {
    // Arrange
    const project = ProjectOverviewFaker.name(undefined);

    // Act
    const cut = createCUT({
      props: {
        project: project,
      },
    });

    // Assert
    expect(cut.query(byTestId('spnProject'))?.textContent).toEqual(project.key);
  });

  it('[UNIT][POC-011]: Show Key if Name is Empty', () => {
    // Arrange
    const project = ProjectOverviewFaker.name('');

    // Act
    const cut = createCUT({
      props: {
        project: project,
      },
    });

    // Assert
    expect(cut.query(byTestId('spnProject'))?.textContent).toEqual(project.key);
  });
});
