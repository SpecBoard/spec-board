import { Given, When } from '@cucumber/cucumber';
import { container } from 'tsyringe';
import { SpecStoreDriver } from '../drivers/spec-store.driver';

Given('{string} project has report with version {string}', async (project: string, version: string) => {
  const driver = container.resolve(SpecStoreDriver);
  await driver.uploadReportAsync(project, version);
});

When('Uploading report for {string} project with version {string}', async (project: string, version: string) => {
  const driver = container.resolve(SpecStoreDriver);
  await driver.uploadReportAsync(project, version);
});
