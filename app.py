from flask import Flask, request, jsonify
from googlesearch import search
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/search')
def google_search():
    query = request.args.get('q')
    if not query:
        return jsonify({"error": "Missing query"}), 400

    results = []
    try:
        for i, url in enumerate(search(query, num_results=10)):
            results.append({
                "title": f"Výsledok {i + 1}",
                "url": url
            })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    return jsonify(results)

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 8000)) 
    app.run(host='0.0.0.0', port=port)
