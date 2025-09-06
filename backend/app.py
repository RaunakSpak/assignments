from flask import Flask, jsonify
from scraper import scrape_news
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route("/scrape", methods=["GET"])
def get_data():
    data = scrape_news()
    return jsonify({"headlines": data})

if __name__ == "__main__":
    app.run(debug=True, port=5000)