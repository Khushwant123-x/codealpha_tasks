import os
import joblib
import pandas as pd
import numpy as np
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Heart Disease Prediction API", version="1.0.0")

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Resolve paths dynamically
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, "heart_disease_model.pkl")
SCALER_PATH = os.path.join(BASE_DIR, "scaler (2).pkl")
COLUMNS_PATH = os.path.join(BASE_DIR, "columns (1).pkl")

# Load ML artifacts
try:
    model = joblib.load(MODEL_PATH)
    scaler = joblib.load(SCALER_PATH)
    columns = joblib.load(COLUMNS_PATH)
except Exception as e:
    print(f"Error loading model artifacts: {e}")
    model = None
    scaler = None
    columns = None

class PatientData(BaseModel):
    age: float
    sex: float
    cp: float
    trestbps: float
    chol: float
    fbs: float
    restecg: float
    thalach: float
    exang: float
    oldpeak: float
    slope: float
    ca: float
    thal: float

@app.get("/")
def read_root():
    return {
        "status": "online",
        "model_loaded": model is not None,
        "scaler_loaded": scaler is not None,
        "columns_loaded": columns is not None
    }

@app.post("/predict")
def predict(data: PatientData):
    if model is None or scaler is None or columns is None:
        raise HTTPException(
            status_code=503, 
            detail="Machine learning model artifacts are not loaded on server."
        )
    
    try:
        # Convert Pydantic model to dictionary
        input_dict = data.model_dump()
        
        # Create DataFrame in the exact format and order expected by the scaler/model
        df = pd.DataFrame([input_dict])[columns]
        
        # Scale features
        scaled_features = scaler.transform(df)
        
        # Convert scaled features back to DataFrame with proper column names
        # to prevent scikit-learn warnings about missing feature names
        scaled_df = pd.DataFrame(scaled_features, columns=columns)
        
        # Make predictions
        prediction = model.predict(scaled_df)[0]
        prediction_proba = model.predict_proba(scaled_df)[0]
        
        # Probability of class 1 (Heart Disease)
        probability_pct = int(round(prediction_proba[1] * 100))
        
        # Risk classification
        risk_status = "High Risk" if prediction == 1 else "Low Risk"
        
        # Confidence score (probability of the predicted class)
        confidence_pct = int(round(max(prediction_proba) * 100))
        
        return {
            "riskStatus": risk_status,
            "probability": probability_pct,
            "confidence": confidence_pct
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")
