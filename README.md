# Portfolio Website - Huy Phạm

Trang portfolio cá nhân chuyên nghiệp được xây dựng với HTML, CSS và JavaScript thuần túy.

## ✨ Tính năng

- 🎨 Thiết kế hiện đại, responsive trên mọi thiết bị
- 🚀 Hiệu ứng animation mượt mà
- 📱 Mobile-first design
- 🎯 Navigation sticky với highlight active section
- 💼 Showcase projects với overlay effects
- 📧 Contact form với validation
- ⬆️ Scroll to top button
- 🌙 Smooth scrolling

## 📂 Cấu trúc thư mục

```
GithubPage/
├── index.html          # Trang chính
├── css/
│   └── styles.css      # Stylesheet chính
├── js/
│   └── script.js       # JavaScript interactions
├── .nojekyll          # Ngăn Jekyll processing
└── README.md          # Documentation
```

## 🚀 Triển khai lên GitHub Pages

### Cách 1: Repository cá nhân (username.github.io)

1. Repository này đã được tạo với tên: `Huypham15032003.github.io`
2. Push code lên branch `main` hoặc `master`:
```bash
git add .
git commit -m "Update portfolio"
git push origin master
```
3. Truy cập: `https://huypham15032003.github.io`

## 💻 Xem trước cục bộ

### Với Python (đơn giản nhất):
```powershell
cd C:\Users\phamh\OneDrive\Documents\GithubPage
python -m http.server 8000
```
Mở trình duyệt: `http://localhost:8000`

### Với VS Code Live Server:
1. Cài extension "Live Server"
2. Right-click vào `index.html`
3. Chọn "Open with Live Server"

## 🎨 Tùy chỉnh Portfolio

### Thay đổi thông tin cá nhân

**Trong `index.html`:**

1. **Hero Section**: Đổi tên, title, avatar
2. **About Section**: Viết lại giới thiệu về bản thân
3. **Skills Section**: Thêm/bớt công nghệ
4. **Projects Section**: Cập nhật dự án của bạn
5. **Experience Section**: Cập nhật timeline công việc
6. **Contact Section**: Đổi email, social links, số điện thoại

### Thay đổi màu sắc

**Trong `css/styles.css`** (dòng 2-10), sửa các biến CSS:

```css
:root {
  --primary: #2563eb;        /* Màu chính */
  --primary-dark: #1e40af;   /* Màu chính tối */
  --accent: #0ea5e9;         /* Màu nhấn */
}
```

## 📸 Thêm ảnh dự án riêng

1. Tạo thư mục `images/` trong project
2. Thêm ảnh vào thư mục
3. Trong `index.html`, đổi: `<img src="images/project1.jpg">`

## 📝 Checklist trước khi deploy

- [ ] Cập nhật tất cả thông tin cá nhân
- [ ] Thay thế ảnh placeholder bằng ảnh thật
- [ ] Kiểm tra tất cả links (GitHub, LinkedIn, etc.)
- [ ] Test responsive trên mobile/tablet
- [ ] Kiểm tra contact form
- [ ] Test trên nhiều trình duyệt

---

Made with ❤️ by Huy Phạm

