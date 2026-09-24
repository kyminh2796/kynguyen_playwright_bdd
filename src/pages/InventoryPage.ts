import { type Page, type Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly inventoryItems: Locator;
  readonly shoppingCartBadge: Locator;
  readonly shoppingCartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('.title');
    this.inventoryItems = page.locator('.inventory_item');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
  }

  async getInventoryCount(): Promise<number> {
    return await this.inventoryItems.count();
  }

  async addItemToCart(itemName: string) {
    const item = this.inventoryItems.filter({ hasText: itemName });
    await item.getByRole('button', { name: 'Add to cart' }).click();
  }

  async removeItemFromCart(itemName: string) {
    const item = this.inventoryItems.filter({ hasText: itemName });
    await item.getByRole('button', { name: 'Remove' }).click();
  }

  async getCartCount(): Promise<number> {
    const isBadgeVisible = await this.shoppingCartBadge.isVisible();
    if (!isBadgeVisible) return 0;
    const text = await this.shoppingCartBadge.textContent();
    return parseInt(text || '0', 10);
  }

  async openCart() {
    await this.shoppingCartLink.click();
  }
}
