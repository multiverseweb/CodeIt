from flask import Flask, request, jsonify
from analyze_complexity import analyze_time_complexity  # Import your optimized analysis function

# Initialize Flask app
app = Flask(__name__)

# Define a home route for the root URL
@app.route('/')
def home():
    return "Welcome to the Flask Time Complexity Analyzer!"

# Define a route for time complexity analysis
@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        # Get the JSON data from the request
        data = request.get_json()
        code_snippet = data['code']  # Extract the code from the request body
        
        # Analyze the time complexity
        complexity = analyze_time_complexity(code_snippet)
        
        # Return the result as JSON
        return jsonify({"complexity": complexity})

    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Run the Flask server
if __name__ == '__main__':
    app.run(debug=True)
