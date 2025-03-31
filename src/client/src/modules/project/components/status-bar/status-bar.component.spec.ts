import { StatusBarComponent } from './status-bar.component';
import { byTestId, createComponentFactory } from '@ngneat/spectator/jest';
import { StatusBarPropsFaker } from '../../__test_utils__/status-bar-props-faker';

describe('StatusBarComponent', () => {
  const createCUT = createComponentFactory({
    component: StatusBarComponent,
    detectChanges: false,
  });

  it('[UNIT][STB-001]: Show Values', () => {
    // Arrange
    const props = StatusBarPropsFaker.showValue();
    const cut = createCUT({
      props: props,
    });

    // Act
    cut.detectChanges();

    // Assert
    expect(cut.query(byTestId('spnPass'))?.textContent).toEqual(props.pass.toString());
    expect(cut.query(byTestId('spnFail'))?.textContent).toEqual(props.fail.toString());
    expect(cut.query(byTestId('spnSkipped'))?.textContent).toEqual(props.skipped.toString());
  });

  it('[UNIT][STB-002]: Hide Values', () => {
    // Arrange
    const cut = createCUT({
      props: StatusBarPropsFaker.hideValue(),
    });

    // Act
    cut.detectChanges();

    // Assert
    expect(cut.query(byTestId('spnPass'))).toBeNull();
    expect(cut.query(byTestId('spnFail'))).toBeNull();
    expect(cut.query(byTestId('spnSkipped'))).toBeNull();
  });

  it('[UNIT][STB-003]: Hide Pass Value if 0', () => {
    // Arrange
    const cut = createCUT({
      props: StatusBarPropsFaker.pass(0),
    });

    // Act
    cut.detectChanges();

    // Assert
    expect(cut.query(byTestId('spnPass'))).toBeNull();
    expect(cut.query(byTestId('spnFail'))).not.toBeNull();
    expect(cut.query(byTestId('spnSkipped'))).not.toBeNull();
  });

  it('[UNIT][STB-004]: Hide Fail Value if 0', () => {
    // Arrange
    const cut = createCUT({
      props: StatusBarPropsFaker.fail(0),
    });

    // Act
    cut.detectChanges();

    // Assert
    expect(cut.query(byTestId('spnPass'))).not.toBeNull();
    expect(cut.query(byTestId('spnFail'))).toBeNull();
    expect(cut.query(byTestId('spnSkipped'))).not.toBeNull();
  });

  it('[UNIT][STB-004]: Hide Skipped Value if 0', () => {
    // Arrange
    const cut = createCUT({
      props: StatusBarPropsFaker.skipped(0),
    });

    // Act
    cut.detectChanges();

    // Assert
    expect(cut.query(byTestId('spnPass'))).not.toBeNull();
    expect(cut.query(byTestId('spnFail'))).not.toBeNull();
    expect(cut.query(byTestId('spnSkipped'))).toBeNull();
  });
});
