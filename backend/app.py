from flask import Flask, jsonify  # Import Flask framework and jsonify for JSON responses
from scraper import scrape_news   # Import the scrape_news function from scraper.py
from flask_cors import CORS       # Import CORS to handle Cross-Origin Resource Sharing

app = Flask(__name__)             # Create a Flask web application instance
CORS(app, resources={r"/*": {"origins": "*"}})  # Enable CORS for all routes and origins

@app.route("/scrape", methods=["GET"])  # Define a route for GET requests at /scrape
def get_data():
    data = scrape_news()                # Call the scrape_news function to get news headlines
    return jsonify({"headlines": data}) # Return the headlines as a JSON response

if __name__ == "__main__":              # Run the app only if this file is executed directly
    app.run(debug=True, port=5000)      # Start the Flask server in debug mode on port 5000