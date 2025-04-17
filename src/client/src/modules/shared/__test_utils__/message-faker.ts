import { faker } from '@faker-js/faker';
import { NotificationDescription } from '../models/notification-description';

export class NotificationDescriptionFaker {
  public static random(): NotificationDescription {
    return {
      icon: faker.string.sample(),
      title: faker.string.sample(),
      message: faker.string.sample(),
      timestamp: faker.date.recent().valueOf(),
    };
  }
}
