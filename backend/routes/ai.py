from flask import Blueprint, request, jsonify
from transformers import pipeline
from utils.config import HUGGING_FACE_MODEL, MAX_LENGTH, TEMPERATURE

# Initialize the Hugging Face pipeline with GPT-2
try:
    generator = pipeline("text-generation", model=HUGGING_FACE_MODEL, device=0)  # Use GPU if available
except Exception as e:
    raise RuntimeError(f"Error initializing Hugging Face pipeline: {e}")

# Define a Flask Blueprint for AI routes
ai_routes = Blueprint("ai_routes", __name__)

@ai_routes.route('/generate', methods=['POST'])
def generate_content():
    """
    Route to generate portfolio content using GPT-2.
    Accepts a JSON payload with a 'prompt' key.
    """
    data = request.json

    # Check if 'prompt' is provided
    if not data or 'prompt' not in data:
        return jsonify({"error": "Prompt is required"}), 400

    try:
        prompt = data['prompt']

        # Generate text using GPT-2
        result = generator(
            prompt,
            max_length=MAX_LENGTH,
            num_return_sequences=1,
            temperature=TEMPERATURE,
            top_p=0.9,  # Nucleus sampling for diverse outputs
            top_k=50,   # Top-k sampling
            truncation=True
        )

        # Remove the prompt from the generated content to avoid repetition
        generated_content = result[0]['generated_text']
        if generated_content.startswith(prompt):
            generated_content = generated_content[len(prompt):].strip()

        # Validate non-empty content
        if not generated_content:
            return jsonify({"error": "Failed to generate meaningful content"}), 500

        return jsonify({"generated_content": generated_content})

    except Exception as e:
        # Catch any error and return a 500 response
        return jsonify({"error": str(e)}), 500
