import { Then } from '@cucumber/cucumber';
import { container } from 'tsyringe';
import { ProjectsPageObject } from '../page-objects/projects.page-object';
import { expect } from '@playwright/test';

Then('{string} project should exists with version {string}', async (project: string, version: string) => {
  const pageObject = container.resolve(ProjectsPageObject);
  await pageObject.refreshAsync();

  expect(await pageObject.Projects).toContain(project);
  expect(await pageObject.versionOf(project)).toEqual(version);
});
