import os
import tempfile
import shutil
from flask import Blueprint, request, jsonify

file_routes = Blueprint("file_routes", __name__)

@file_routes.route('/upload', methods=['POST'])
def upload_file():
    """
    Handle file uploads and store them temporarily.
    """
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    allowed_extensions = {'pdf', 'docx'}
    if file.filename.split('.')[-1].lower() not in allowed_extensions:
        return jsonify({"error": "Unsupported file type"}), 400

    try:
        # Save file temporarily
        temp_dir = tempfile.mkdtemp()
        file_path = os.path.join(temp_dir, file.filename)
        file.save(file_path)

        # Perform cleanup after processing (optional)
        shutil.rmtree(temp_dir)

        return jsonify({"message": "File uploaded successfully", "file_path": file_path})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
