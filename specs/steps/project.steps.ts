import { Then } from '@cucumber/cucumber';
import { container } from 'tsyringe';
import { ProjectsPageObject } from '../page-objects/projects.page-object';
import { expect } from '@playwright/test';

Then('{string} project should be created', async (project: string) => {
  const pageObject = container.resolve(ProjectsPageObject);
  await pageObject.refreshAsync();

  expect(await pageObject.Projects).toContain(project);
});

Then(
  '{string} project should not be created again',
  async (project: string) => {
    const pageObject = container.resolve(ProjectsPageObject);
    await pageObject.refreshAsync();

    expect(await pageObject.Projects).toContain(project);
    expect(
      (await pageObject.Projects).filter((p) => p === project)
    ).toHaveLength(1);
  }
);
