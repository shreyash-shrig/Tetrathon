# Database Documentation

## Project

Adaptive Microlearning Engine & AI Doubt Resolution Tutor

---

## Database Purpose

This database stores all information related to students, teachers, classes, learning concepts, quizzes, homework, progress tracking, and AI-powered doubt resolution.

---

## Tables

### 1. users

Stores student and teacher accounts.

---

### 2. teacher_classes

Maps teachers to the classes they manage.

---

### 3. classes

Stores class information.

---

### 4. concepts

Stores learning concepts.

---

### 5. concept_dependencies

Stores prerequisite relationships between concepts.

---

### 6. topics

Stores topics inside each concept.

---

### 7. lessons

Stores lesson content.

---

### 8. quizzes

Stores quiz information.

---

### 9. quiz_attempts

Stores student quiz results.

---

### 10. homework_uploads

Stores uploaded homework.

---

### 11. student_progress

Tracks student learning progress.

---

### 12. doubt_queries

Stores AI doubt resolution questions and responses.

---

## Relationships

Teacher
↓

Teacher Classes
↓

Classes
↓

Concepts
↓

Topics
↓

Lessons
↓

Quizzes
↓

Quiz Attempts

Students

↓

Homework Uploads

↓

Student Progress

↓

Doubt Queries