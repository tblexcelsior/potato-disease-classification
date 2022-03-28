from ast import Bytes
import json
from urllib import response
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf
import requests

app = FastAPI()

endpoint = "http://localhost:8501/v1/models/potato_classification:predict"

origins = [
    "http://localhost",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

CLASS_NAMES = ['Early Blight', 'Late Blight', 'Healthy']

def read_image_as_array(file) -> np.ndarray:
    image = np.array(Image.open(BytesIO(file)))
    return image
@app.post('/predict')
async def predict(
    file: UploadFile = File(...)
):
    image = read_image_as_array(await file.read())
    img_batch = np.expand_dims(image, 0)

    json_data = {
        'instances': img_batch.tolist()
    }

    response = requests.post(endpoint, json=json_data)
    
    prediction = np.array(response.json()["predictions"][0])
    confidence = np.max(prediction)
    prediction_class = CLASS_NAMES[np.argmax(prediction)]
    return {
        "class": prediction_class,
        "confidence": confidence
    }





if __name__=="__main__":
    uvicorn.run(app, host='localhost', port='8000')