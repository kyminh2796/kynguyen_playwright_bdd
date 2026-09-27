# 🚀 Kỷ Nguyên Fullstack QA - Automation Masterclass

Chào mừng bạn đến với Repository huấn luyện **Fullstack QA Engineer / Test Architect**. 
Dự án này không phải là một "cấu trúc mẫu (boilerplate)" để copy-paste, mà là một **Thao trường thực hành** nơi bạn học bằng cách trực tiếp đối mặt với các vấn đề kỹ thuật khó nhất (Flaky tests, Architecture, Data management).

---

## 🎭 VAI TRÒ VÀ LUẬT CHƠI (RULES OF ENGAGEMENT)
Để đảm bảo mục tiêu "Học hiểu sâu nguyên lý - Trở thành Senior", dự án này được phát triển dựa trên bộ quy tắc đã thống nhất giữa bạn (QA Engineer) và AI (Senior Test Architect / Lead QA).

### 1. Vai trò của AI (Lead QA / Mentor)
- **Tuyệt đối KHÔNG code thay bạn.** (No Spoon-feeding).
- Chỉ phân tích vấn đề, giải thích nguyên lý (bằng text hoặc sơ đồ), và đưa ra định hướng kiến trúc.
- Đóng vai trò là Reviewer khắt khe: Soi lỗi "code smell", bắt lỗi vi phạm SOLID (đặc biệt là SRP), và yêu cầu bạn Refactor (cấu trúc lại code).
- Giao bài tập thông qua các file `ASSIGNMENT_*.md`.

### 2. Vai trò của Bạn (QA Engineer)
- **Tự phân tích & Tự gõ code:** Tự suy nghĩ về bài toán UI trước khi viết Component/Page.
- **Tự research:** Đọc tài liệu trang chủ Playwright/Cypress/K6 khi được gợi ý từ khóa (Ví dụ: `test.extend` fixture).
- **Hỏi đúng cách:** Thay vì hỏi "Code cho tôi phần này", hãy hỏi *"Giải thích cho tôi nguyên lý của phần này"* hoặc *"Hãy review giúp tôi file này xem có chỗ nào chưa tối ưu"*.

---

## 🏗 KIẾN TRÚC MODULAR MONOREPO
Repository này áp dụng cấu trúc **Monorepo**, xé nhỏ các mảng test để đảm bảo tính cô lập (Isolation) chuẩn doanh nghiệp:

- 📁 `projects/1-ui-e2e-playwright/`: Trọng tâm E2E UI, Component Object Model (COM), Hybrid API, chống Flaky.
- 📁 `projects/2-ui-e2e-cypress/`: So sánh kiến trúc In-process, học App Actions.
- 📁 `projects/3-backend-api-tests/`: Trọng tâm Zod Schema Validation và Database Verification.
- 📁 `projects/4-performance-k6/`: K6 Load Testing & Stress Testing.

---

## 🗺 HỆ THỐNG TÀI LIỆU (QUAN TRỌNG)
Vui lòng đọc các tài liệu sau theo thứ tự:

1. 📜 **[Bản Đồ Lộ Trình (Roadmap)](FULLSTACK_QA_ROADMAP.md)**: Định hướng 6 Chương đi từ số 0 đến Fullstack QA.
2. 🏋️‍♂️ **[Bài Tập 1 (Chương 1)](projects/1-ui-e2e-playwright/ASSIGNMENT_1_COM_AND_FIXTURES.md)**: Thực hành Component Object Model và Dependency Injection (Fixtures) trên OrangeHRM.

---
*“Đừng viết code để nó chạy được. Hãy thiết kế hệ thống để 6 tháng sau, khi project thêm 500 test cases, code vẫn không trở thành một mớ hỗn độn.”* 
— **The Senior QA Mindset**
