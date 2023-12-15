
# ######################################################################################################
# # In this section, we set the user authentication, user and app ID, model details, and the URL of 
# # the text we want as an input. Change these strings to run your own example.
# ######################################################################################################

# # Your PAT (Personal Access Token) can be found in the portal under Authentification
# PAT = '0b875c04e200473d8c3057797c8b72fb'
# # Specify the correct user_id/app_id pairings
# # Since you're making inferences outside your app's scope
# USER_ID = 'openai'
# APP_ID = 'chat-completion'
# # Change these to whatever model and text URL you want to use
# MODEL_ID = 'gpt-4-vision-alternative'
# MODEL_VERSION_ID = '12b67ac2b5894fb9af9c06ebf8dc02fb'
# RAW_TEXT = 'the fastes electric car?'
# # To use a hosted text file, assign the url variable
# TEXT_FILE_URL = '../test.webp'
# # Or, to use a local text file, assign the url variable
# # TEXT_FILE_LOCATION = 'YOUR_TEXT_FILE_LOCATION_HERE'
# image_file_path = "../test.webp"

# ############################################################################
# # YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
# ############################################################################

# from clarifai_grpc.channel.clarifai_channel import ClarifaiChannel
# from clarifai_grpc.grpc.api import resources_pb2, service_pb2, service_pb2_grpc
# from clarifai_grpc.grpc.api.status import status_code_pb2

# channel = ClarifaiChannel.get_grpc_channel()
# stub = service_pb2_grpc.V2Stub(channel)

# metadata = (('authorization', 'Key ' + PAT),)

# userDataObject = resources_pb2.UserAppIDSet(user_id=USER_ID, app_id=APP_ID)

# # To use a local text file, uncomment the following lines
# # with open(TEXT_FILE_LOCATION, "rb") as f:
# #    file_bytes = f.read()

# post_model_outputs_response = stub.PostModelOutputs(
#     service_pb2.PostModelOutputsRequest(
#         user_app_id=userDataObject,  # The userDataObject is created in the overview and is required when using a PAT
#         model_id=MODEL_ID,
#         version_id=MODEL_VERSION_ID,  # This is optional. Defaults to the latest model version
#         inputs=[
#             resources_pb2.Input(
#                 data=resources_pb2.Data(
#                     # image=resources_pb2.Image(
#                     #     url=TEXT_FILE_URL,
#                     #     # base64=image_file_path
#                     # ),
#                     text=resources_pb2.Text(
#                         # url=TEXT_FILE_URL,
#                         raw=RAW_TEXT
#                         # raw=file_bytes
#                     )
#                 )
#             )
#         ]
#     ),
#     metadata=metadata
# )
# if post_model_outputs_response.status.code != status_code_pb2.SUCCESS:
#     print(post_model_outputs_response.status)
#     raise Exception(f"Post model outputs failed, status: {post_model_outputs_response.status}")

# # Since we have one input, one output will exist here
# output = post_model_outputs_response.outputs[0]

# print("Completion:\n")
# print(output.data.text.raw)



from clarifai.client.model import Model

prompt = "What’s in this image?"

image_url = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg"

openai_api_key = "0b875c04e200473d8c3057797c8b72fb"

inference_params = dict(temperature=0.2, max_tokens=100, image_url=image_url, api_key = openai_api_key)

# Model Predict
model_prediction = Model("https://clarifai.com/openai/chat-completion/models/gpt-4-vision").predict_by_bytes(prompt.encode(), input_type="text", inference_params=inference_params)
print(model_prediction.outputs[0].data.text.raw)
