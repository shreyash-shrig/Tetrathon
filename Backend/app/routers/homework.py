from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.ai_service import AIService
from app.routers.auth import get_current_user
from app.models import User, HomeworkUpload
from app.schemas import HomeworkOut, HomeworkProcessRequest
from typing import List
import datetime

router = APIRouter(prefix="/homework", tags=["Homework Upload & OCR"])

@router.post("/upload", response_model=HomeworkOut)
def upload_homework(image_url: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    hw = HomeworkUpload(
        student_id=current_user.id,
        image_url=image_url,
        status="pending"
    )
    db.add(hw)
    db.commit()
    db.refresh(hw)
    return hw

@router.post("/process", response_model=HomeworkOut)
def process_homework(req: HomeworkProcessRequest, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    extracted_text, feedback = AIService.extract_text_and_solve_homework(req.image_url)
    
    hw = HomeworkUpload(
        student_id=current_user.id,
        image_url=req.image_url,
        extracted_text=extracted_text,
        feedback=feedback,
        status="processed"
    )
    
    db.add(hw)
    db.commit()
    db.refresh(hw)
    return hw

@router.get("/history/{student_id}", response_model=List[HomeworkOut])
def get_homework_history(student_id: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    history = db.query(HomeworkUpload).filter(HomeworkUpload.student_id == student_id).all()
    if not history:
        # Prepopulate mock entry
        hw = HomeworkUpload(
            student_id=student_id,
            image_url="https://example.com/math_hw.jpg",
            extracted_text="Solve: x^2 - 4x + 4 = 0",
            feedback="Using factorization, we find (x-2)^2 = 0, which yields a single double root at x = 2.",
            status="processed"
        )
        db.add(hw)
        db.commit()
        db.refresh(hw)
        history = [hw]
        
    return history

@router.get("/{homework_id}", response_model=HomeworkOut)
def get_homework(homework_id: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    hw = db.query(HomeworkUpload).filter(HomeworkUpload.id == homework_id).first()
    if not hw:
        raise HTTPException(status_code=404, detail="Homework upload not found")
    return hw
