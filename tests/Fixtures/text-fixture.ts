
import { test as base, type Page } from '@playwright/test';
import { TodoPage } from '../pages/todopages';

type MyFixtures = {
  todoPage: TodoPage;
};

export const test = base.extend<MyFixtures>({
  todoPage: async ({ page }: { page: Page }, use: (todoPage: TodoPage) => Promise<void>) => {
    const todoPage = new TodoPage(page);

    await use(todoPage);
  },
});

export { expect } from '@playwright/test';
