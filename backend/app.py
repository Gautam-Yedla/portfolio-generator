from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend-backend communication

# Register routes from the routes folder
from routes.ai import ai_routes
from routes.file import file_routes
from routes.database import database_routes

app.register_blueprint(ai_routes, url_prefix="/ai")
app.register_blueprint(file_routes, url_prefix="/file")
app.register_blueprint(database_routes, url_prefix="/database")

@app.route('/')
def home():
    return jsonify({"message": "Backend is running!"})

if __name__ == '__main__':
    app.run(debug=True)
