const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();

  const page = await context.newPage();

  await page.goto('https://demoqa.com/');

  await page.getByRole('heading', { name: 'Book Store Application' }).click();
  await page.waitForURL('https://demoqa.com/books');

  await page.getByRole('link', { name: 'Speaking JavaScript' }).click();
  await page.waitForURL('https://demoqa.com/books?book=9781449365035');

  await page.getByRole('button', { name: 'Back To Book Store' }).click();
  await page.waitForURL('https://demoqa.com/books');

  await page.getByText('Elements').click();

  await page.getByRole('link', { name: 'Learning JavaScript Design Patterns' }).click();
  await page.waitForURL('https://demoqa.com/books?book=9781449331818');

  const [page1] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByText('http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/').click()
  ]);

  await page.waitForTimeout(2500); //fix me remove

  await page1.close();

  // ---------------------
  await context.close();
  await browser.close();
})();