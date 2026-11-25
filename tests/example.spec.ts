
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('./');

  await page.waitForLoadState('domcontentloaded');

  await expect(
    page.getByPlaceholder('What needs to be done?')
  ).toBeVisible();
});
// TC01 - Verify application loads
test('TC01: Verify TodoMVC application loads', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/');

  await expect(page.getByPlaceholder('What needs to be done?'))
    .toBeVisible();
});
// TC02 - Add a new todo
test('TC02: Add a new todo item', async ({ page }) => {
  const input = page.getByPlaceholder('What needs to be done?');

  await input.fill('Learn Playwright');
  await input.press('Enter');

  await expect(page.locator('.todo-list li'))
    .toHaveText(['Learn Playwright']);
});

// TC03 - Add multiple todos
test('TC03: Add multiple todo items', async ({ page }) => {
  const input = page.getByPlaceholder('What needs to be done?');

  await input.fill('Learn TypeScript');
  await input.press('Enter');

  await input.fill('Learn Automation');
  await input.press('Enter');

  await expect(page.locator('.todo-list li'))
    .toHaveCount(2);
});

// TC04 - Mark todo as completed
test('TC04: Complete a todo item', async ({ page }) => {
  const input = page.getByPlaceholder('What needs to be done?');

  await input.fill('Complete testing');
  await input.press('Enter');

  await page.locator('.todo-list li .toggle').check();

  await expect(page.locator('.todo-list li'))
    .toHaveClass(/completed/);
});

// TC05 - Edit an existing todo
test('TC05: Edit a todo item', async ({ page }) => {
  const input = page.getByPlaceholder('What needs to be done?');

  await input.fill('Old Task');
  await input.press('Enter');

  const todo = page.locator('.todo-list li');
  await todo.locator('label').dblclick();

  const editInput = todo.locator('input.edit');
  await editInput.fill('Updated Task');
  await editInput.press('Enter');

  await expect(todo).toHaveText('Updated Task');
});

// TC06 - Delete a todo
test('TC06: Delete a todo item', async ({ page }) => {
  const input = page.getByPlaceholder('What needs to be done?');

  await input.fill('Delete this task');
  await input.press('Enter');

  const todo = page.locator('.todo-list li');
  await todo.hover();
  await todo.locator('.destroy').click();

  await expect(page.locator('.todo-list li'))
    .toHaveCount(0);
});

// TC07 - Clear completed todos
test('TC07: Clear completed todo items', async ({ page }) => {
  const input = page.getByPlaceholder('What needs to be done?');

  await input.fill('Completed task');
  await input.press('Enter');

  await input.fill('Active task');
  await input.press('Enter');

  await page.locator('.todo-list li .toggle').first().check();

  await page.getByRole('button', { name: 'Clear completed' }).click();

  await expect(page.locator('.todo-list li'))
    .toHaveCount(1);

  await expect(page.locator('.todo-list li'))
    .toHaveText(['Active task']);
});

// TC08 - Negative: Empty todo
test('TC08: Do not add an empty todo', async ({ page }) => {
  const input = page.getByPlaceholder('What needs to be done?');

  await input.fill('');
  await input.press('Enter');

  await expect(page.locator('.todo-list li'))
    .toHaveCount(0);
});

// TC09 - Negative: Whitespace-only todo
test('TC09: Do not add a whitespace-only todo', async ({ page }) => {
  const input = page.getByPlaceholder('What needs to be done?');

  await input.fill('   ');
  await input.press('Enter');

  await expect(page.locator('.todo-list li'))
    .toHaveCount(0);
});

// TC10 - Negative: Completed filter should not show active tasks
test('TC10: Completed filter hides active todos', async ({ page }) => {
  const input = page.getByPlaceholder('What needs to be done?');

  await input.fill('Active task');
  await input.press('Enter');

  await page.getByRole('link', { name: 'Completed' }).click();

  await expect(page.locator('.todo-list li'))
    .toHaveCount(0);
});

