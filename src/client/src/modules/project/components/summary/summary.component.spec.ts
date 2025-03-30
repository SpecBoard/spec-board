import { byTestId, createComponentFactory } from '@ngneat/spectator/jest';
import { SummaryComponent } from './summary.component';
import { ProjectSummaryFaker } from '../../__test_utils__/project-summary-faker';

describe('SummaryComponent', () => {
  const createCUT = createComponentFactory({
    component: SummaryComponent,
    detectChanges: false,
  });

  it('[UNIT][SMY-001]: Show as Pass', () => {
    // Arrange
    const summary = ProjectSummaryFaker.pass();
    const cut = createCUT({
      props: {
        summary: summary,
      },
    });

    // Act
    cut.detectChanges();

    // Assert
    expect(cut.query(byTestId('stsPass'))).not.toBeNull();
    expect(cut.query(byTestId('spnStatus'))?.textContent).toEqual('Passed');
    expect(cut.query(byTestId('spnStatusDescription'))?.textContent).toEqual(`All of the ${summary.fail + summary.pass + summary.skipped} scenario(s) were passed`);
    expect(cut.query(byTestId('divFailedScenarios'))).toBeNull();
  });

  it('[UNIT][SMY-002]: Show as Failed', () => {
    // Arrange
    const summary = ProjectSummaryFaker.fail();
    const cut = createCUT({
      props: {
        summary: summary,
      },
    });

    // Act
    cut.detectChanges();

    // Assert
    expect(cut.query(byTestId('stsFail'))).not.toBeNull();
    expect(cut.query(byTestId('spnStatus'))?.textContent).toEqual('Failed');
    expect(cut.query(byTestId('spnStatusDescription'))?.textContent).toEqual(`${summary.fail} scenario(s) were failed out of ${summary.fail + summary.pass + summary.skipped} scenario(s)`);
    expect(cut.queryAll(byTestId('spnFailedScenario')).map((e) => e.textContent)).toEqual(summary.failedScenarios.map((fs) => fs.segments.join(' > ')));
  });

  it('[UNIT][SMY-003]: Show as Skipped', () => {
    // Arrange
    const summary = ProjectSummaryFaker.skipped();
    const cut = createCUT({
      props: {
        summary: summary,
      },
    });

    // Act
    cut.detectChanges();

    // Assert
    expect(cut.query(byTestId('stsSkipped'))).not.toBeNull();
    expect(cut.query(byTestId('spnStatus'))?.textContent).toEqual('Passed');
    expect(cut.query(byTestId('spnStatusDescription'))?.textContent).toEqual(`All of the ${summary.fail + summary.pass + summary.skipped} scenario(s) were passed (${summary.skipped} did not run)`);
    expect(cut.query(byTestId('divFailedScenarios'))).toBeNull();
  });
});
