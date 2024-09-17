from flask import Flask, request, jsonify
from flask_cors import CORS
from clarifai.client.model import Model
import base64
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Flask app and enable CORS for all API routes
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Fetch Clarifai credentials from environment variables
PAT = os.getenv('PAT')
MODEL_URL = os.getenv('MODEL_URL')

# Initialize the model using credentials
model = Model(url=MODEL_URL, pat=PAT)

@app.route('/api/image', methods=['POST'])
def process_image():
    """
    Process an image by decoding the base64 input, sending it for model prediction,
    and returning the output text.
    """
    try:
        # Extract base64 image data from the request body
        data = request.get_json()
        base64_image = data.get('base64_image')

        if not base64_image:
            return jsonify({"error": "No base64 image provided."}), 400

        # Decode the base64-encoded image
        try:
            image_bytes = base64.b64decode(base64_image, validate=True)
        except (base64.binascii.Error, TypeError):
            return jsonify({"error": "Invalid base64 encoding."}), 400

        # Predict using the model
        model_prediction = model.predict_by_bytes(image_bytes, input_type="image")
        output_text = model_prediction.outputs[0].data.text.raw

        return jsonify({"output": output_text})

    except Exception as e:
        # Log the error and return a general error response
        print(f"Error processing image: {e}")
        return jsonify({"error": "Something went wrong processing the image."}), 500


if __name__ == '__main__':
    # Ensure debug mode is disabled in production environments
    app.run(host='0.0.0.0', port=8000, debug=False)
