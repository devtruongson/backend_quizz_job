-- =====================================================
-- XÓA DỮ LIỆU CŨ VÀ RESET DATABASE
-- Chạy file này nếu muốn xóa hết dữ liệu cũ
-- =====================================================

-- Tắt foreign key checks tạm thời
SET FOREIGN_KEY_CHECKS = 0;

-- Xóa dữ liệu theo thứ tự ngược lại (từ bảng con đến bảng cha)
DELETE FROM exam_question;
DELETE FROM user_exam;
DELETE FROM user_vocabulaire;
DELETE FROM vocabulaire_questions;
DELETE FROM vocabulaire;
DELETE FROM topics;
DELETE FROM users;

-- Reset auto increment
ALTER TABLE exam_question AUTO_INCREMENT = 1;
ALTER TABLE user_exam AUTO_INCREMENT = 1;
ALTER TABLE user_vocabulaire AUTO_INCREMENT = 1;
ALTER TABLE vocabulaire_questions AUTO_INCREMENT = 1;
ALTER TABLE vocabulaire AUTO_INCREMENT = 1;
ALTER TABLE topics AUTO_INCREMENT = 1;
ALTER TABLE users AUTO_INCREMENT = 1;

-- Bật lại foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

-- Kiểm tra các bảng đã trống
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