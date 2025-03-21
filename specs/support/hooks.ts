import { After, Before } from '@cucumber/cucumber';
import { Browser, chromium, Page } from '@playwright/test';
import { container } from 'tsyringe';
import { TestContext } from './test-context';
import { InjectionTokens } from './injection-tokens';

Before(async () => {
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
});

Before(async () => {
  const page = container.resolve<Page>(InjectionTokens.Page);
  await page.goto('');
});

After(async () => {
  await container.resolve<Browser>(InjectionTokens.Browser).close();
});
