from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.ai_service import AIService
from app.routers.auth import get_current_user
from app.models import User, Concept, Topic, Lesson
from app.schemas import LessonGenerateRequest, LessonOut
from typing import List
import datetime

router = APIRouter(prefix="/lessons", tags=["Lessons"])

@router.post("/generate", response_model=LessonOut)
def generate_lesson(req: LessonGenerateRequest, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    concept = db.query(Concept).filter(Concept.id == req.concept_id).first()
    if not concept:
        concept = Concept(id=req.concept_id, name="Linear Algebra Fundamentals", subject="Math")
        db.add(concept)
        db.commit()
        db.refresh(concept)
        
    topic = db.query(Topic).filter(Topic.concept_id == req.concept_id).first()
    if not topic:
        topic = Topic(concept_id=req.concept_id, name=concept.name, summary=f"Lessons for {concept.name}")
        db.add(topic)
        db.commit()
        db.refresh(topic)

    student_context = f"Student Name: {current_user.name}"
    content = AIService.generate_lesson(topic.name, req.difficulty_level, student_context)
    
    lesson = Lesson(
        topic_id=topic.id,
        content=content,
        difficulty_level=req.difficulty_level
    )
    
    db.add(lesson)
    db.commit()
    db.refresh(lesson)
    return lesson

@router.get("/history/{student_id}", response_model=List[LessonOut])
def get_lesson_history(student_id: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    lessons = db.query(Lesson).limit(10).all()
    
    # If no lessons exist in the database, prepopulate a mock lesson so the frontend has data to fetch
    if not lessons:
        concept = db.query(Concept).first()
        if not concept:
            concept = Concept(name="Deep Learning Foundations", subject="AI")
            db.add(concept)
            db.commit()
            
        topic = db.query(Topic).filter(Topic.concept_id == concept.id).first()
        if not topic:
            topic = Topic(concept_id=concept.id, name="Gradient Descent Optimization", summary="Optimizations")
            db.add(topic)
            db.commit()
            
        lesson = Lesson(
            topic_id=topic.id,
            content="Micro-lesson on Gradient Descent: How weights change in direction of steepest descent.",
            difficulty_level="medium"
        )
        db.add(lesson)
        db.commit()
        lessons = [lesson]

    return lessons

@router.get("/recommend/{student_id}", response_model=List[LessonOut])
def recommend_lessons(student_id: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    # Core recommendation engine (Task 9)
    # Pull current lesson history to recommend new lesson
    lessons = db.query(Lesson).limit(2).all()
    if not lessons:
        return get_lesson_history(student_id, current_user, db)
    return lessons

@router.get("/{student_id}", response_model=List[LessonOut])
def get_current_lessons(student_id: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return get_lesson_history(student_id, current_user, db)
