# 🚀 14-Day Playwright Automation Challenge (Zero to Hero)

Chào mừng bạn đến với Thử thách 14 ngày làm chủ Playwright Automation với TypeScript theo chuẩn dự án thực tế!

---

## 📌 Thông tin dự án & Sao lưu (Backup)
* **Nhánh chính (`main`)**: Dự án Playwright TypeScript chuẩn hiện đại.
* **Nhánh sao lưu (`backup/legacy-cucumber-bdd`)**: Toàn bộ mã nguồn Cucumber BDD cũ đã được lưu trữ an toàn tại nhánh này. Nếu cần xem lại:
  ```bash
  git checkout backup/legacy-cucumber-bdd
  ```

---

## 📅 Tiến độ Thử thách 14 Ngày (Daily Tracker)

| Ngày | Chủ đề | Mục tiêu chính | Trạng thái |
| :---: | :--- | :--- | :---: |
| **01** | **Setup & Smoke Tests** | Cấu hình TS, Playwright config, UI Mode, POM & Fixtures căn bản | ✅ Hoàn thành |
| **02** | **Locator Mastery** | `getByRole`, `getByLabel`, filter locators, tránh bẫy Strict mode | ⬜ Chưa làm |
| **03** | **Auto-waiting & Assertions** | Web-First Assertions, xử lý AJAX delay, dẹp bỏ `waitForTimeout` | ⬜ Chưa làm |
| **04** | **Page Object Model (POM)** | Thiết kế POM chuẩn TypeScript, phân tách Action vs Assertion | ⬜ Chưa làm |
| **05** | **Form, Tables, Upload/Download** | Dropdown, Checkbox, Slider, Dynamic Tables, File I/O | ⬜ Chưa làm |
| **06** | **iFrames, Popups & Dialogs** | Nested frames, multi-tabs, custom alert/prompt listener | ⬜ Chưa làm |
| **07** | **Mini Project Tuần 1** | E2E complete checkout flow trên SauceDemo (Multi-browsers) | ⬜ Chưa làm |
| **08** | **Auth with `storageState`** | Bypass login UI, lưu session cookies/localStorage vào JSON | ⬜ Chưa làm |
| **09** | **Network Interception & Mock** | `page.route()`, Mock API response, giả lập lỗi 500, chặn ads | ⬜ Chưa làm |
| **10** | **Custom Fixtures (`test.extend`)** | Dependency Injection, tự động hóa setup/teardown môi trường | ⬜ Chưa làm |
| **11** | **Parallelism & Environment** | Tối ưu hóa số luồng (workers), multi-env (`dotenv`), tránh race condition | ⬜ Chưa làm |
| **12** | **Trace Viewer & Debugging** | Bắt lỗi trên CI qua Trace zip, snapshot DOM, network timeline | ⬜ Chưa làm |
| **13** | **CI/CD GitHub Actions** | Tự động test khi push/PR, ma trận trình duyệt, upload report | ⬜ Chưa làm |
| **14** | **Capstone Project & Benchmark** | Rà soát tiêu chuẩn Production, benchmark tốc độ bộ test | ⬜ Chưa làm |

---

## 🌐 Các trang web thực hành chính

1. [SauceDemo](https://www.saucedemo.com/): E-commerce demo chuẩn (`standard_user`, `locked_out_user`, `problem_user`).
2. [UI Test Automation Playground](http://uitestingplayground.com/): Luyện xử lý bẫy: Dynamic ID, AJAX Delay, Overlapped elements.
3. [The Internet (Herokuapp)](https://the-internet.herokuapp.com/): Luyện iFrames, Shadow DOM, File Upload, Alerts.
4. [Conduit RealWorld App](https://demo.realworld.io/): Luyện Auth State, Network Mocking.

---

## 🛠️ Lệnh thường dùng (Cheat Sheet)

```bash
# 1. Cài đặt dependencies (chỉ chạy lần đầu)
npm install

# 2. Cài đặt trình duyệt Playwright
npx playwright install chromium

# 3. Chạy toàn bộ tests (Headless mode)
npm test

# 4. Chạy ở chế độ giao diện trực quan (UI Mode - Cực kỳ khuyên dùng khi dev)
npm run test:ui

# 5. Chạy có mở trình duyệt (Headed mode)
npm run test:headed

# 6. Chạy riêng bài test của Ngày 01
npm run test:day01

# 7. Xem báo cáo HTML sau khi test
npm run report

# 8. Trình quay thao tác tự sinh code
npm run codegen

# 9. Kiểm tra lỗi kiểu dữ liệu TypeScript
npm run typecheck
```

---

## 📂 Cấu trúc thư mục chuẩn

```text
.
├── .github/workflows/playwright.yml   # Pipeline CI/CD tự động
├── src/
│   ├── pages/                         # Page Object Models
│   │   ├── LoginPage.ts
│   │   └── InventoryPage.ts
│   ├── fixtures/                      # Playwright Custom Fixtures
│   │   └── baseTest.ts
│   └── utils/                         # Helper functions
├── tests/                             # Thư mục chứa bài tập 14 ngày
│   └── day01-getting-started/
│       └── smoke.spec.ts              # Test cases ngày 1
├── playwright.config.ts               # Cấu hình Playwright tối ưu
├── tsconfig.json                      # Cấu hình TypeScript Strict Mode
└── package.json                       # Scripts và dependencies
```
