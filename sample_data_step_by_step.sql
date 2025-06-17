-- =====================================================
-- DỮ LIỆU MẪU CHO ỨNG DỤNG QUIZ HỌC TỪ VỰNG
-- Chạy từng phần theo thứ tự để tránh lỗi foreign key
-- =====================================================

-- =====================================================
-- BƯỚC 1: TẠO USERS (Phải chạy đầu tiên)
-- =====================================================
INSERT INTO users (email, password, role) VALUES
('nguyenvanA@gmail.com', '123456', 'user'),
('tranthiB@gmail.com', '123456', 'user'),
('levanC@gmail.com', '123456', 'user'),
('phamthuD@gmail.com', '123456', 'user'),
('admin@quiz.com', 'admin123', 'admin');

-- Kiểm tra users đã được tạo
SELECT * FROM users;

-- =====================================================
-- BƯỚC 2: TẠO TOPICS (Chủ đề)
-- =====================================================
INSERT INTO topics (title, description) VALUES
('Gia đình', 'Học từ vựng về các thành viên trong gia đình'),
('Màu sắc', 'Học tên các màu sắc cơ bản'),
('Số đếm', 'Học số đếm từ 1 đến 100'),
('Động vật', 'Học tên các loài động vật'),
('Thực phẩm', 'Học tên các loại thực phẩm và đồ ăn'),
('Nghề nghiệp', 'Học tên các nghề nghiệp phổ biến'),
('Thời tiết', 'Học từ vựng về thời tiết và khí hậu'),
('Giao thông', 'Học tên các phương tiện giao thông');

-- Kiểm tra topics đã được tạo
SELECT * FROM topics;

-- =====================================================
-- BƯỚC 3: TẠO VOCABULAIRES (Từ vựng theo chủ đề)
-- =====================================================
INSERT INTO vocabulaire (topicId) VALUES
(1), -- Gia đình
(2), -- Màu sắc
(3), -- Số đếm
(4), -- Động vật
(5), -- Thực phẩm
(6), -- Nghề nghiệp
(7), -- Thời tiết
(8); -- Giao thông

-- Kiểm tra vocabulaire đã được tạo
SELECT * FROM vocabulaire;

-- =====================================================
-- BƯỚC 4: TẠO VOCABULAIRE QUESTIONS (Câu hỏi từ vựng)
-- =====================================================
INSERT INTO vocabulaire_questions (audio_vi, audio_en, image, title_vi, title_en, description_vi, description_en, vocabulaireId) VALUES
-- Gia đình
('https://example.com/audio/father_vi.mp3', 'https://example.com/audio/father_en.mp3', 'https://example.com/images/father.jpg', 'Bố', 'Father', 'Người cha trong gia đình', 'The male parent in a family', 1),
('https://example.com/audio/mother_vi.mp3', 'https://example.com/audio/mother_en.mp3', 'https://example.com/images/mother.jpg', 'Mẹ', 'Mother', 'Người mẹ trong gia đình', 'The female parent in a family', 1),
('https://example.com/audio/sister_vi.mp3', 'https://example.com/audio/sister_en.mp3', 'https://example.com/images/sister.jpg', 'Chị/Em gái', 'Sister', 'Người chị hoặc em gái', 'A female sibling', 1),
('https://example.com/audio/brother_vi.mp3', 'https://example.com/audio/brother_en.mp3', 'https://example.com/images/brother.jpg', 'Anh/Em trai', 'Brother', 'Người anh hoặc em trai', 'A male sibling', 1),
('https://example.com/audio/grandfather_vi.mp3', 'https://example.com/audio/grandfather_en.mp3', 'https://example.com/images/grandfather.jpg', 'Ông', 'Grandfather', 'Cha của cha hoặc mẹ', 'Father of one''s parent', 1),

-- Màu sắc
('https://example.com/audio/red_vi.mp3', 'https://example.com/audio/red_en.mp3', 'https://example.com/images/red.jpg', 'Đỏ', 'Red', 'Màu đỏ', 'The color red', 2),
('https://example.com/audio/blue_vi.mp3', 'https://example.com/audio/blue_en.mp3', 'https://example.com/images/blue.jpg', 'Xanh dương', 'Blue', 'Màu xanh dương', 'The color blue', 2),
('https://example.com/audio/green_vi.mp3', 'https://example.com/audio/green_en.mp3', 'https://example.com/images/green.jpg', 'Xanh lá', 'Green', 'Màu xanh lá cây', 'The color green', 2),
('https://example.com/audio/yellow_vi.mp3', 'https://example.com/audio/yellow_en.mp3', 'https://example.com/images/yellow.jpg', 'Vàng', 'Yellow', 'Màu vàng', 'The color yellow', 2),
('https://example.com/audio/black_vi.mp3', 'https://example.com/audio/black_en.mp3', 'https://example.com/images/black.jpg', 'Đen', 'Black', 'Màu đen', 'The color black', 2),

-- Số đếm
('https://example.com/audio/one_vi.mp3', 'https://example.com/audio/one_en.mp3', 'https://example.com/images/one.jpg', 'Một', 'One', 'Số 1', 'The number one', 3),
('https://example.com/audio/two_vi.mp3', 'https://example.com/audio/two_en.mp3', 'https://example.com/images/two.jpg', 'Hai', 'Two', 'Số 2', 'The number two', 3),
('https://example.com/audio/three_vi.mp3', 'https://example.com/audio/three_en.mp3', 'https://example.com/images/three.jpg', 'Ba', 'Three', 'Số 3', 'The number three', 3),
('https://example.com/audio/four_vi.mp3', 'https://example.com/audio/four_en.mp3', 'https://example.com/images/four.jpg', 'Bốn', 'Four', 'Số 4', 'The number four', 3),
('https://example.com/audio/five_vi.mp3', 'https://example.com/audio/five_en.mp3', 'https://example.com/images/five.jpg', 'Năm', 'Five', 'Số 5', 'The number five', 3),

-- Động vật
('https://example.com/audio/cat_vi.mp3', 'https://example.com/audio/cat_en.mp3', 'https://example.com/images/cat.jpg', 'Mèo', 'Cat', 'Con mèo', 'A domestic cat', 4),
('https://example.com/audio/dog_vi.mp3', 'https://example.com/audio/dog_en.mp3', 'https://example.com/images/dog.jpg', 'Chó', 'Dog', 'Con chó', 'A domestic dog', 4),
('https://example.com/audio/bird_vi.mp3', 'https://example.com/audio/bird_en.mp3', 'https://example.com/images/bird.jpg', 'Chim', 'Bird', 'Con chim', 'A bird', 4),
('https://example.com/audio/fish_vi.mp3', 'https://example.com/audio/fish_en.mp3', 'https://example.com/images/fish.jpg', 'Cá', 'Fish', 'Con cá', 'A fish', 4),
('https://example.com/audio/rabbit_vi.mp3', 'https://example.com/audio/rabbit_en.mp3', 'https://example.com/images/rabbit.jpg', 'Thỏ', 'Rabbit', 'Con thỏ', 'A rabbit', 4),

-- Thực phẩm
('https://example.com/audio/rice_vi.mp3', 'https://example.com/audio/rice_en.mp3', 'https://example.com/images/rice.jpg', 'Cơm', 'Rice', 'Cơm trắng', 'Cooked rice', 5),
('https://example.com/audio/bread_vi.mp3', 'https://example.com/audio/bread_en.mp3', 'https://example.com/images/bread.jpg', 'Bánh mì', 'Bread', 'Bánh mì', 'Bread', 5),
('https://example.com/audio/egg_vi.mp3', 'https://example.com/audio/egg_en.mp3', 'https://example.com/images/egg.jpg', 'Trứng', 'Egg', 'Quả trứng', 'An egg', 5),
('https://example.com/audio/milk_vi.mp3', 'https://example.com/audio/milk_en.mp3', 'https://example.com/images/milk.jpg', 'Sữa', 'Milk', 'Sữa tươi', 'Milk', 5),
('https://example.com/audio/water_vi.mp3', 'https://example.com/audio/water_en.mp3', 'https://example.com/images/water.jpg', 'Nước', 'Water', 'Nước uống', 'Water', 5);

-- Kiểm tra vocabulaire_questions đã được tạo
SELECT * FROM vocabulaire_questions;

-- =====================================================
-- BƯỚC 5: TẠO USER VOCABULAIRES (Tiến độ học của user)
-- =====================================================
INSERT INTO user_vocabulaire (userId, vocabulaireId, status, percentComplete, vocabulaireQuestionListId) VALUES
(1, 1, 'doing', 60, '[1,2,3,4,5]'),
(1, 2, 'start', 0, '[6,7,8,9,10]'),
(2, 1, 'completed', 100, '[1,2,3,4,5]'),
(2, 3, 'doing', 40, '[11,12,13,14,15]'),
(3, 4, 'start', 0, '[16,17,18,19,20]'),
(4, 5, 'doing', 80, '[21,22,23,24,25]');

-- Kiểm tra user_vocabulaire đã được tạo
SELECT * FROM user_vocabulaire;

-- =====================================================
-- BƯỚC 6: TẠO USER EXAMS (Kết quả bài thi của user)
-- =====================================================
INSERT INTO user_exam (userId, list) VALUES
(1, '[{"questionId": 1, "answer": "Father", "isCorrect": true}, {"questionId": 2, "answer": "Mother", "isCorrect": true}, {"questionId": 3, "answer": "Sister", "isCorrect": true}]'),
(2, '[{"questionId": 1, "answer": "Father", "isCorrect": true}, {"questionId": 2, "answer": "Mother", "isCorrect": true}, {"questionId": 3, "answer": "Brother", "isCorrect": false}]'),
(3, '[{"questionId": 6, "answer": "Red", "isCorrect": true}, {"questionId": 7, "answer": "Blue", "isCorrect": true}, {"questionId": 8, "answer": "Green", "isCorrect": true}]');

-- Kiểm tra user_exam đã được tạo
SELECT * FROM user_exam;

-- =====================================================
-- BƯỚC 7: TẠO EXAM QUESTIONS (Câu hỏi bài thi)
-- =====================================================
INSERT INTO exam_question (vocabulaireQuestionId, answer, isCorrect) VALUES
(1, 'Father', true),
(1, 'Mother', false),
(1, 'Sister', false),
(1, 'Brother', false),
(2, 'Mother', true),
(2, 'Father', false),
(2, 'Sister', false),
(2, 'Brother', false),
(6, 'Red', true),
(6, 'Blue', false),
(6, 'Green', false),
(6, 'Yellow', false),
(7, 'Blue', true),
(7, 'Red', false),
(7, 'Green', false),
(7, 'Yellow', false);

-- Kiểm tra exam_question đã được tạo
SELECT * FROM exam_question;

-- =====================================================
-- KIỂM TRA TỔNG QUAN DỮ LIỆU
-- =====================================================
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