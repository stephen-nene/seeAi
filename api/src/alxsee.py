from flask import Flask, request, jsonify
from flask_cors import CORS
from clarifai.client.model import Model
import base64
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

PAT = os.getenv('PAT')
MODEL_URL = os.getenv('MODEL_URL')

model = Model(url=MODEL_URL, pat=PAT)

@app.route('/api/image', methods=['POST'])
def process_image():
    try:
        data = request.get_json()
        base64_image = data.get('base64_image')

        if not base64_image:
            return jsonify({"error": "No base64 image provided."}), 400

        try:
            image_bytes = base64.b64decode(base64_image, validate=True)
        except (base64.binascii.Error, TypeError) as e:
            return jsonify({"error": "Invalid base64 encoding."}), 400

        model_prediction = model.predict_by_bytes(image_bytes, input_type="image")
        output_text = model_prediction.outputs[0].data.text.raw

        return jsonify({"output": output_text})

    except Exception as e:
        print("Error processing image:", e)
        return jsonify({"error": "Something went wrong processing the image."}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
