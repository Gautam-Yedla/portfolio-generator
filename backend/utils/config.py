import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configuration for AI model and generation settings
HUGGING_FACE_MODEL = os.getenv("HUGGING_FACE_MODEL", "gpt2")  # Use GPT-2 for fast responses
MAX_LENGTH = int(os.getenv("MAX_LENGTH", 100))  # Keep max_length lower for faster output
TEMPERATURE = float(os.getenv("TEMPERATURE", 0.7))  # Moderate temperature for better control

# MongoDB Configuration
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/")
