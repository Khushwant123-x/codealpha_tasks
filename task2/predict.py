import os
import joblib
import pickle
import pandas as pd
import numpy as np

def main():
    print("=========================================")
    print("Credit Scoring Prediction Pipeline")
    print("=========================================")
    
    test_path = r"c:\Users\Jyoti\OneDrive\Desktop\task2\cs-test.csv"
    model_path_joblib = r"c:\Users\Jyoti\OneDrive\Desktop\task2\best_model.joblib"
    model_path_pkl = r"c:\Users\Jyoti\OneDrive\Desktop\task2\best_model.pkl"
    output_path = r"c:\Users\Jyoti\OneDrive\Desktop\task2\predictions.csv"
    
    # 1. Load Model
    payload = None
    if os.path.exists(model_path_joblib):
        print(f"Loading model payload from {model_path_joblib}...")
        try:
            payload = joblib.load(model_path_joblib)
        except Exception as e:
            print(f"Error loading with joblib: {e}")
            
    if payload is None and os.path.exists(model_path_pkl):
        print(f"Loading model payload from {model_path_pkl}...")
        try:
            with open(model_path_pkl, 'rb') as f:
                payload = pickle.load(f)
        except Exception as e:
            print(f"Error loading with pickle: {e}")
            
    if payload is None:
        raise FileNotFoundError("Could not load any trained model payload. Please run train.py first.")
        
    preprocessor = payload['preprocessor']
    model = payload['model']
    model_name = payload['model_name']
    best_threshold = payload.get('best_threshold', 0.5)
    
    print(f"Successfully loaded {model_name} model!")
    print(f"Optimal decision threshold: {best_threshold:.4f}")
    
    # 2. Load Test Data
    print(f"Loading test data from {test_path}...")
    df_test = pd.read_csv(test_path, index_col=0)
    
    # Drop target column if it exists (usually empty or all NaN in test set)
    X_test_raw = df_test.drop(columns=['SeriousDlqin2yrs'], errors='ignore')
    
    # 3. Preprocess Test Data
    print("Preprocessing test data...")
    X_test = preprocessor.transform(X_test_raw)
    
    # 4. Predict probabilities
    print("Generating predictions...")
    y_pred_prob = model.predict_proba(X_test)[:, 1]
    
    # Make binary predictions using the optimal threshold
    y_pred_bin = (y_pred_prob >= best_threshold).astype(int)
    
    # 5. Format & Save output
    submission = pd.DataFrame({
        'Id': df_test.index,
        'Probability': y_pred_prob
    })
    
    print(f"Saving predictions to {output_path}...")
    submission.to_csv(output_path, index=False)
    
    print("\n--- Predictions Preview ---")
    print(submission.head(10))
    print(f"\nTotal test samples predicted: {len(submission):,}")
    print(f"Predicted positive class (delinquent) rate: {y_pred_bin.mean()*100:.2f}% (at threshold {best_threshold:.4f})")
    print("Prediction Pipeline Completed Successfully!")

if __name__ == '__main__':
    main()
