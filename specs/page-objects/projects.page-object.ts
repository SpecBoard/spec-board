import { Page } from '@playwright/test';
import { inject, injectable } from 'tsyringe';
import { InjectionTokens } from '../support/injection-tokens';

@injectable()
export class ProjectsPageObject {
  public get Projects(): Promise<string[]> {
    return this.page.getByTestId('spnProject').allTextContents();
  }

  constructor(@inject(InjectionTokens.Page) private readonly page: Page) {}

  public async refreshAsync(): Promise<void> {
    await this.page.reload();
  }

  public async versionOf(project: string) {
    const overviews = await this.page.getByTestId('secOverview').all();
    for (const overview of overviews) {
      const title = await overview.getByTestId('spnProject').textContent();
      if (title === project)
        return await overview.getByTestId('spnVersion').textContent();
    }
  }
}
