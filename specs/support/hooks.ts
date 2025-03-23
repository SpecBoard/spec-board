import { After, Before } from '@cucumber/cucumber';
import { Browser, chromium } from '@playwright/test';
import { container } from 'tsyringe';
import { TestContext } from './test-context';
import { InjectionTokens } from './injection-tokens';
import { SpecStoreDriver } from '../drivers/spec-store.driver';

Before('@specboard', async () => {
  const testContext = container.resolve(TestContext);

  const browser = await chromium.launch();
  const context = await browser.newContext({
    baseURL: 'http://localhost:4200/',
    extraHTTPHeaders: { 'run-id': testContext.runId },
  });
  const page = await context.newPage();

  container.registerInstance(InjectionTokens.Browser, browser);
  container.registerInstance(InjectionTokens.Context, context);
  container.registerInstance(InjectionTokens.Page, page);

  await page.goto('');
});

Before('@specstore', async () => {
  await container.resolve(SpecStoreDriver).healthCheckAsync();
});

After('@specboard', async () => {
  await container.resolve<Browser>(InjectionTokens.Browser).close();
});
