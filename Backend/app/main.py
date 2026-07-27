from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.database import engine, Base
import app.models  # Ensures models are loaded before metadata bind
from app.routers import auth, lessons, quizzes, doubts, homework, analytics
import time

# Automatically create all SQL tables (Task 13 SQL Table Creation equivalent)
try:
    Base.metadata.create_all(bind=engine)
    print("Database tables synchronized successfully.")
except Exception as e:
    print(f"Error synchronizing database tables: {e}")

app = FastAPI(
    title="AdaptLearn API",
    description="Adaptive Microlearning Engine & AI Doubt Resolution Tutor API service.",
    version="1.0.0"
)

# Configure CORS for Frontend React access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For hackathon/dev allow all; restrict in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(auth.router, prefix="/api")
app.include_router(lessons.router, prefix="/api")
app.include_router(quizzes.router, prefix="/api")
app.include_router(doubts.router, prefix="/api")
app.include_router(homework.router, prefix="/api")
app.include_router(analytics.router, prefix="/api")

# Add standard Middleware (e.g., execution logger)
@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response

# Global Exception Handlers (Task 39)
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": "An internal server error occurred.", "error": str(exc)},
    )

@app.get("/")
def read_root():
    return {
        "message": "Welcome to AdaptLearn API. Visit /docs or /redoc for Swagger API documentation.",
        "status": "healthy"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}
