# API Documentation - Quiz Backend

## Tổng quan
API này được thiết kế cho ứng dụng học từ vựng với các tính năng:
- Quản lý người dùng (đăng ký, đăng nhập)
- Quản lý chủ đề học tập
- Quản lý từ vựng và câu hỏi
- Theo dõi tiến độ học tập
- Quản lý bài thi và kết quả

## Base URL
```
http://localhost:3000
```

## Authentication
Hiện tại API chưa có JWT authentication, chỉ sử dụng email/password để đăng nhập.

## Endpoints

### 1. Users API

#### 1.1 Đăng ký người dùng
```http
POST /users/register
```

**Request Body:**
```json
{
  "email": "nguyenvanA@gmail.com",
  "password": "123456"
}
```

**Response (201):**
```json
{
  "id": 1,
  "email": "nguyenvanA@gmail.com",
  "password": "123456",
  "role": "user"
}
```

#### 1.2 Đăng nhập
```http
POST /users/login
```

**Request Body:**
```json
{
  "email": "nguyenvanA@gmail.com",
  "password": "123456"
}
```

**Response (200):**
```json
{
  "id": 1,
  "email": "nguyenvanA@gmail.com",
  "password": "123456",
  "role": "user"
}
```

#### 1.3 Tạo người dùng (Admin)
```http
POST /users
```

**Request Body:**
```json
{
  "email": "admin@quiz.com",
  "password": "admin123",
  "role": "admin"
}
```

#### 1.4 Lấy danh sách người dùng
```http
GET /users
```

#### 1.5 Lấy người dùng theo ID
```http
GET /users/{id}
```

#### 1.6 Cập nhật người dùng
```http
PUT /users/{id}
```

**Request Body:**
```json
{
  "email": "nguyenvanA_updated@gmail.com",
  "password": "newpassword123",
  "role": "user"
}
```

#### 1.7 Xóa người dùng
```http
DELETE /users/{id}
```

### 2. Topics API

#### 2.1 Tạo chủ đề
```http
POST /topics
```

**Request Body:**
```json
{
  "title": "Gia đình",
  "description": "Học từ vựng về các thành viên trong gia đình"
}
```

**Response (201):**
```json
{
  "id": 1,
  "title": "Gia đình",
  "description": "Học từ vựng về các thành viên trong gia đình"
}
```

#### 2.2 Lấy danh sách chủ đề
```http
GET /topics
```

#### 2.3 Lấy chủ đề theo ID
```http
GET /topics/{id}
```

#### 2.4 Cập nhật chủ đề
```http
PUT /topics/{id}
```

**Request Body:**
```json
{
  "title": "Gia đình và Bạn bè",
  "description": "Học từ vựng về gia đình và các mối quan hệ xã hội"
}
```

#### 2.5 Xóa chủ đề
```http
DELETE /topics/{id}
```

### 3. Vocabulaires API

#### 3.1 Tạo từ vựng
```http
POST /vocabulaires
```

**Request Body:**
```json
{
  "topicId": 1
}
```

#### 3.2 Lấy danh sách từ vựng
```http
GET /vocabulaires
```

#### 3.3 Lấy từ vựng theo ID
```http
GET /vocabulaires/{id}
```

#### 3.4 Cập nhật từ vựng
```http
PUT /vocabulaires/{id}
```

**Request Body:**
```json
{
  "topicId": 2
}
```

#### 3.5 Xóa từ vựng
```http
DELETE /vocabulaires/{id}
```

### 4. Vocabulaire Questions API

#### 4.1 Tạo câu hỏi từ vựng
```http
POST /vocabulaire-questions
```

**Request Body:**
```json
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

**Response (201):**
```json
{
  "id": 1,
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

#### 4.2 Lấy danh sách câu hỏi
```http
GET /vocabulaire-questions
```

#### 4.3 Lấy câu hỏi theo ID
```http
GET /vocabulaire-questions/{id}
```

#### 4.4 Cập nhật câu hỏi
```http
PUT /vocabulaire-questions/{id}
```

**Request Body:**
```json
{
  "title_vi": "Cha",
  "title_en": "Dad",
  "description_vi": "Cách gọi thân mật cho người cha",
  "description_en": "An affectionate term for father"
}
```

#### 4.5 Xóa câu hỏi
```http
DELETE /vocabulaire-questions/{id}
```

### 5. User Vocabulaires API

#### 5.1 Tạo tiến độ học
```http
POST /user-vocabulaires
```

**Request Body:**
```json
{
  "userId": 1,
  "vocabulaireId": 1,
  "status": "start",
  "percentComplete": 0,
  "vocabulaireQuestionListId": "[1,2,3,4,5]"
}
```

**Response (201):**
```json
{
  "id": 1,
  "userId": 1,
  "vocabulaireId": 1,
  "status": "start",
  "percentComplete": 0,
  "vocabulaireQuestionListId": "[1,2,3,4,5]"
}
```

#### 5.2 Lấy danh sách tiến độ học
```http
GET /user-vocabulaires
```

#### 5.3 Lấy tiến độ học theo ID
```http
GET /user-vocabulaires/{id}
```

#### 5.4 Cập nhật tiến độ học
```http
PUT /user-vocabulaires/{id}
```

**Request Body:**
```json
{
  "status": "doing",
  "percentComplete": 50
}
```

#### 5.5 Xóa tiến độ học
```http
DELETE /user-vocabulaires/{id}
```

### 6. User Exams API

#### 6.1 Tạo bài thi
```http
POST /user-exams
```

**Request Body:**
```json
{
  "userId": 1,
  "list": "[{\"questionId\": 1, \"answer\": \"Father\", \"isCorrect\": true}, {\"questionId\": 2, \"answer\": \"Mother\", \"isCorrect\": true}]"
}
```

**Response (201):**
```json
{
  "id": 1,
  "userId": 1,
  "list": "[{\"questionId\": 1, \"answer\": \"Father\", \"isCorrect\": true}, {\"questionId\": 2, \"answer\": \"Mother\", \"isCorrect\": true}]"
}
```

#### 6.2 Lấy danh sách bài thi
```http
GET /user-exams
```

#### 6.3 Lấy bài thi theo ID
```http
GET /user-exams/{id}
```

#### 6.4 Cập nhật bài thi
```http
PUT /user-exams/{id}
```

**Request Body:**
```json
{
  "list": "[{\"questionId\": 1, \"answer\": \"Father\", \"isCorrect\": true}, {\"questionId\": 2, \"answer\": \"Mother\", \"isCorrect\": true}, {\"questionId\": 3, \"answer\": \"Sister\", \"isCorrect\": false}]"
}
```

#### 6.5 Xóa bài thi
```http
DELETE /user-exams/{id}
```

### 7. Exam Questions API

#### 7.1 Tạo câu hỏi bài thi
```http
POST /exam-questions
```

**Request Body:**
```json
{
  "vocabulaireQuestionId": 1,
  "answer": "Father",
  "isCorrect": true
}
```

**Response (201):**
```json
{
  "id": 1,
  "vocabulaireQuestionId": 1,
  "answer": "Father",
  "isCorrect": true
}
```

#### 7.2 Lấy danh sách câu hỏi bài thi
```http
GET /exam-questions
```

#### 7.3 Lấy câu hỏi bài thi theo ID
```http
GET /exam-questions/{id}
```

#### 7.4 Cập nhật câu hỏi bài thi
```http
PUT /exam-questions/{id}
```

**Request Body:**
```json
{
  "answer": "Dad",
  "isCorrect": true
}
```

#### 7.5 Xóa câu hỏi bài thi
```http
DELETE /exam-questions/{id}
```

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

## Error Response Format

```json
{
  "error": "Error message description"
}
```

## Validation Rules

### User Registration/Login
- Email: Required, valid email format
- Password: Required, minimum 6 characters

### Topic
- Title: Required, string

### Vocabulaire Question
- VocabulaireId: Required, integer
- Title_vi and Title_en: At least one is required

### User Vocabulaire
- UserId: Required, integer
- VocabulaireId: Required, integer
- Status: Must be one of: 'start', 'doing', 'completed'

## Dữ liệu mẫu

Để có dữ liệu mẫu để test, chạy file `sample_data.sql` trong database của bạn. File này chứa:

1. **5 users** với email và password thực tế
2. **8 topics** về các chủ đề học tập khác nhau
3. **8 vocabulaires** tương ứng với các topics
4. **25 vocabulaire questions** với dữ liệu đa ngôn ngữ (Việt-Anh)
5. **6 user vocabularies** với tiến độ học khác nhau
6. **3 user exams** với kết quả bài thi
7. **16 exam questions** với các lựa chọn đúng/sai

## Cách sử dụng Postman

1. Import file `postman_collection.json` vào Postman
2. Set environment variable `base_url` = `http://localhost:3000`
3. Chạy các requests theo thứ tự:
   - Đầu tiên tạo users
   - Sau đó tạo topics
   - Tiếp theo tạo vocabulaires
   - Cuối cùng tạo vocabulaire questions

## Lưu ý

- Tất cả các endpoints đều trả về JSON
- Các ID được tự động tạo bởi database
- Các trường optional có thể bỏ qua trong request body
- Đảm bảo chạy database migrations trước khi sử dụng API 