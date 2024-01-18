from flask import Flask, jsonify, request
from flask_cors import CORS  # Import the CORS module
from clarifai_grpc.channel.clarifai_channel import ClarifaiChannel
from clarifai_grpc.grpc.api import resources_pb2, service_pb2, service_pb2_grpc
from clarifai_grpc.grpc.api.status import status_code_pb2
import os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes in your Flask app

# Load environment variables from .env file
load_dotenv()

# Access the clarifai_api_key
pat = os.getenv("PAT")
USER_ID = 'openai'
APP_ID = 'chat-completion'
MODEL_ID = 'openai-gpt-4-vision'

# Get the absolute path of the script's directory
script_dir = os.path.dirname(os.path.abspath(__file__))

# Construct the absolute path to the image file
image_file_path = os.path.join(script_dir, "images", "new.jpg")

# Clarifai gRPC channel setup
channel = ClarifaiChannel.get_grpc_channel()
stub = service_pb2_grpc.V2Stub(channel)
metadata = (('authorization', 'Key ' + pat),)
userDataObject = resources_pb2.UserAppIDSet(user_id=USER_ID, app_id=APP_ID)


@app.route('/api/image', methods=['POST'])
def process_image_input():
    data = request.get_json()
    raw_text = data.get('raw_text', '')
    imgurl = data.get('image', '')
    

    with open(image_file_path, "rb") as f:
        file_bytes = f.read()

    post_model_outputs_response = stub.PostModelOutputs(
        service_pb2.PostModelOutputsRequest(
            user_app_id=userDataObject,
            model_id=MODEL_ID,
            inputs=[
                resources_pb2.Input(
                data=resources_pb2.Data(
                    image=resources_pb2.Image(
                        # url=imgurl,
                        base64= imgurl
                    ),
                    text=resources_pb2.Text(
                        raw=raw_text
                        # url=TEXT_FILE_URL
                        # raw=file_bytes
                    )
                )
            
                )
            ]
        ),
        metadata=metadata
    )

    if post_model_outputs_response.status.code != status_code_pb2.SUCCESS:
        return jsonify({'error': f"Post model outputs failed, status: {post_model_outputs_response.status.description}"}), 500

    output = post_model_outputs_response.outputs[0]
    return jsonify({'completion': output.data.text.raw})

if __name__ == '__main__':
    app.run(debug=True)
