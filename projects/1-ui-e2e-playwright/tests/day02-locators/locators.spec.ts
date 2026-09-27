import { test, expect } from '@playwright/test';

test.describe('Day 02: Locator Mastery & Bẫy Selector Thực Tế', () => {

  /**
   * BÀI TẬP 1: Bẫy Dynamic ID (ID ngẫu nhiên)
   * URL: http://uitestingplayground.com/dynamicid
   * Bẫy thực tế: Các framework hiện đại (React, Vue, ASP.NET) thường sinh ID dạng: id="btn-8b43f9a" ngẫu nhiên mỗi lần reload.
   * Sai lầm: page.click('#btn-8b43f9a') -> Lần chạy sau sẽ FAIL ngay.
   * Giải pháp: Dùng getByRole với text nhìn thấy bởi user.
   */
  test('01. Xử lý Dynamic ID bằng getByRole thay vì CSS ID', async ({ page }) => {
    await page.goto('http://uitestingplayground.com/dynamicid');

    // ❌ CÁCH DỄ GÃY: await page.locator('#id-ngau-nhien').click();
    // ✅ CHUẨN USER-FACING: Định vị nút theo đúng chữ người dùng nhìn thấy
    const dynamicButton = page.getByRole('button', { name: 'Button with Dynamic ID' });
    
    await expect(dynamicButton).toBeVisible();
    await dynamicButton.click();
  });

  /**
   * BÀI TẬP 2: Bẫy Class Attribute phức tạp
   * URL: http://uitestingplayground.com/classattr
   * Bẫy thực tế: Nút có nhiều class như class="btn btn-primary btn-test".
   * Sai lầm trong XPath: //button[@class='btn-primary'] -> Sẽ fail vì thiếu các class khác.
   * Giải pháp: Tìm theo text hoặc getByRole.
   */
  test('02. Xử lý phần tử có nhiều Class phức tạp', async ({ page }) => {
    await page.goto('http://uitestingplayground.com/classattr');

    // Lắng nghe sự kiện alert trước khi click nút
    let alertMessage = '';
    page.once('dialog', async (dialog) => {
      alertMessage = dialog.message();
      await dialog.accept();
    });

    // Nút màu xanh chính (primary button)
    const blueButton = page.locator('button.btn-primary');
    await blueButton.click();

    expect(alertMessage).toContain('Primary button pressed');
  });

  /**
   * BÀI TẬP 3: Bẫy Hidden Layers & Overlapped Element (Phần tử bị che)
   * URL: http://uitestingplayground.com/hiddenlayers
   * Bẫy thực tế: Sau khi click nút xanh, một layer vô hình xuất hiện đè lên nút đó.
   * Nếu cố tình click lần 2 bằng Selenium hoặc cờ { force: true }, bạn sẽ không bắt được bug này.
   * Playwright Auto-wait sẽ phát hiện nút bị che và ngăn click sai.
   */
  test('03. Nhận diện phần tử bị che khuất (Hidden Layers)', async ({ page }) => {
    await page.goto('http://uitestingplayground.com/hiddenlayers');

    const greenButton = page.locator('#greenButton');

    // Lần 1: Nút xanh chưa bị che, click thành công
    await greenButton.click();

    // Lần 2: Một nút xanh thứ 2 xuất hiện trong DOM đè lên
    // Nếu bạn click greenButton cũ với timeout ngắn, Playwright sẽ báo lỗi element bị che
    const blueOverlay = page.locator('#blueButton');
    await expect(blueOverlay).toBeVisible();
  });

  /**
   * BÀI TẬP 4: Kỹ thuật Chaining & Filtering Locator trong Danh sách
   * URL: https://www.saucedemo.com/
   * Bẫy thực tế: Nhiều sản phẩm trên trang đều có nút "Add to cart".
   * Nếu viết: page.getByRole('button', { name: 'Add to cart' }) -> Gặp lỗi Strict Mode Violation (tìm thấy 6 nút!).
   * Giải pháp: Thu hẹp phạm vi bằng .filter({ hasText: ... }) trước khi click.
   */
  test('04. Tránh lỗi Strict Mode bằng Locator Chaining & Filter', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    // Đăng nhập nhanh
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    // Tìm đúng thẻ sản phẩm chứa tên "Sauce Labs Fleece Jacket"
    const targetProductCard = page.locator('.inventory_item').filter({
      hasText: 'Sauce Labs Fleece Jacket'
    });

    // Từ thẻ sản phẩm đó, tìm giá tiền và nút Add to cart bên trong
    const priceLocator = targetProductCard.locator('.inventory_item_price');
    await expect(priceLocator).toHaveText('$49.99');

    // Click nút Add to cart của đúng sản phẩm này (Không sợ trùng với 5 sản phẩm khác)
    await targetProductCard.getByRole('button', { name: 'Add to cart' }).click();

    // Assert nút chuyển thành "Remove"
    await expect(targetProductCard.getByRole('button', { name: 'Remove' })).toBeVisible();
  });

  /**
   * BÀI TẬP 5: Lọc phần tử theo phần tử con (has locator)
   * Kỹ thuật: Tìm cha có chứa con cụ thể
   */
  test('05. Lọc thẻ cha dựa trên phần tử con cụ thể', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    // Tìm thẻ sản phẩm có chứa ảnh chứa link 'bolt-shirt'
    const shirtItem = page.locator('.inventory_item').filter({
      has: page.locator('img[alt="Sauce Labs Bolt T-Shirt"]')
    });

    await expect(shirtItem).toBeVisible();
    await expect(shirtItem.locator('.inventory_item_name')).toHaveText('Sauce Labs Bolt T-Shirt');
  });

});
