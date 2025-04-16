import { byTestId, createComponentFactory } from "@ngneat/spectator/jest";
import { MessageComponent } from "./message.component";
import { MessageStore } from "../../stores/message-store.service";

describe('MessageComponent', () => {
  const createSUT = createComponentFactory({
    component: MessageComponent,
    mocks: [MessageStore]
  })

  it('[UNIT][MSC-001]: Close Message', (done) => {
    // Arrange
    const sut = createSUT();

    // Assert
    // Act   
    sut.component.closed.subscribe(() => done());
    sut.click(byTestId('btnClose'));
  })
});
