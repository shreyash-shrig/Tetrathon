from pydantic import BaseModel, EmailStr, Field
from typing import List, Dict, Any, Optional
from datetime import datetime

class UserRegister(BaseModel):
    email: EmailStr
    password: str
    name: str
    role: str = Field(..., pattern="^(student|teacher)$")
    class_id: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: str
    name: str
    user_id: str

class UserOut(BaseModel):
    id: str
    email: EmailStr
    name: str
    role: str
    class_id: Optional[str] = None
    created_at: Optional[datetime] = None

class LessonGenerateRequest(BaseModel):
    concept_id: str
    difficulty_level: str = "medium"

class LessonOut(BaseModel):
    id: str
    topic_id: str
    content: str
    difficulty_level: str
    created_at: datetime

class MCQQuestion(BaseModel):
    question: str
    options: List[str]
    correct_option: int  # 0-indexed index of options
    explanation: str

class QuizOut(BaseModel):
    id: str
    topic_id: str
    title: str
    questions: List[MCQQuestion]
    created_at: datetime

class QuizSubmitRequest(BaseModel):
    quiz_id: str
    answers_submitted: List[int]

class QuizAttemptOut(BaseModel):
    id: str
    student_id: str
    quiz_id: str
    score: float
    answers_submitted: List[int]
    created_at: datetime

class DoubtAskRequest(BaseModel):
    topic_id: Optional[str] = None
    query: str

class DoubtOut(BaseModel):
    id: str
    student_id: str
    topic_id: Optional[str] = None
    query: str
    ai_response: str
    created_at: datetime

class HomeworkProcessRequest(BaseModel):
    image_url: str

class HomeworkOut(BaseModel):
    id: str
    student_id: str
    image_url: str
    extracted_text: Optional[str] = None
    feedback: Optional[str] = None
    status: str
    created_at: datetime
