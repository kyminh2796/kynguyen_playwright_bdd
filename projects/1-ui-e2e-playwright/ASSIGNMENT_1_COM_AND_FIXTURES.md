# BÀI TẬP 1: XÂY DỰNG NỀN MÓNG (Component Object Model & Fixtures)

Chào mừng bạn đến với môi trường huấn luyện. Ở đây, tôi sẽ đóng vai trò là **Senior Test Architect** đưa ra bài toán, còn bạn là **QA Engineer** trực tiếp giải quyết. Tôi sẽ không code thay bạn, tôi chỉ review và định hướng.

## 🎯 MỤC TIÊU BÀI TẬP
1. Thay đổi tư duy từ "viết script" sang "thiết kế kiến trúc hệ thống Test".
2. Tự tay áp dụng Component Object Model (COM) để tránh "God Object".
3. Tìm hiểu và áp dụng Playwright Custom Fixtures (Dependency Injection).

**Hệ thống thực hành:** `https://opensource-demo.orangehrmlive.com/` (Tài khoản: Admin / admin123)

---

## 🛠 CÁC NHIỆM VỤ BẠN CẦN LÀM

### Nhiệm vụ 1: Phân tích UI và thiết kế (System Analysis)
1. Hãy đăng nhập vào hệ thống OrangeHRM bằng tay.
2. Quan sát trang **Dashboard** và trang **PIM** (Quản lý nhân viên).
3. Xác định xem có những vùng giao diện (UI Areas) nào luôn xuất hiện lặp đi lặp lại ở mọi trang?
4. Tự thiết kế cây thư mục trong `src/components/` và `src/pages/` để map với những gì bạn vừa phân tích.

### Nhiệm vụ 2: Lập trình Components & Pages (Coding)
1. **Viết `TopNavbarComponent.ts`**: Chỉ chứa các locator và action liên quan đến thanh bar trên cùng (như lấy tên User đang đăng nhập, bấm Logout).
2. **Viết `SidebarComponent.ts`**: Chứa menu bên trái (click chuyển qua lại giữa các menu Admin, PIM, Leave...).
3. **Viết `LoginPage.ts`**: Chứa logic đăng nhập (không cần import Component vì trang login đứng độc lập).
4. **Viết `DashboardPage.ts`**: **YÊU CẦU QUAN TRỌNG:** Trong file này, bạn phải khởi tạo (import và new) 2 class `TopNavbarComponent` và `SidebarComponent` vào bên trong nó.

### Nhiệm vụ 3: Tự học và thiết lập Playwright Fixtures
*Tài liệu gợi ý từ Playwright:* Hãy tìm đọc tài liệu về `test.extend` (Fixtures).
- Mặc định, Playwright cung cấp cho bạn `{ page }`. Nếu không có fixture, ở mọi file test bạn phải viết: `const loginPage = new LoginPage(page);`. Việc này rất thủ công.
- **Yêu cầu:** Hãy tạo file `src/fixtures/test.fixture.ts`. Hãy cấu hình sao cho file test của bạn có thể gọi thẳng `{ loginPage, dashboardPage }` ra dùng luôn mà không cần từ khóa `new`.

### Nhiệm vụ 4: Hoàn thiện Test Script đầu tiên
Viết file `tests/01-login-and-logout.spec.ts` sử dụng Fixture vừa tạo, thực hiện luồng sau:
1. Điều hướng tới trang login.
2. Đăng nhập thành công.
3. Verify rằng Dashboard hiển thị thành công (có thể verify URL hoặc một element cụ thể).
4. Từ `dashboardPage`, gọi `TopNavbarComponent` để thực hiện thao tác Logout.
5. Verify đã quay lại màn hình Login.

---

## 🛑 TIÊU CHÍ NGHIỆM THU (ACCEPTANCE CRITERIA)
Tôi sẽ đánh giá code của bạn dựa trên các tiêu chí sau:
- [ ] Tuân thủ chặt chẽ SRP (Single Responsibility Principle): Page/Component nào làm đúng việc của nó.
- [ ] KHÔNG có code thừa, KHÔNG dùng `page.waitForTimeout()`.
- [ ] Test chạy ổn định (pass 100%) ở cả chế độ có giao diện (headed) và ẩn (headless).
- [ ] Naming convention chuẩn: Tên biến rõ ràng, tiếng Anh chuyên ngành chính xác (VD: dùng `txtUsername` hoặc `usernameInput` thay vì `input1`).

---

## 🔄 QUY TRÌNH "NỘP BÀI" VÀ NHẬN FEEDBACK
Sau khi bạn code xong:
1. Hãy yêu cầu tôi **kiểm tra** bằng cách chat: *"Tôi đã làm xong Nhiệm vụ 2, hãy review giúp tôi file LoginPage và DashboardPage"*.
2. Nếu bạn bí ở Nhiệm vụ 3 (Fixtures vì nó hơi khó hiểu lúc đầu), hãy chat: *"Tôi không hiểu cách hoạt động của test.extend, hãy giải thích nguyên lý của nó bằng sơ đồ, không được cho code"*.
3. Tôi sẽ soi kỹ code của bạn như một người Mentor thực thụ, chỉ ra các "code smell" (đoạn code chưa tối ưu) và đề xuất phương pháp tái cấu trúc (refactoring).

**Chúc bạn code vui và tư duy sắc bén! Bắt tay vào việc thôi!**
