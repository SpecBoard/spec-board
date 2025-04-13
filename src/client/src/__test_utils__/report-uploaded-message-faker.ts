import { faker } from '@faker-js/faker';
import { ReportUploadedMessage } from '../messages/report-uploaded-message';

export class ReportUploadedMessageFaker {
  public static random(): ReportUploadedMessage {
    return {
      project: faker.string.sample(),
      version: faker.system.semver(),
    };
  }
}
