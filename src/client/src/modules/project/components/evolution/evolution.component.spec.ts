import { byTestId, createComponentFactory } from '@ngneat/spectator/jest';
import { EvolutionComponent } from './evolution.component';
import { ProjectEvolutionFaker } from '../../__test_utils__/project-evolution-faker';
import { faker } from '@faker-js/faker';

describe('EvolutionComponent', () => {
  const createCUT = createComponentFactory({
    component: EvolutionComponent,
    detectChanges: false,
  });

  it('[UNIT][EVC-001]: Show Evolution Entries', () => {
    // Arrange
    const evolution = faker.helpers.multiple(() => ProjectEvolutionFaker.random(), { count: { min: 1, max: 5 } });
    const cut = createCUT({
      props: {
        evolution: evolution,
      },
    });

    // Act
    cut.detectChanges();

    // Assert
    expect(cut.queryAll(byTestId('divEntry'))).toHaveLength(evolution.length);
  });

  it('[UNIT][EVC-002]: Display Version', () => {
    // Arrange
    const evolution = ProjectEvolutionFaker.random();
    const cut = createCUT({
      props: {
        evolution: [evolution],
      },
    });

    // Act
    cut.detectChanges();

    // Assert
    expect(cut.query(byTestId('spnVersion'))?.textContent).toEqual(evolution.version);
  });

  it('[UNIT][EVC-003]: Display Sum of Test Cases', () => {
    // Arrange
    const evolution = ProjectEvolutionFaker.random();
    const cut = createCUT({
      props: {
        evolution: [evolution],
      },
    });

    // Act
    cut.detectChanges();

    // Assert
    expect(cut.query(byTestId('spnSum'))?.textContent).toEqual((evolution.pass + evolution.fail + evolution.skipped).toString());
  });
});
