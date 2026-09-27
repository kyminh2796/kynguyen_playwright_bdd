# Sổ Tay Thực Hành Tự Động Hóa (Automation Engineering Masterclass)

Tài liệu này là lộ trình thực hành chi tiết từ số 0 đến cấp độ Senior Automation Engineer, sử dụng **OrangeHRM** làm dự án cốt lõi. Chúng ta chia làm 3 Chương lớn.

---

## CHƯƠNG 1: XÂY DỰNG NỀN MÓNG (Playwright, COM & TDD)
**Mục tiêu:** Thoát khỏi tư duy "record & playback". Áp dụng Component Object Model (COM) thay cho POM truyền thống để code không bao giờ trở thành "God Object".

### 1.1. Lý thuyết cần nắm
- **Component Object Model (COM):** Cách chia nhỏ một trang web thành các thành phần (Header, Sidebar, Table).
- **Playwright Custom Fixtures:** Cách tiêm (inject) các Page/Component vào test mà không cần khởi tạo thủ công `new LoginPage(page)`.
- **TDD (Test-Driven Development) cơ bản:** Tư duy viết khung (skeleton) của test trước, mock API chạy cho pass, rồi mới viết locator.

### 1.2. Các trường hợp hay gặp (Common Scenarios)
- Giao diện có các thành phần lặp lại trên nhiều trang (VD: Menu bên trái, thanh User Profile bên phải).
- Element bị ẩn trong shadow DOM hoặc iFrame (Playwright xử lý rất dễ bằng `.locator()`).

### 1.3. Bài tập thực hành (Hands-on)
1. **Thiết lập cấu trúc thư mục:**
   - Tạo thư mục `src/components/`, `src/pages/`, `src/fixtures/`.
2. **Code Component:**
   - Viết `SidebarComponent.ts` chứa các locator và hàm click menu bên trái của OrangeHRM.
   - Viết `TopNavbarComponent.ts` chứa hàm click Logout.
3. **Code Page:**
   - Viết `LoginPage.ts` (không kế thừa component vì trang login đơn giản).
   - Viết `DashboardPage.ts` (Import và khởi tạo `SidebarComponent` và `TopNavbarComponent` bên trong nó).
4. **Code Fixture & Test:**
   - Tạo `test.fixture.ts` để kết nối tất cả.
   - Viết `login.spec.ts`: Đăng nhập, verify Dashboard hiển thị, dùng NavbarComponent để logout.

---

## CHƯƠNG 2: XỬ LÝ PAIN-POINTS (Anti-flaky, Data Management & API Hybrid)
**Mục tiêu:** Trở thành "bác sĩ" trị dứt điểm căn bệnh Flaky Test (lúc xanh lúc đỏ). Áp dụng Hybrid Testing (UI + API).

### 2.1. Lý thuyết cần nắm
- **Idempotency trong Test:** Test chạy 100 lần kết quả vẫn y hệt, không phụ thuộc vào dữ liệu cũ.
- **Smart Waits & Web-First Assertions:** Sự khác nhau biệt giữa Auto-waiting của Playwright (`toBeVisible`) so với hard sleep (`waitForTimeout`).
- **Network Interception:** Bắt và chờ các network request (XHR/Fetch) thay vì chờ giao diện.

### 2.2. Các trường hợp hay gặp (Hard Cases)
- **Data Collision:** Test chạy song song tạo trùng tên user báo lỗi. 
- **Flakiness do Async UI:** Click nút "Save" xong, popup "Success" hiện lên quá nhanh rồi biến mất, assert không kịp báo fail.
- **Tốn thời gian:** Dùng UI để tạo 1 user mất 10s. Nếu test case có 20 steps, chạy quá lâu.

### 2.3. Bài tập thực hành (Hands-on)
1. **Tích hợp Data Generator:**
   - Cài đặt `@faker-js/faker`. Viết helper sinh data ngẫu nhiên (`randomUser()`).
2. **Hybrid UI + API Testing:**
   - **Bài toán:** Yêu cầu test luồng "Chỉnh sửa nhân viên".
   - **Thay vì:** Dùng UI login -> Dùng UI tạo nhân viên -> Dùng UI sửa.
   - **Thực hành viết test:** 
     - *Bước 1 (BeforeAll):* Dùng `request.post` gọi API nội bộ của OrangeHRM để tạo ngẫu nhiên 1 Employee trong vòng 0.1s.
     - *Bước 2 (Test):* UI Login, tìm đúng nhân viên vừa tạo, dùng UI đổi tên thành tên khác, Bấm Save.
     - *Bước 3 (Assert):* Đừng dùng UI để check. Dùng `request.get` gọi API lấy thông tin nhân viên đó, assert xem tên đổi thành công dưới Database chưa.
     - *Bước 4 (AfterAll/Cleanup):* Dùng API xóa đúng nhân viên đó.
3. **Thực hành chống Flaky:**
   - Thay toàn bộ các lệnh click thông thường thành click chờ API response: `await Promise.all([ page.waitForResponse('**/api/v2/pim/employees'), page.click('#btnSave') ])`.

---

## CHƯƠNG 3: MỞ RỘNG KIẾN TRÚC & SO SÁNH (Playwright vs Cypress)
**Mục tiêu:** Trải nghiệm sự khác biệt về mặt kiến trúc lõi giữa In-process (Cypress) và Out-of-process (Playwright).

### 3.1. Lý thuyết cần nắm
- **Kiến trúc Cypress:** Chạy cùng event loop với ứng dụng React/Angular. Truy cập thẳng vào `window` object.
- **Giới hạn của Cypress:** Hạn chế cross-origin (chuyển domain), không hỗ trợ multi-tab, multi-window.
- **App Actions:** Cách Cypress lấy Redux state hoặc gọi trực tiếp function trong code Frontend để thiết lập test state (Không qua UI, không qua API backend).

### 3.2. Các trường hợp hay gặp (Hard Cases)
- Chặn (Stub) một API response để ép Frontend hiển thị lỗi 500 (Server Error) xem UI xử lý thế nào.
- Thao tác kéo thả (Drag and Drop) phức tạp hoặc iFrame bên thứ 3 (như cổng thanh toán Stripe).

### 3.3. Bài tập thực hành (Hands-on)
1. **Cài đặt Cypress vào cùng Repo:**
   - Chạy `npm install cypress --save-dev`, khởi tạo cấu trúc thư mục Cypress song song với Playwright (`cypress/e2e/`).
2. **Rewrite (Viết lại) bằng Cypress:**
   - Viết lại kịch bản Đăng nhập & Tạo Employee của Chương 1 bằng Cypress.
   - Áp dụng App Actions/Custom Commands của Cypress (`cy.login()`).
3. **Bài tập so sánh Stubbing (Mocking):**
   - Dùng Playwright `page.route` và Cypress `cy.intercept` để mock API danh sách nhân viên trả về mảng rỗng `[]`.
   - Assert xem màn hình hiển thị "No Records Found" trong cả 2 Framework.
   - Cảm nhận Developer Experience (DX) của Cypress Time-travel UI so với Playwright Trace Viewer.

---
*Lộ trình này sẽ giúp bạn hiểu sâu tận gốc rễ vấn đề thay vì chỉ copy-paste code. Chúc bạn thực hành hiệu quả!*
