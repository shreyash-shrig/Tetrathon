from sqlalchemy import Column, String, Float, DateTime, ForeignKey, Table, JSON, Integer
from sqlalchemy.orm import relationship
from app.database import Base
import datetime
import uuid

# Helper association table for Teacher to Classes (M:M)
teacher_classes = Table(
    'teacher_classes',
    Base.metadata,
    Column('teacher_id', String, ForeignKey('users.id', ondelete="CASCADE"), primary_key=True),
    Column('class_id', String, ForeignKey('classes.id', ondelete="CASCADE"), primary_key=True)
)

# Helper association table for Concept dependencies (M:M)
concept_dependencies = Table(
    'concept_dependencies',
    Base.metadata,
    Column('concept_id', String, ForeignKey('concepts.id', ondelete="CASCADE"), primary_key=True),
    Column('prerequisite_id', String, ForeignKey('concepts.id', ondelete="CASCADE"), primary_key=True)
)

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    name = Column(String, nullable=False)
    role = Column(String, nullable=False)  # 'student' or 'teacher'
    class_id = Column(String, ForeignKey('classes.id', ondelete="SET NULL"), nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    class_group = relationship("Class", back_populates="students", foreign_keys=[class_id])
    quiz_attempts = relationship("QuizAttempt", back_populates="student")
    progress_records = relationship("StudentProgress", back_populates="student")
    doubt_queries = relationship("DoubtQuery", back_populates="student")
    homework_uploads = relationship("HomeworkUpload", back_populates="student")


class Class(Base):
    __tablename__ = "classes"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False)
    grade = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    students = relationship("User", back_populates="class_group", foreign_keys=[User.class_id])
    teachers = relationship("User", secondary=teacher_classes, backref="managed_classes")


class Concept(Base):
    __tablename__ = "concepts"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False)
    description = Column(String, nullable=True)
    subject = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    topics = relationship("Topic", back_populates="concept")
    prerequisites = relationship(
        "Concept",
        secondary=concept_dependencies,
        primaryjoin=(id == concept_dependencies.c.concept_id),
        secondaryjoin=(id == concept_dependencies.c.prerequisite_id),
        backref="dependent_concepts"
    )


class Topic(Base):
    __tablename__ = "topics"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    concept_id = Column(String, ForeignKey('concepts.id', ondelete="CASCADE"), nullable=False)
    name = Column(String, nullable=False)
    summary = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    concept = relationship("Concept", back_populates="topics")
    lessons = relationship("Lesson", back_populates="topics")
    quizzes = relationship("Quiz", back_populates="topic")


class Lesson(Base):
    __tablename__ = "lessons"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    topic_id = Column(String, ForeignKey('topics.id', ondelete="CASCADE"), nullable=False)
    content = Column(String, nullable=False)
    difficulty_level = Column(String, nullable=False)  # 'easy', 'medium', 'hard'
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    topics = relationship("Topic", back_populates="lessons")


class Quiz(Base):
    __tablename__ = "quizzes"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    topic_id = Column(String, ForeignKey('topics.id', ondelete="CASCADE"), nullable=False)
    title = Column(String, nullable=False)
    questions = Column(JSON, nullable=False)  # Stores questions structure
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    topic = relationship("Topic", back_populates="quizzes")
    attempts = relationship("QuizAttempt", back_populates="quiz")


class QuizAttempt(Base):
    __tablename__ = "quiz_attempts"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    student_id = Column(String, ForeignKey('users.id', ondelete="CASCADE"), nullable=False)
    quiz_id = Column(String, ForeignKey('quizzes.id', ondelete="CASCADE"), nullable=False)
    score = Column(Float, nullable=False)
    answers_submitted = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    student = relationship("User", back_populates="quiz_attempts")
    quiz = relationship("Quiz", back_populates="attempts")


class StudentProgress(Base):
    __tablename__ = "student_progress"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    student_id = Column(String, ForeignKey('users.id', ondelete="CASCADE"), nullable=False)
    concept_id = Column(String, ForeignKey('concepts.id', ondelete="CASCADE"), nullable=False)
    mastery_score = Column(Float, default=0.0)
    last_active = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    student = relationship("User", back_populates="progress_records")
    concept = relationship("Concept")


class DoubtQuery(Base):
    __tablename__ = "doubt_queries"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    student_id = Column(String, ForeignKey('users.id', ondelete="CASCADE"), nullable=False)
    topic_id = Column(String, ForeignKey('topics.id', ondelete="SET NULL"), nullable=True)
    query = Column(String, nullable=False)
    ai_response = Column(String, nullable=False)
    is_resolved = Column(String, default="true")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    student = relationship("User", back_populates="doubt_queries")
    topic = relationship("Topic")


class HomeworkUpload(Base):
    __tablename__ = "homework_uploads"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    student_id = Column(String, ForeignKey('users.id', ondelete="CASCADE"), nullable=False)
    image_url = Column(String, nullable=False)
    extracted_text = Column(String, nullable=True)
    feedback = Column(String, nullable=True)
    status = Column(String, default="pending")  # 'pending', 'processed', 'failed'
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    student = relationship("User", back_populates="homework_uploads")
