# Potato disease classification project

## Set up for python:

1. Install Python
2. Instal Python packages

```
  pip install /api/requirement.txt
  pip install /training/requirements.txt
```
3. Install Tensorflow Serving

## Set up for ReactJS

1. Install Nodejs
2. Install NPM
3. Install react-dropzone and axios
```
  npm install react-dropzone
  npm instal axios
```
## Training Model
1. Download data from <a href="https://www.kaggle.com/datasets/arjuntejaswi/plant-village">kaggle</a>
2. Choose the data that is related to Potato
  + Potato___Early_blight
  + Potato___Late_blight
  + Potato___healthy
3. Run jupyter notebook and open /training/Potato-Classification.ipynb
4. At cell #3, update path to your dataset
5. Run all cells
6. Copy the generated model and save it to /model
## Running the API
### Using FastAPI and TF Server
1. Update paths in file model.config
2. Run the TF Serve using docker (Update config file path nad path to project folder below)
```
docker run -t --rm -p 8501:8501 -v D:\University\Dream_Materials\DataScience\potato-disease-classification:/potato-disease-classification tensorflow/serving --rest_api_port=8501 --model_config_file=/potato-disease-classification/models.config
```
3. Run ./api/main.py for using API
4. Get inside frontend folder and run the frontend
```
cd frontend
npm run start
```

Inspiration: https://www.youtube.com/watch?v=dGtDTjYs3xc&list=PLeo1K3hjS3ut49PskOfLnE6WUoOp_2lsD
