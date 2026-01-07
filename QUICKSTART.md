# 🚀 Hướng dẫn nhanh Portfolio

## ✅ Hoàn thành!

Portfolio của bạn đã được tạo thành công với:

### 📁 Files đã tạo:
- ✅ `index.html` - Trang portfolio chính với 6 sections
- ✅ `css/styles.css` - Stylesheet hiện đại, responsive
- ✅ `js/script.js` - JavaScript cho interactions và animations
- ✅ `.nojekyll` - File config cho GitHub Pages
- ✅ `README.md` - Documentation đầy đủ

### 🎨 Sections trong Portfolio:

1. **Hero/Home** - Giới thiệu chính với CTA buttons
2. **About** - Giới thiệu chi tiết với statistics
3. **Skills** - 3 categories: Frontend, Backend, Database & Tools
4. **Projects** - 6 dự án mẫu với images và tags
5. **Experience** - Timeline công việc
6. **Contact** - Form liên hệ và social links

---

## 🌐 XEM TRƯỚC NGAY

Server đang chạy tại: **http://localhost:8000**

Mở link trên trong trình duyệt để xem portfolio!

---

## 📝 BƯỚC TIẾP THEO

### 1️⃣ Tùy chỉnh thông tin cá nhân

Mở `index.html` và tìm những phần này để thay đổi:

```html
<!-- Dòng ~35: Đổi tên và title -->
<h2 class="hero-title">Xin chào, tôi là <span class="highlight">TÊN BẠN</span></h2>
<p class="hero-subtitle">TITLE CỦA BẠN</p>

<!-- Dòng ~300: Đổi email -->
<a href="mailto:EMAIL_CUA_BAN@gmail.com">

<!-- Dòng ~305: Đổi GitHub link -->
<a href="https://github.com/USERNAME_CUA_BAN">
```

### 2️⃣ Thay ảnh dự án

Hiện tại đang dùng ảnh placeholder từ picsum.photos. 

**Để thay ảnh của bạn:**
1. Tạo thư mục `images/` trong project
2. Copy ảnh dự án vào đó
3. Trong `index.html`, tìm và đổi:
   ```html
   <img src="https://picsum.photos/..." alt="...">
   ```
   thành:
   ```html
   <img src="images/ten-anh.jpg" alt="...">
   ```

### 3️⃣ Cập nhật dự án

Trong `index.html`, section Projects (dòng ~113):
- Đổi tên dự án
- Đổi mô tả
- Cập nhật tags công nghệ
- Thêm links đến GitHub repo và live demo

### 4️⃣ Đổi màu sắc (tùy chọn)

Trong `css/styles.css` (dòng 2-10):
```css
:root {
  --primary: #2563eb;        /* Màu xanh dương */
  --accent: #0ea5e9;         /* Màu nhấn */
  /* Thay bằng màu bạn thích! */
}
```

---

## 🚀 DEPLOY LÊN GITHUB PAGES

### Chuẩn bị:
Repository của bạn: `Huypham15032003.github.io` ✅

### Các bước:

```powershell
# 1. Chuyển đến thư mục project
cd C:\Users\phamh\OneDrive\Documents\GithubPage

# 2. Kiểm tra status
git status

# 3. Add tất cả files
git add .

# 4. Commit với message
git commit -m "Add portfolio website"

# 5. Push lên GitHub
git push origin master
```

### Sau khi push:
- Đợi 2-3 phút để GitHub Pages build
- Truy cập: **https://huypham15032003.github.io**
- Portfolio của bạn đã LIVE! 🎉

---

## 🎯 CHECKLIST TRƯỚC KHI DEPLOY

- [ ] Đổi tên, title trong Hero section
- [ ] Cập nhật phần About với thông tin thật
- [ ] Thay đổi skills phù hợp với bạn
- [ ] Cập nhật 6 dự án (hoặc ít nhất 3-4 dự án)
- [ ] Cập nhật Experience/Timeline
- [ ] Đổi email, số điện thoại, social links
- [ ] Thay ảnh avatar (nếu muốn)
- [ ] Thay ảnh dự án từ placeholder
- [ ] Test trên mobile (F12 → Toggle device toolbar)
- [ ] Test tất cả links

---

## 🆘 GẶP VẤN ĐỀ?

### Server không chạy?
```powershell
# Thử port khác
python -m http.server 3000
```

### CSS không hiển thị trên GitHub Pages?
- Kiểm tra file `.nojekyll` có trong thư mục
- Paths trong HTML phải là: `css/styles.css` (không có `/` đầu)

### Muốn thêm Dark Mode?
- Có thể thêm sau, giờ tập trung vào nội dung trước!

### Cần thêm tính năng?
- Xem file `README.md` để biết thêm chi tiết

---

## 💡 GỢI Ý

1. **Ưu tiên nội dung trước thiết kế** - Hãy đảm bảo thông tin đầy đủ và chính xác
2. **Ít hơn là nhiều hơn** - 3-4 dự án tốt hơn 10 dự án anh chị
3. **Cập nhật thường xuyên** - Thêm dự án mới khi hoàn thành
4. **Mobile-first** - Nhiều người xem trên điện thoại
5. **Tốc độ tải** - Tối ưu kích thước ảnh (< 500KB mỗi ảnh)

---

## 🎉 CHÚC MỪNG!

Bạn đã có portfolio riêng! Giờ hãy:
1. Tùy chỉnh thông tin
2. Deploy lên GitHub Pages
3. Chia sẻ link với mọi người
4. Cập nhật CV với link portfolio

**Link portfolio sau khi deploy:**
`https://huypham15032003.github.io` 🚀

---

Need help? Check README.md for detailed documentation!
