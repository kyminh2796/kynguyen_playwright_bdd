import { test, expect } from '../../src/fixtures/baseTest';

test.describe('Day 01: Getting Started & Smoke Tests', () => {

  test('01. Verify SauceDemo homepage loads successfully', async ({ page }) => {
    await page.goto('/');
    
    // Web-First assertion
    await expect(page).toHaveTitle(/Swag Labs/);
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });

  test('02. Successful login with standard_user using POM Fixture', async ({ loginPage, inventoryPage, page }) => {
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    // Verify redirected to inventory page
    await expect(page).toHaveURL(/.*inventory.html/);
    await expect(inventoryPage.pageTitle).toHaveText('Products');

    // Verify product catalog rendered
    const count = await inventoryPage.getInventoryCount();
    expect(count).toBeGreaterThan(0);
  });

  test('03. Failed login with locked_out_user shows error message', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');

    // Web-First assertion on error message
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Sorry, this user has been locked out.');
  });

  test('04. Add product to cart updates badge count', async ({ loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    // Add first item
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    expect(await inventoryPage.getCartCount()).toBe(1);

    // Add second item
    await inventoryPage.addItemToCart('Sauce Labs Bike Light');
    expect(await inventoryPage.getCartCount()).toBe(2);

    // Remove first item
    await inventoryPage.removeItemFromCart('Sauce Labs Backpack');
    expect(await inventoryPage.getCartCount()).toBe(1);
  });
});
