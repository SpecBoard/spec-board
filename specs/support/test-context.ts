import { randomUUID } from 'crypto';
import { singleton } from 'tsyringe';

@singleton()
export class TestContext {
  public readonly runId = randomUUID();
}
