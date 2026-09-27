# Lộ Trình Kỹ Sư Kiểm Thử Toàn Diện (Fullstack QA / SDET Masterclass)

Tài liệu này là bản đồ định hướng từ số 0 đến cấp độ **Fullstack QA Engineer (SDET)**, lấy dự án **OrangeHRM** làm trọng tâm. Một Fullstack QA không chỉ biết viết kịch bản UI, mà còn "bao thầu" Database, API, Performance, Bảo mật và Hệ thống CI/CD.

## 🏗 KIẾN TRÚC MONOREPO (THỰC TẾ DOANH NGHIỆP)
Để tránh "ôm đồm" và biến dự án thành một mớ hỗn độn (nồi lẩu thập cẩm), repository này được thiết kế theo chuẩn **Modular Monorepo**. 

Mỗi mảng test được cô lập hoàn toàn vào một thư mục con trong `projects/`, với thư viện (`package.json`) và cấu hình chạy độc lập. Nhà tuyển dụng nhìn vào sẽ thấy ngay năng lực thiết kế hệ thống (Architecture) của bạn.

Cấu trúc hiện tại và tương lai:
```text
kynguyen_playwright_bdd/
├── projects/
│   ├── 1-ui-e2e-playwright/    <-- (Bạn đang ở đây) Playwright POM & API Hybrid
│   ├── 2-ui-e2e-cypress/       <-- Dành cho Cypress & App Actions
│   ├── 3-backend-api-tests/    <-- Dành cho Database & Zod Schema Validation
│   └── 4-performance-k6/       <-- Dành cho K6 Load Testing
└── .github/workflows/          <-- CI/CD Pipelines tách biệt
```

---

## CHƯƠNG 1: XÂY DỰNG NỀN MÓNG (Playwright, COM & TDD)
**Thư mục làm việc:** `projects/1-ui-e2e-playwright/`
**Mục tiêu:** Thoát khỏi tư duy "record & playback". Áp dụng Component Object Model (COM) thay cho POM truyền thống để code không bao giờ trở thành "God Object".

### 1.1. Lý thuyết cần nắm
- **Component Object Model (COM):** Cách chia nhỏ một trang web thành các thành phần (Header, Sidebar, Table).
- **Playwright Custom Fixtures:** Cách tiêm (inject) các Page/Component vào test mà không cần khởi tạo thủ công `new LoginPage(page)`.
- **TDD (Test-Driven Development) cơ bản:** Tư duy viết khung (skeleton) của test trước, mock API chạy cho pass, rồi mới viết locator.

### 1.2. Bài tập thực hành (Hands-on)
1. Trong `projects/1-ui-e2e-playwright/`, tạo thư mục `src/components/`, `src/pages/`, `src/fixtures/`.
2. Viết `SidebarComponent.ts` và `TopNavbarComponent.ts` chứa các locators dùng chung.
3. Viết `DashboardPage.ts` (Import và khởi tạo `SidebarComponent` và `TopNavbarComponent` bên trong nó).
4. Viết `login.spec.ts`: Đăng nhập, verify Dashboard hiển thị, dùng NavbarComponent để logout thông qua Fixture.

---

## CHƯƠNG 2: XỬ LÝ PAIN-POINTS (Anti-flaky, Data Management & API Hybrid)
**Thư mục làm việc:** `projects/1-ui-e2e-playwright/`
**Mục tiêu:** Trở thành "bác sĩ" trị dứt điểm căn bệnh Flaky Test (lúc xanh lúc đỏ). Áp dụng Hybrid Testing (UI + API).

### 2.1. Lý thuyết cần nắm
- **Idempotency trong Test:** Test chạy 100 lần kết quả vẫn y hệt, không phụ thuộc vào dữ liệu cũ.
- **Smart Waits & Web-First Assertions:** Auto-waiting của Playwright (`toBeVisible`) so với hard sleep (`waitForTimeout`).
- **Network Interception:** Bắt và chờ các network request (XHR/Fetch) thay vì chờ giao diện.

### 2.2. Bài tập thực hành (Hands-on)
1. Tích hợp `@faker-js/faker` để sinh data ngẫu nhiên (`randomUser()`).
2. **Hybrid UI + API Testing:**
   - *BeforeAll:* Gọi API nội bộ của OrangeHRM để tạo ngẫu nhiên 1 Employee (Mất 0.1s).
   - *Test:* UI Login, tìm đúng nhân viên vừa tạo, đổi tên trên UI, Bấm Save.
   - *Assert:* Dùng API GET lấy thông tin nhân viên đó, assert xem tên đổi thành công dưới DB chưa.
   - *AfterAll (Cleanup):* Dùng API xóa đúng nhân viên đó.
3. **Chống Flaky:** Thay các lệnh click thông thường thành click chờ API response.

---

## CHƯƠNG 3: MỞ RỘNG KIẾN TRÚC & SO SÁNH (Playwright vs Cypress)
**Thư mục làm việc:** `projects/2-ui-e2e-cypress/`
**Mục tiêu:** Trải nghiệm sự khác biệt về mặt kiến trúc lõi giữa In-process (Cypress) và Out-of-process (Playwright).

### 3.1. Lý thuyết cần nắm
- **Kiến trúc Cypress:** Chạy cùng event loop với ứng dụng web.
- **Giới hạn của Cypress:** Hạn chế cross-origin, không hỗ trợ multi-tab.
- **App Actions:** Điều khiển state ứng dụng bằng window context thay vì UI/API.

### 3.2. Bài tập thực hành (Hands-on)
1. Tạo project mới `projects/2-ui-e2e-cypress/` và cài đặt Cypress độc lập.
2. Viết lại kịch bản Đăng nhập & Tạo Employee của Chương 1 bằng Cypress.
3. So sánh mock API bằng `page.route` (Playwright) và `cy.intercept` (Cypress).

---

## CHƯƠNG 4: XUYÊN THỦNG BACKEND & DATABASE (Deep Backend Testing)
**Thư mục làm việc:** `projects/3-backend-api-tests/`
**Mục tiêu:** Kiểm tra trực tiếp vào Database và xác thực dữ liệu API.

### 4.1. Bài tập thực hành (Hands-on)
1. **Database Direct Assert:** Khởi tạo kết nối PostgreSQL/MySQL. Chạy query SQL trực tiếp từ file test để verify dữ liệu thay vì gọi API GET.
2. **Schema Validation:** Dùng thư viện `zod` bắt lỗi data type của API.

---

## CHƯƠNG 5: KIỂM THỬ PHI CHỨC NĂNG (Non-Functional Testing)
**Thư mục làm việc:** `projects/4-performance-k6/` (Hiệu năng) & `projects/1-ui-e2e-playwright/` (Giao diện)
**Mục tiêu:** Đảm bảo Nhanh (Performance), Đẹp (Visual), Dễ tiếp cận (a11y).

### 5.1. Bài tập thực hành (Hands-on)
1. **Visual Testing (Playwright):** Dùng `expect(page).toHaveScreenshot()` so sánh từng điểm ảnh.
2. **Performance Testing (K6):** Viết script JS tạo 50 Virtual Users (VU) liên tục Login trong 30 giây.
3. **Accessibility Testing (a11y):** Tích hợp `@axe-core/playwright` quét lỗi truy cập.

---

## CHƯƠNG 6: QAOPS & CLOUD INFRASTRUCTURE (CI/CD Tối Thượng)
**Mục tiêu:** Đưa hệ thống Monorepo lên Cloud, kích hoạt CI/CD độc lập cho từng folder.

### 6.1. Bài tập thực hành (Hands-on)
1. **Advanced GitHub Actions:**
   - Cấu hình `.github/workflows/e2e-playwright.yml` chỉ chạy khi có code thay đổi trong thư mục `projects/1-ui-e2e-playwright/`.
   - Áp dụng Sharding chia test làm 4 máy chạy song song.
2. **Host Báo Cáo:** Xuất Playwright HTML Report và host tự động lên GitHub Pages.
