# src/app.py
from flask import Flask, request, jsonify
from clarifai.rest import ClarifaiApp
import requests

app = Flask(__name__)

# Replace with your Clarifai API Key
clarifai_api_key = "YOUR_CLARIFAI_API_KEY"

@app.route('/process_data', methods=['POST'])
def process_data():
    try:
        data = request.get_json()

        # Extract image and textareaValue from the request
        image = data.get('image')
        textarea_value = data.get('textareaValue')

        # Perform processing with Clarifai API
        clarifai_response = process_with_clarifai(image, textarea_value)

        # Log the data (You can replace this with your preferred logging method)
        print(f"Image: {image}")
        print(f"Textarea: {textarea_value}")

        return jsonify({'success': True, 'clarifaiResponse': clarifai_response})
    except Exception as e:
        print(f"Error processing data: {e}")
        return jsonify({'success': False, 'error': str(e)})

def process_with_clarifai(image, prompt):
    try:
        # Initialize Clarifai App
        app = ClarifaiApp(api_key=clarifai_api_key)

        # Get the GPT-4 Vision model
        model = app.public_models.gpt4.vision

        # Provide image URL and prompt
        response = model.predict_by_url(image, prompt=prompt)

        # Extract and return relevant information from the response
        return {
            'raw_response': response,
            'predicted_text': response['outputs'][0]['data']['text']['raw']
        }
    except Exception as e:
        return {'error': str(e)}

if __name__ == '__main__':
    app.run(debug=True)
