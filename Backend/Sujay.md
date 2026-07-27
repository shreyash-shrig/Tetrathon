# Sujay Patel — Backend Developer Tasks (Tasks 31-40)

This documentation outlines the setup, local testing instructions, and endpoint references for the FastAPI backend codebase.

---

## 🛠️ Implemented Architecture & Features

The entire FastAPI service has been built and is modularly organized:

*   **FastAPI Engine Setup** (Task 31): Full middleware stack including CORS configuration (allowing all origins for Vite testing) and request process time logging headers.
*   **JWT Security System** (Task 32): Registration, login token signing using standard HS256 JWT, password hashing via bcrypt, and user retrieval logic (`/auth/me`).
*   **Lesson API** (Task 33): Adaptive lesson generation and dynamic course path suggestions.
*   **Quiz API** (Task 34): Dynamic quiz MCQ generation via Gemini, score evaluation, and progress persistence.
*   **Doubt Resolution** (Task 35): Context-aware tutor chat query answering and common misconception analytics.
*   **Homework solver** (Task 36): Upload endpoint, AI OCR text extraction, and solution generation.
*   **Teacher Cockpit Analytics** (Task 37): Student streaking, class average mastery, and at-risk student intervention recommendations.
*   **Database Synchronization (SQLAlchemy)** (Task 11-13 Integration): ORM class mappings for all 12 system tables. Synchronization happens automatically on app startup, creating and building the SQLite backend if no postgres url is supplied.
*   **Bypassing gRPC cygrpc DLL Block**: Created a custom HTTP request layer utilizing `httpx` to fetch from the Google Gemini API directly, bypassing Windows Application Control native DLL blocking rules.

---

## 🚀 How to Run the Backend Locally

### 1. Install Dependencies
Open your shell inside the `Backend/` directory and execute:
```powershell
python -m venv venv
.\venv\Scripts\python.exe -m pip install -r requirements.txt
```
*(If PowerShell Script Execution is blocked on your system, you can call python using the relative path `.\venv\Scripts\python.exe` directly).*

### 2. Configure Database/AI (Optional)
By default, the backend runs using a local SQLite database (`test.db`) and mock AI responses.

To run with live models, create a `.env` file inside the `Backend/` folder:
```ini
DATABASE_URL=postgresql://postgres:[password]@db.eryveyhefsvpwsdjrsja.supabase.co:5432/postgres
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Start the Server
Run Uvicorn:
```powershell
.\venv\Scripts\python.exe -m uvicorn app.main:app --reload
```

### 4. Open Swagger UI Documentation
Open:
👉 **[http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)** to test the REST endpoints.

---

## 📡 API Directory Guide

All routes are prefixed with `/api` and require a JWT token in the Authorization Header (`Authorization: Bearer <token>`) except for login and signup.

| Category | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Auth** | `POST` | `/api/auth/register` | Register a new student/teacher |
| | `POST` | `/api/auth/login` | Login and return JWT token |
| | `POST` | `/api/auth/logout` | Logout active user session |
| | `GET` | `/api/auth/me` | Fetch active user credentials |
| **Lessons** | `POST` | `/api/lessons/generate` | Generate topic lesson based on difficulty |
| | `GET` | `/api/lessons/history/{id}` | Get lesson history logs |
| | `GET` | `/api/lessons/recommend/{id}` | Fetch recommended learning path paths |
| **Quizzes** | `POST` | `/api/quizzes/generate` | Generate MCQs distractor questions |
| | `GET` | `/api/quizzes/{id}` | Fetch quiz questions |
| | `POST` | `/api/quizzes/submit` | Submit answers and update mastery progress |
| | `GET` | `/api/quizzes/history/{id}` | Fetch quiz attempt scores |
| **AI Tutor** | `POST` | `/api/doubts/ask` | Submit questions to Doubt Resolution Tutor |
| | `GET` | `/api/doubts/history/{id}` | Fetch chat history logs |
| | `GET` | `/api/doubts/analytics` | Get common topics misconception metrics |
| **Homework** | `POST` | `/api/homework/upload` | Upload homework assignment image url |
| | `POST` | `/api/homework/process` | Solve homework question using OCR/AI |
| | `GET` | `/api/homework/history/{id}` | Get previous assignments solutions |
| **Analytics** | `GET` | `/api/analytics/class/{id}` | Fetch overall class statistics (teacher view) |
| | `GET` | `/api/analytics/student/{id}` | Get student overall mastery score charts |
| | `GET` | `/api/analytics/recommendations/{id}` | Get classroom at-risk student insights |
