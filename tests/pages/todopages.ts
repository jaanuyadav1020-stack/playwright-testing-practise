
import { type Page, type Locator } from '@playwright/test';

export class TodoPage {
  readonly page: Page;
  readonly todoInput: Locator;
  readonly todoItems: Locator;
  readonly firstTodo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.todoInput = page.getByPlaceholder('What needs to be done?');
    this.todoItems = page.locator('.todo-list li');
    this.firstTodo = this.todoItems.first();
  }

  async open() {
    await this.page.goto('https://demo.playwright.dev/todomvc');
  }

  async addTodo(todo: string) {
    await this.todoInput.fill(todo);
    await this.todoInput.press('Enter');
  }

  async toggleTodo() {
    await this.firstTodo.locator('.toggle').check();
  }
}
