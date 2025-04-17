import { byTestId, createComponentFactory } from '@ngneat/spectator/jest';
import { MessageComponent } from './message.component';
import { of } from 'rxjs';
import { NotificationDescriptionFaker } from '../../__test_utils__/message-faker';

describe('MessageComponent', () => {
  const createSUT = createComponentFactory({
    component: MessageComponent,
    detectChanges: false,
  });

  it('[UNIT][MSC-001]: Close Message', (done) => {
    // Arrange
    const sut = createSUT();

    sut.setInput('message', NotificationDescriptionFaker.random());

    // Assert
    // Act
    sut.component.closed.subscribe(() => done());
    sut.click(byTestId('btnClose'));
  });
});
