import { faker } from '@faker-js/faker';
import { ReportUploadedMessage, Status } from '../messages/report-uploaded-message';

export class ReportUploadedMessageFaker {
  public static random(): ReportUploadedMessage {
    return {
      project: faker.string.sample(),
      version: faker.system.semver(),
      status: faker.helpers.enumValue(Status),
    };
  }
}
