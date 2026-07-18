import sys
import os

# Add parent directory to path so we can import backend
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.main import app, PatientData, predict

def test_prediction_endpoint():
    print("Testing ML prediction logic directly...")
    
    # Sample matching the RF model inputs
    test_sample = PatientData(
        age=54.0,
        sex=1.0,
        cp=1.0,
        trestbps=130.0,
        chol=240.0,
        fbs=0.0,
        restecg=0.0,
        thalach=150.0,
        exang=0.0,
        oldpeak=1.2,
        slope=1.0,
        ca=0.0,
        thal=2.0
    )
    
    response = predict(test_sample)
    print("Response:", response)
    
    assert "riskStatus" in response, "riskStatus missing from response"
    assert "probability" in response, "probability missing from response"
    assert "confidence" in response, "confidence missing from response"
    
    print("Test passed successfully!")

if __name__ == "__main__":
    test_prediction_endpoint()
