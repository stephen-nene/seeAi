from clarifai_grpc.channel.clarifai_channel import ClarifaiChannel
from clarifai_grpc.grpc.api import service_pb2_grpc

from clarifai_grpc.grpc.api import service_pb2, resources_pb2
from clarifai_grpc.grpc.api.status import status_code_pb2

import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Access the clarifai_api_key
pat = os.getenv("CLARIFAI_API_KEY")

stub = service_pb2_grpc.V2Stub(ClarifaiChannel.get_grpc_channel())

YOUR_APPLICATION_ID = "seeai"
SAMPLE_URL = "https://samples.clarifai.com/metro-north.jpg"

# This is how you authenticate.
metadata = (("authorization", f"Key {pat}"),)


# Get the absolute path of the script's directory
script_dir = os.path.dirname(os.path.abspath(__file__))

# Construct the absolute path to the image file
image_file_path = os.path.join(script_dir, "images", "test.webp")

# To use a local text file, uncomment the following lines
with open(image_file_path, "rb") as f:
   file_bytes = f.read()


request = service_pb2.PostModelOutputsRequest(
    # This is the model ID of a publicly available General model. You may use any other public or custom model ID.
    model_id="general-image-recognition",
    user_app_id=resources_pb2.UserAppIDSet(app_id=YOUR_APPLICATION_ID),
    inputs=[
        resources_pb2.Input(
            data=resources_pb2.Data(image=resources_pb2.Image(
                base64=file_bytes,
                # url=SAMPLE_URL
                ))
        )
    ],
)
response = stub.PostModelOutputs(request, metadata=metadata)

if response.status.code != status_code_pb2.SUCCESS:
    print(response)
    raise Exception(f"Request failed, status code: {response.status}")

for concept in response.outputs[0].data.concepts:
    print("%12s: %.2f" % (concept.name, concept.value))