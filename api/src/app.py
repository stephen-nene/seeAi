
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Access the clarifai_api_key
model_version_id = os.getenv("MODEL_VERSION_ID")
pat = os.getenv("PAT")

######################################################################################################
# In this section, we set the user authentication, user and app ID, model details, and the URL of 
# the text we want as an input. Change these strings to run your own example.
######################################################################################################

# Your PAT (Personal Access Token) can be found in the portal under Authentification

# Specify the correct user_id/app_id pairings
# Since you're making inferences outside your app's scope
USER_ID = 'openai'
APP_ID = 'chat-completion'
# Change these to whatever model and text URL you want to use
MODEL_ID = 'general-image-recognition'
RAW_TEXT = 'explain to me like a child difference bnetween supercharger and turbo charger?'
# To use a hosted text file, assign the url variable
# TEXT_FILE_URL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Sam_Altman_CropEdit_James_Tamim.jpg/220px-Sam_Altman_CropEdit_James_Tamim.jpg'
TEXT_FILE_URL = "https://samples.clarifai.com/metro-north.jpg"
# Or, to use a local text file, assign the url variable
# TEXT_FILE_LOCATION = 'YOUR_TEXT_FILE_LOCATION_HERE'


############################################################################
# YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
############################################################################

from clarifai_grpc.channel.clarifai_channel import ClarifaiChannel
from clarifai_grpc.grpc.api import resources_pb2, service_pb2, service_pb2_grpc
from clarifai_grpc.grpc.api.status import status_code_pb2

channel = ClarifaiChannel.get_grpc_channel()
stub = service_pb2_grpc.V2Stub(channel)

metadata = (('authorization', 'Key ' + pat),)

userDataObject = resources_pb2.UserAppIDSet(user_id=USER_ID, app_id=APP_ID)

# Get the absolute path of the script's directory
script_dir = os.path.dirname(os.path.abspath(__file__))

# Construct the absolute path to the image file
image_file_path = os.path.join(script_dir, "images", "newer.jpg")

# To use a local text file, uncomment the following lines
with open(image_file_path, "rb") as f:
   file_bytes = f.read()

post_model_outputs_response = stub.PostModelOutputs(
    service_pb2.PostModelOutputsRequest(
        user_app_id=userDataObject,  # The userDataObject is created in the overview and is required when using a PAT
        model_id=MODEL_ID,
        # version_id=model_version_id,  # This is optional. Defaults to the latest model version
        inputs=[
            resources_pb2.Input(
                data=resources_pb2.Data(
                    image=resources_pb2.Image(
                        url=TEXT_FILE_URL,
                        # base64= file_bytes
                    ),
                    # text=resources_pb2.Text(
                    #     raw=RAW_TEXT,
                    #     # raw=file_bytes
                    # )
                )
            )
        ]
    ),
    metadata=metadata
)
if post_model_outputs_response.status.code != status_code_pb2.SUCCESS:
    print(post_model_outputs_response.status)
    raise Exception(f"Post model outputs failed, status: {post_model_outputs_response.status}")

# Since we have one input, one output will exist here
output = post_model_outputs_response.outputs[0]

print("Completion:\n")
print(output.data.text.raw)