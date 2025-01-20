from flask import Blueprint, request, jsonify
from pymongo import MongoClient
from utils.config import MONGO_URI

database_routes = Blueprint("database_routes", __name__)

# Connect to MongoDB
client = MongoClient(MONGO_URI)
db = client["portfolio_db"]
collection = db["user_edits"]

@database_routes.route('/save', methods=['POST'])
def save_edits():
    """
    Save user edits to MongoDB. Avoids duplicate entries.
    """
    data = request.json
    if not data:
        return jsonify({"error": "No data provided"}), 400

    required_fields = ["section", "content"]
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        return jsonify({"error": f"Missing fields: {', '.join(missing_fields)}"}), 400

    try:
        # Update if section exists; insert otherwise
        collection.update_one(
            {"section": data["section"]},
            {"$set": {"content": data["content"]}},
            upsert=True
        )
        return jsonify({"message": "Edits saved successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@database_routes.route('/fetch', methods=['GET'])
def fetch_edits():
    """
    Fetch all user edits from MongoDB.
    """
    try:
        edits = list(collection.find({}, {"_id": 0}))  # Exclude MongoDB `_id` field
        return jsonify({"edits": edits})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
