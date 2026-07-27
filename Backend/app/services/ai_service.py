import json
import httpx
from app.config import settings
from typing import List, Dict, Any, Tuple

# Verify if API key is provided
gemini_enabled = bool(settings.GEMINI_API_KEY)

class AIService:
    @staticmethod
    def _call_gemini_api(prompt: str) -> str:
        if not settings.GEMINI_API_KEY:
            raise ValueError("Gemini API key is not configured.")
            
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={settings.GEMINI_API_KEY}"
        headers = {"Content-Type": "application/json"}
        payload = {
            "contents": [
                {
                    "parts": [
                        {"text": prompt}
                    ]
                }
            ]
        }
        
        try:
            # Sync HTTP request using httpx
            with httpx.Client(timeout=30.0) as client:
                response = client.post(url, headers=headers, json=payload)
                if response.status_code == 200:
                    data = response.json()
                    candidates = data.get("candidates", [])
                    if candidates:
                        parts = candidates[0].get("content", {}).get("parts", [])
                        if parts:
                            return parts[0].get("text", "")
                    raise ValueError(f"Unexpected response structure: {data}")
                else:
                    raise ValueError(f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            print(f"Gemini HTTP API call failed: {e}")
            raise e

    @staticmethod
    def generate_lesson(topic_name: str, difficulty: str, student_context: str = "") -> str:
        if not gemini_enabled:
            return AIService._get_mock_lesson(topic_name, difficulty)
        
        prompt = f"""
        Role: Expert Educator
        Context: Student Level {difficulty}, Topic: {topic_name}. Previous context: {student_context}
        Task: Generate 5-minute micro-lesson.
        Constraints:
        - No markdown headers (use simple text spacing)
        - Include a real-world example
        - End with a knowledge check question
        - Maximum 500 words
        """
        try:
            return AIService._call_gemini_api(prompt)
        except Exception as e:
            print(f"Gemini API failure, falling back to mock: {e}")
            return AIService._get_mock_lesson(topic_name, difficulty)

    @staticmethod
    def generate_quiz_questions(topic_name: str, difficulty: str) -> List[Dict[str, Any]]:
        if not gemini_enabled:
            return AIService._get_mock_quiz(topic_name, difficulty)

        prompt = f"""
        Generate 3 multiple choice questions for the topic: {topic_name}.
        Difficulty level: {difficulty}.
        
        You must return a valid JSON array of objects. Do not wrap in markdown json codeblocks or backticks.
        Each object in the array must match this schema:
        {{
            "question": "question text",
            "options": ["option A", "option B", "option C", "option D"],
            "correct_option": 0, // index of correct option (0 to 3)
            "explanation": "explanation of why it is correct"
        }}
        """
        try:
            response_text = AIService._call_gemini_api(prompt)
            text = response_text.strip()
            # Remove any markdown wrapping if present
            if text.startswith("```json"):
                text = text[7:]
            elif text.startswith("```"):
                text = text[3:]
            if text.endswith("```"):
                text = text[:-3]
            text = text.strip()
            return json.loads(text)
        except Exception as e:
            print(f"Gemini API failure for quiz, falling back to mock: {e}")
            return AIService._get_mock_quiz(topic_name, difficulty)

    @staticmethod
    def resolve_doubt(query: str, topic_context: str = "") -> str:
        if not gemini_enabled:
            return AIService._get_mock_doubt_resolution(query)

        prompt = f"""
        Context: {topic_context}
        Question: {query}
        Task: Answer in a friendly teacher-like tone. Include:
        1. Direct Answer
        2. Step-by-Step Explanation
        3. Related Concept
        4. Follow-up Suggestion
        """
        try:
            return AIService._call_gemini_api(prompt)
        except Exception as e:
            print(f"Gemini API failure for doubt, falling back to mock: {e}")
            return AIService._get_mock_doubt_resolution(query)

    @staticmethod
    def extract_text_and_solve_homework(image_url: str) -> Tuple[str, str]:
        # Direct fallback solver or prompt
        if not gemini_enabled:
            return "Find the derivative of f(x) = 3x^2 + 5x - 2 at x=2", "The derivative is f'(x) = 6x + 5. At x=2, f'(2) = 6(2) + 5 = 17."

        prompt = f"Please analyze this homework image URL: {image_url}. Extract the text of the math problem, and write down the step-by-step solution."
        try:
            text = AIService._call_gemini_api(prompt)
            return f"Problem from image: {image_url}", text
        except Exception as e:
            print(f"Gemini multimodal failed, falling back: {e}")
            return "Find the value of x: 2x + 10 = 20", "Subtract 10: 2x = 10. Divide by 2: x = 5."

    # Mock Data Methods
    @staticmethod
    def _get_mock_lesson(topic: str, difficulty: str) -> str:
        return f"""Topic: {topic} ({difficulty.capitalize()} Level)

Welcome to today's micro-lesson on {topic}. Let's dive in!

Concept Explanation:
{topic} is an essential concept. Understanding how it operates is foundational for applying it in solving problems. 

Real-World Example:
Imagine driving a car down a road. The velocity of the car changes over time. That rate of change is a prime example of the mathematical principles that define {topic} in practice.

Knowledge Check:
What is the primary rate of change or value that we track when working with {topic}?
"""

    @staticmethod
    def _get_mock_quiz(topic: str, difficulty: str) -> List[Dict[str, Any]]:
        return [
            {
                "question": f"Which of the following best defines the core concept of {topic}?",
                "options": [
                    "A static constant value.",
                    "The rate at which a quantity changes.",
                    "A geometric shape.",
                    "An error code."
                ],
                "correct_option": 1,
                "explanation": f"The core of {topic} revolves around tracking changes and dynamic transitions."
            },
            {
                "question": f"Under what difficulty level is this quiz generated?",
                "options": [
                    "Beginner",
                    "Easy",
                    "Medium",
                    "Hard"
                ],
                "correct_option": 2 if difficulty.lower() == "medium" else (0 if difficulty.lower() == "easy" else 3),
                "explanation": f"The quiz was generated for {difficulty} level."
            },
            {
                "question": "What is the next topic to study after mastering this?",
                "options": [
                    "Backpropagation & Optimization",
                    "Basic Arithmetic",
                    "Introduction to Programming",
                    "History of Science"
                ],
                "correct_option": 0,
                "explanation": "Advanced concepts build directly on top of base mathematical models."
            }
        ]

    @staticmethod
    def _get_mock_doubt_resolution(query: str) -> str:
        return f"""AI Tutor Response:

1. Direct Answer:
You asked about: "{query}". In simple terms, this represents a crucial relationship in our current topic block.

2. Step-by-Step Explanation:
- Step 1: Write down the given expression or query terms.
- Step 2: Simplfy relationships by isolating variables.
- Step 3: Match the simplified terms to base rules.

3. Related Concept:
This is closely connected to concepts of gradient descent and computational graphs.

4. Follow-up Suggestion:
Would you like to try a sample quiz question to test this concept?
"""
