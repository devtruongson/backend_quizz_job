# API Validation Guide - Quiz Backend

## 🔧 **Các validation đã được thêm vào API**

Sau khi sửa lỗi foreign key constraint, tất cả các API create đã được thêm validation để kiểm tra foreign key trước khi tạo dữ liệu.

## 📋 **Danh sách API với validation**

### 1. **Users API** ✅
- **POST /users/register** - Đăng ký user
- **POST /users/login** - Đăng nhập
- **POST /users** - Tạo user (admin)
- **GET /users** - Lấy danh sách users
- **GET /users/:id** - Lấy user theo ID
- **PUT /users/:id** - Cập nhật user
- **DELETE /users/:id** - Xóa user

**Validation:**
- Email: Required, valid format
- Password: Required, minimum 6 characters

### 2. **Topics API** ✅
- **POST /topics** - Tạo topic
- **GET /topics** - Lấy danh sách topics
- **GET /topics/:id** - Lấy topic theo ID
- **PUT /topics/:id** - Cập nhật topic
- **DELETE /topics/:id** - Xóa topic

**Validation:**
- Title: Required

### 3. **Vocabulaires API** ✅ **NEW**
- **POST /vocabulaires** - Tạo vocabulaire
- **GET /vocabulaires** - Lấy danh sách vocabulaires
- **GET /vocabulaires/:id** - Lấy vocabulaire theo ID
- **PUT /vocabulaires/:id** - Cập nhật vocabulaire
- **DELETE /vocabulaires/:id** - Xóa vocabulaire

**Validation:**
- topicId: Required, must exist in topics table

### 4. **Vocabulaire Questions API** ✅ **NEW**
- **POST /vocabulaire-questions** - Tạo vocabulaire question
- **GET /vocabulaire-questions** - Lấy danh sách questions
- **GET /vocabulaire-questions/:id** - Lấy question theo ID
- **PUT /vocabulaire-questions/:id** - Cập nhật question
- **DELETE /vocabulaire-questions/:id** - Xóa question

**Validation:**
- vocabulaireId: Required, must exist in vocabulaire table
- At least one of title_vi or title_en: Required

### 5. **User Vocabulaires API** ✅ **NEW**
- **POST /user-vocabulaires** - Tạo user vocabulaire
- **GET /user-vocabulaires** - Lấy danh sách user vocabulaires
- **GET /user-vocabulaires/:id** - Lấy user vocabulaire theo ID
- **PUT /user-vocabulaires/:id** - Cập nhật user vocabulaire
- **DELETE /user-vocabulaires/:id** - Xóa user vocabulaire

**Validation:**
- userId: Required, must exist in users table
- vocabulaireId: Required, must exist in vocabulaire table
- status: Must be one of: 'start', 'doing', 'completed'

### 6. **User Exams API** ✅ **NEW**
- **POST /user-exams** - Tạo user exam
- **GET /user-exams** - Lấy danh sách user exams
- **GET /user-exams/:id** - Lấy user exam theo ID
- **PUT /user-exams/:id** - Cập nhật user exam
- **DELETE /user-exams/:id** - Xóa user exam

**Validation:**
- userId: Required, must exist in users table

### 7. **Exam Questions API** ✅ **NEW**
- **POST /exam-questions** - Tạo exam question
- **GET /exam-questions** - Lấy danh sách exam questions
- **GET /exam-questions/:id** - Lấy exam question theo ID
- **PUT /exam-questions/:id** - Cập nhật exam question
- **DELETE /exam-questions/:id** - Xóa exam question

**Validation:**
- vocabulaireQuestionId: Required, must exist in vocabulaire_questions table
- answer: Required

## 🚀 **Cách sử dụng API theo thứ tự đúng**

### **Bước 1: Tạo Users**
```bash
# Đăng ký user
POST /users/register
{
  "email": "nguyenvanA@gmail.com",
  "password": "123456"
}

# Tạo admin
POST /users
{
  "email": "admin@quiz.com",
  "password": "admin123",
  "role": "admin"
}
```

### **Bước 2: Tạo Topics**
```bash
POST /topics
{
  "title": "Gia đình",
  "description": "Học từ vựng về các thành viên trong gia đình"
}
```

### **Bước 3: Tạo Vocabulaires**
```bash
POST /vocabulaires
{
  "topicId": 1
}
```

### **Bước 4: Tạo Vocabulaire Questions**
```bash
POST /vocabulaire-questions
{
  "audio_vi": "https://example.com/audio/father_vi.mp3",
  "audio_en": "https://example.com/audio/father_en.mp3",
  "image": "https://example.com/images/father.jpg",
  "title_vi": "Bố",
  "title_en": "Father",
  "description_vi": "Người cha trong gia đình",
  "description_en": "The male parent in a family",
  "vocabulaireId": 1
}
```

### **Bước 5: Tạo User Vocabulaires**
```bash
POST /user-vocabulaires
{
  "userId": 1,
  "vocabulaireId": 1,
  "status": "start",
  "percentComplete": 0,
  "vocabulaireQuestionListId": "[1,2,3,4,5]"
}
```

### **Bước 6: Tạo User Exams**
```bash
POST /user-exams
{
  "userId": 1,
  "list": "[{\"questionId\": 1, \"answer\": \"Father\", \"isCorrect\": true}]"
}
```

### **Bước 7: Tạo Exam Questions**
```bash
POST /exam-questions
{
  "vocabulaireQuestionId": 1,
  "answer": "Father",
  "isCorrect": true
}
```

## ⚠️ **Lỗi thường gặp và cách khắc phục**

### **1. Lỗi "User not found"**
```json
{
  "error": "User not found with the provided userId"
}
```
**Giải pháp:** Tạo user trước khi sử dụng userId

### **2. Lỗi "Topic not found"**
```json
{
  "error": "Topic not found with the provided topicId"
}
```
**Giải pháp:** Tạo topic trước khi sử dụng topicId

### **3. Lỗi "Vocabulaire not found"**
```json
{
  "error": "Vocabulaire not found with the provided vocabulaireId"
}
```
**Giải pháp:** Tạo vocabulaire trước khi sử dụng vocabulaireId

### **4. Lỗi "Vocabulaire question not found"**
```json
{
  "error": "Vocabulaire question not found with the provided vocabulaireQuestionId"
}
```
**Giải pháp:** Tạo vocabulaire question trước khi sử dụng vocabulaireQuestionId

## 🔍 **Kiểm tra dữ liệu tồn tại**

Trước khi tạo dữ liệu mới, bạn có thể kiểm tra dữ liệu hiện có:

```bash
# Kiểm tra users
GET /users

# Kiểm tra topics
GET /topics

# Kiểm tra vocabulaires
GET /vocabulaires

# Kiểm tra vocabulaire questions
GET /vocabulaire-questions
```

## 📊 **Response format chuẩn**

### **Success Response (201):**
```json
{
  "id": 1,
  "userId": 1,
  "vocabulaireId": 1,
  "status": "start",
  "percentComplete": 0,
  "vocabulaireQuestionListId": "[1,2,3,4,5]",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### **Error Response (400):**
```json
{
  "error": "User not found with the provided userId"
}
```

## 🎯 **Lưu ý quan trọng**

1. **Luôn tạo dữ liệu theo thứ tự:** Users → Topics → Vocabulaires → Questions → User Data
2. **Kiểm tra ID tồn tại trước khi sử dụng**
3. **Sử dụng dữ liệu mẫu từ file `sample_data_step_by_step.sql`**
4. **Test từng API một cách riêng biệt trước khi tích hợp**

Bây giờ API của bạn đã an toàn và sẽ không còn lỗi foreign key constraint nữa! 🎉 