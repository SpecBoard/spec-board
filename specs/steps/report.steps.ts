import { Given, When } from '@cucumber/cucumber';
import { container } from 'tsyringe';
import { SpecStoreDriver } from '../drivers/spec-store.driver';

Given('{string} project has report', async (project: string) => {
  const driver = container.resolve(SpecStoreDriver);
  await driver.uploadReportAsync(project);
});

When('Uploading report for {string} project', async (project: string) => {
  const driver = container.resolve(SpecStoreDriver);
  await driver.uploadReportAsync(project);
});
