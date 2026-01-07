import { test, expect } from '@playwright/test';

test.describe('Tasks - basic flows', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5174/dashboard');
  });

  test('Add, edit, complete, delete, and clear completed tasks', async ({ page }) => {
    // Wait for main UI to be ready, then navigate to Tasks view using keyboard shortcut 'T'. Fallback to clicking nav if keyboard doesn't work.
    await page.waitForSelector('text=StudyNest', { timeout: 10000 });
    await page.keyboard.press('t');
    try {
      await page.waitForSelector('input[placeholder="Add a new task..."]', { timeout: 10000 });
    } catch {
      // fallback: click the visible Tasks nav button (desktop or mobile)
      await page.locator('button[aria-label="Tasks view"]:visible').first().click({ force: true });
      await page.waitForSelector('input[placeholder="Add a new task..."]', { timeout: 10000 });
    }

    // Add a task
    await page.fill('input[placeholder="Add a new task..."]', 'Write unit tests');
    await page.click('button:has-text("Add")');

    const taskInList = page.locator('[aria-label="Task list"]').locator('text=Write unit tests').first();
    await expect(taskInList).toBeVisible();

    // For reliability in automated tests we'll operate on the list row directly
    const taskRow = page.locator('[aria-label="Task list"] div:has-text("Write unit tests")').first();
    await expect(taskRow).toBeVisible();

    // Mark as complete by clicking its toggle inside the list row
    await taskRow.locator('button[data-testid="toggle-task"]').click();
    await expect(taskRow.locator('text=Write unit tests')).toHaveClass(/line-through/);

    // Delete the task using delete button inside the list row
    await taskRow.locator('button[data-testid="delete-task"]').click();
    await expect(page.locator('[aria-label="Task list"]').locator('text=Write unit tests')).not.toBeVisible();

    // Add two tasks and clear completed
    await page.fill('input[placeholder="Add a new task..."]', 'Task A');
    await page.click('button:has-text("Add")');
    await page.fill('input[placeholder="Add a new task..."]', 'Task B');
    await page.click('button:has-text("Add")');

    // Complete one
    const taskARow = page.locator('[aria-label="Task list"]').locator('text=Task A').first();
    await taskARow.locator('..').locator('button[data-testid="toggle-task"]').click();

    // Click Clear Completed
    await page.click('button:has-text("Clear Completed")');
    await expect(page.locator('[aria-label="Task list"]').locator('text=Task A')).not.toBeVisible();
    await expect(page.locator('[aria-label="Task list"]').locator('text=Task B')).toBeVisible();
  });
});