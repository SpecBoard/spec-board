import { Page } from '@playwright/test';
import { injectable } from 'tsyringe';

@injectable()
export class ProjectsPageObject {
  public get Projects(): Promise<string[]> {
    return this.page.getByTestId('snpProject').allTextContents();
  }

  constructor(private readonly page: Page) {}
}
