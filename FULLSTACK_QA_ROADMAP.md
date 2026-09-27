# Lộ Trình Kỹ Sư Kiểm Thử Toàn Diện (Fullstack QA / SDET Masterclass)

Tài liệu này là bản đồ định hướng từ số 0 đến cấp độ **Fullstack QA Engineer (SDET)**, lấy dự án **OrangeHRM** làm trọng tâm. Một Fullstack QA không chỉ biết viết kịch bản UI, mà còn "bao thầu" Database, API, Performance, Bảo mật và Hệ thống CI/CD.

Lộ trình được chia làm 6 Chương lớn.

---

## CHƯƠNG 1: XÂY DỰNG NỀN MÓNG (Playwright, COM & TDD)
**Mục tiêu:** Thoát khỏi tư duy "record & playback". Áp dụng Component Object Model (COM) thay cho POM truyền thống để code không bao giờ trở thành "God Object".

### 1.1. Lý thuyết cần nắm
- **Component Object Model (COM):** Cách chia nhỏ một trang web thành các thành phần (Header, Sidebar, Table).
- **Playwright Custom Fixtures:** Cách tiêm (inject) các Page/Component vào test mà không cần khởi tạo thủ công `new LoginPage(page)`.
- **TDD (Test-Driven Development) cơ bản:** Tư duy viết khung (skeleton) của test trước, mock API chạy cho pass, rồi mới viết locator.

### 1.2. Bài tập thực hành (Hands-on)
1. Tạo thư mục `src/components/`, `src/pages/`, `src/fixtures/`.
2. Viết `SidebarComponent.ts` và `TopNavbarComponent.ts` chứa các locators dùng chung.
3. Viết `DashboardPage.ts` (Import và khởi tạo `SidebarComponent` và `TopNavbarComponent` bên trong nó).
4. Viết `login.spec.ts`: Đăng nhập, verify Dashboard hiển thị, dùng NavbarComponent để logout thông qua Fixture.

---

## CHƯƠNG 2: XỬ LÝ PAIN-POINTS (Anti-flaky, Data Management & API Hybrid)
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
3. **Chống Flaky:** Thay các lệnh click thông thường thành click chờ API response: `await Promise.all([ page.waitForResponse('**/api/v2/pim/employees'), page.click('#btnSave') ])`.

---

## CHƯƠNG 3: MỞ RỘNG KIẾN TRÚC & SO SÁNH (Playwright vs Cypress)
**Mục tiêu:** Trải nghiệm sự khác biệt về mặt kiến trúc lõi giữa In-process (Cypress) và Out-of-process (Playwright).

### 3.1. Lý thuyết cần nắm
- **Kiến trúc Cypress:** Chạy cùng event loop với ứng dụng web, truy cập thẳng vào `window` object.
- **Giới hạn của Cypress:** Hạn chế cross-origin, không hỗ trợ multi-tab.
- **App Actions:** Lấy Redux state hoặc gọi trực tiếp function trong code Frontend để thiết lập test state (Bỏ qua UI/API).

### 3.2. Bài tập thực hành (Hands-on)
1. Khởi tạo cấu trúc thư mục Cypress song song với Playwright (`cypress/e2e/`).
2. Viết lại kịch bản Đăng nhập & Tạo Employee của Chương 1 bằng Cypress.
3. Dùng Playwright `page.route` và Cypress `cy.intercept` để mock API danh sách nhân viên trả về mảng rỗng `[]`. So sánh Developer Experience.

---

## CHƯƠNG 4: XUYÊN THỦNG BACKEND & DATABASE (Deep Backend Testing)
**Mục tiêu:** Không tin tưởng mù quáng vào API response, kiểm tra trực tiếp vào Database và xác thực dữ liệu chặt chẽ.

### 4.1. Lý thuyết cần nắm
- **Cơ sở dữ liệu (Database Testing):** Khởi tạo Connection String (PostgreSQL, MySQL, MongoDB) từ trong Framework Test.
- **API Schema Validation / Contract Testing:** Đảm bảo kiểu dữ liệu, cấu trúc JSON trả về của backend hoàn toàn khớp với tài liệu chuẩn (Swagger).

### 4.2. Bài tập thực hành (Hands-on)
1. **Database Direct Assert:**
   - Mở kết nối Database trong file config của Playwright.
   - Viết E2E Create User trên giao diện. Sau đó query SQL trực tiếp: `SELECT * FROM users WHERE email='...'`.
   - Kiểm tra xem mật khẩu có đang được mã hóa đúng chuẩn (Hashed password) thay vì lưu plain text không.
2. **Schema Validation:** Tích hợp thư viện `zod` hoặc `ajv`. Định nghĩa schema cho API `/web/index.php/api/v2/pim/employees`. Viết test assert xem API có bao giờ lén lút trả về `null` thay vì `string` gây sập Frontend không.

---

## CHƯƠNG 5: KIỂM THỬ PHI CHỨC NĂNG (Non-Functional Testing)
**Mục tiêu:** Đảm bảo sản phẩm không chỉ chạy đúng, mà còn Nhanh, Đẹp và Dễ tiếp cận.

### 5.1. Lý thuyết cần nắm
- **Visual Regression:** Kiểm thử hồi quy giao diện bằng cách so sánh từng pixel.
- **Performance & Load Testing:** Ép tải hệ thống để xem sức chịu đựng (Stress/Spike test).
- **Accessibility (a11y):** Kiểm thử khả năng tiếp cận (Màu sắc, alt text) theo chuẩn WCAG.

### 5.2. Bài tập thực hành (Hands-on)
1. **Visual Testing:** Dùng `expect(page).toHaveScreenshot()` chụp màn hình Dashboard. Cố ý dùng DevTools xóa 1 button và chạy lại test để xem cách Playwright highlight điểm sai khác (Image diffing).
2. **Performance Testing (K6):** Cài đặt `k6`. Viết script JavaScript mô phỏng 50 Virtual Users (VU) liên tục Login vào OrangeHRM trong 30 giây. Bắt lỗi nếu thời gian phản hồi (p95) vượt quá 1000ms.
3. **Accessibility Testing:** Cài đặt `@axe-core/playwright`. Quét toàn bộ trang LoginPage và in ra Terminal danh sách các lỗi UI/UX cản trở người khuyết tật sử dụng.

---

## CHƯƠNG 6: QAOPS & CLOUD INFRASTRUCTURE (CI/CD Tối Thượng)
**Mục tiêu:** Đưa toàn bộ kịch bản tự động hóa lên mây (Cloud), tự động chạy và tự động báo cáo, chuẩn bị hành trang trở thành Test Architect.

### 6.1. Lý thuyết cần nắm
- **Containerization:** Đóng gói (Dockerize) framework automation.
- **Matrix Strategy & Sharding:** Chia nhỏ bộ test lớn (1000 cases) ra cho nhiều máy ảo chạy song song để rút ngắn thời gian.
- **Observability:** Gom và host báo cáo trực quan.

### 6.2. Bài tập thực hành (Hands-on)
1. **Dockerize:** Viết file `Dockerfile` để đóng gói Playwright framework. Chạy lệnh `docker build` và `docker run` đảm bảo kịch bản chạy được trong container độc lập.
2. **Advanced GitHub Actions:**
   - Tạo file `.github/workflows/fullstack-qa.yml`.
   - Chia 4 Workers chạy song song (Sharding: `npx playwright test --shard=1/4`).
   - Tự động gom 4 file reports lại thành 1 file duy nhất.
3. **Host Báo Cáo:** Sử dụng GitHub Pages để host tĩnh thư mục `playwright-report`. Sau khi CI chạy xong, bạn sẽ có 1 đường link URL gửi được cho bất kỳ ai xem kết quả pass/fail, kèm video/trace của test case đó.
