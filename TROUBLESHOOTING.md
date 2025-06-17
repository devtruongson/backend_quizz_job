# Hướng dẫn khắc phục lỗi Foreign Key Constraint

## 🔍 **Lỗi gặp phải:**
```
SQL Error [1452] [23000]: Cannot add or update a child row: a foreign key constraint fails 
(`quizz_eng`.`user_exam`, CONSTRAINT `user_exam_ibfk_1` FOREIGN KEY (`userId`) 
REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE)
```

## 🎯 **Nguyên nhân:**
Lỗi này xảy ra khi bạn cố gắng insert dữ liệu vào bảng con (child table) mà foreign key tham chiếu đến bảng cha (parent table) chưa tồn tại.

## 🛠️ **Cách khắc phục:**

### **Phương pháp 1: Chạy file SQL theo từng bước**

1. **Xóa dữ liệu cũ (nếu có):**
   ```sql
   -- Chạy file clean_and_reset.sql
   ```

2. **Chạy dữ liệu mẫu theo từng bước:**
   ```sql
   -- Chạy file sample_data_step_by_step.sql
   ```

### **Phương pháp 2: Kiểm tra thủ công**

1. **Kiểm tra bảng users có dữ liệu chưa:**
   ```sql
   SELECT * FROM users;
   ```

2. **Nếu bảng users trống, chạy:**
   ```sql
   INSERT INTO users (email, password, role) VALUES
   ('nguyenvanA@gmail.com', '123456', 'user'),
   ('tranthiB@gmail.com', '123456', 'user'),
   ('levanC@gmail.com', '123456', 'user'),
   ('phamthuD@gmail.com', '123456', 'user'),
   ('admin@quiz.com', 'admin123', 'admin');
   ```

3. **Kiểm tra bảng topics:**
   ```sql
   SELECT * FROM topics;
   ```

4. **Nếu bảng topics trống, chạy:**
   ```sql
   INSERT INTO topics (title, description) VALUES
   ('Gia đình', 'Học từ vựng về các thành viên trong gia đình'),
   ('Màu sắc', 'Học tên các màu sắc cơ bản'),
   ('Số đếm', 'Học số đếm từ 1 đến 100'),
   ('Động vật', 'Học tên các loài động vật'),
   ('Thực phẩm', 'Học tên các loại thực phẩm và đồ ăn'),
   ('Nghề nghiệp', 'Học tên các nghề nghiệp phổ biến'),
   ('Thời tiết', 'Học từ vựng về thời tiết và khí hậu'),
   ('Giao thông', 'Học tên các phương tiện giao thông');
   ```

5. **Tiếp tục với các bảng khác theo thứ tự:**
   - vocabulaire
   - vocabulaire_questions
   - user_vocabulaire
   - user_exam
   - exam_question

### **Phương pháp 3: Tắt foreign key checks tạm thời**

```sql
-- Tắt foreign key checks
SET FOREIGN_KEY_CHECKS = 0;

-- Chạy tất cả INSERT statements

-- Bật lại foreign key checks
SET FOREIGN_KEY_CHECKS = 1;
```

## 📋 **Thứ tự chạy SQL bắt buộc:**

1. **Bước 1:** `users` (bảng cha)
2. **Bước 2:** `topics` (bảng cha)
3. **Bước 3:** `vocabulaire` (tham chiếu đến topics)
4. **Bước 4:** `vocabulaire_questions` (tham chiếu đến vocabulaire)
5. **Bước 5:** `user_vocabulaire` (tham chiếu đến users và vocabulaire)
6. **Bước 6:** `user_exam` (tham chiếu đến users)
7. **Bước 7:** `exam_question` (tham chiếu đến vocabulaire_questions)

## 🔍 **Kiểm tra sau khi chạy:**

```sql
-- Kiểm tra tổng quan dữ liệu
SELECT 'Users' as table_name, COUNT(*) as count FROM users
UNION ALL
SELECT 'Topics', COUNT(*) FROM topics
UNION ALL
SELECT 'Vocabulaire', COUNT(*) FROM vocabulaire
UNION ALL
SELECT 'Vocabulaire Questions', COUNT(*) FROM vocabulaire_questions
UNION ALL
SELECT 'User Vocabulaire', COUNT(*) FROM user_vocabulaire
UNION ALL
SELECT 'User Exam', COUNT(*) FROM user_exam
UNION ALL
SELECT 'Exam Question', COUNT(*) FROM exam_question;
```

**Kết quả mong đợi:**
- Users: 5
- Topics: 8
- Vocabulaire: 8
- Vocabulaire Questions: 25
- User Vocabulaire: 6
- User Exam: 3
- Exam Question: 16

## ⚠️ **Lưu ý quan trọng:**

1. **Không bao giờ chạy các câu lệnh INSERT bảng con trước bảng cha**
2. **Luôn kiểm tra dữ liệu tồn tại trước khi insert**
3. **Sử dụng file `sample_data_step_by_step.sql` để tránh lỗi**
4. **Nếu vẫn lỗi, sử dụng file `clean_and_reset.sql` để xóa dữ liệu cũ**

## 🚀 **Cách sử dụng nhanh:**

```bash
# 1. Xóa dữ liệu cũ (nếu cần)
mysql -u username -p database_name < clean_and_reset.sql

# 2. Chạy dữ liệu mẫu theo từng bước
mysql -u username -p database_name < sample_data_step_by_step.sql
``` 