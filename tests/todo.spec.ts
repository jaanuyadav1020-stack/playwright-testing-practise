
import { test, expect } from './Fixtures/text-fixture';

test.describe('TodoMVC Tests', () => {

  test.beforeEach(async ({ todoPage }) => {
    await todoPage.open();
  });

  test('TC01 - Add a todo', async ({ todoPage }) => {
    await todoPage.addTodo('Learn Playwright');

    await expect(todoPage.todoItems)
      .toHaveText(['Learn Playwright']);
  });

  test('TC02 - Add multiple todos', async ({ todoPage }) => {
    await todoPage.addTodo('Learn TypeScript');
    await todoPage.addTodo('Learn Fixtures');

    await expect(todoPage.todoItems)
      .toHaveCount(2);
  });

  test('TC03 - Toggle a todo', async ({ todoPage }) => {
    await todoPage.addTodo('Complete assignment');

    await todoPage.toggleTodo();

    await expect(todoPage.firstTodo)
      .toHaveClass(/completed/);
  });

});
