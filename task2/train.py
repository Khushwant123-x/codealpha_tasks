import os
import joblib
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from src.preprocessing import CreditDataPreprocessor
from src.models import (
    get_logistic_regression_pipeline, 
    get_random_forest_pipeline, 
    get_xgboost_pipeline,
    get_hyperparameter_grids,
    tune_hyperparameters
)
from src.evaluate import (
    calculate_metrics,
    plot_roc_curves,
    plot_pr_curves,
    plot_feature_importance,
    plot_confusion_matrix_heatmap
)

def main():
    print("=========================================")
    print("Credit Scoring Model Training Pipeline")
    print("=========================================")
    
    # 1. Paths and Setup
    train_path = r"c:\Users\Jyoti\OneDrive\Desktop\task2\cs-training.csv"
    reports_dir = r"c:\Users\Jyoti\OneDrive\Desktop\task2\reports"
    artifacts_dir = r"C:\Users\Jyoti\.gemini\antigravity-ide\brain\a1b48603-c397-4af9-b724-2c868d656739"
    
    os.makedirs(reports_dir, exist_ok=True)
    os.makedirs(artifacts_dir, exist_ok=True)
    
    # 2. Load Data
    print(f"Loading data from {train_path}...")
    df = pd.read_csv(train_path, index_col=0)
    X = df.drop(columns=['SeriousDlqin2yrs'])
    y = df['SeriousDlqin2yrs']
    
    # 3. Train-Validation Split (Stratified 80/20)
    print("Splitting data into stratified 80% train and 20% validation...")
    X_train_raw, X_val_raw, y_train, y_val = train_test_split(
        X, y, test_size=0.2, stratify=y, random_state=42
    )
    
    # 4. Fit & Transform Preprocessor on Train Split
    print("Fitting preprocessor on training split and transforming both train and validation splits...")
    preprocessor = CreditDataPreprocessor()
    preprocessor.fit(X_train_raw)
    
    X_train = preprocessor.transform(X_train_raw)
    X_val = preprocessor.transform(X_val_raw)
    
    feature_names = X_train.columns.tolist()
    print(f"Number of preprocessed features: {len(feature_names)}")
    
    # 5. Hyperparameter Tuning on Train Split
    # Calculate pos_weight for XGBoost to handle class imbalance
    pos_count = y_train.sum()
    neg_count = len(y_train) - pos_count
    scale_pos_weight = neg_count / pos_count
    print(f"Class imbalance ratio (neg/pos): {scale_pos_weight:.2f}")
    
    lr_grid, rf_grid, xgb_grid = get_hyperparameter_grids()
    
    print("\n--- Tuning 1. Logistic Regression ---")
    lr_pipeline = get_logistic_regression_pipeline()
    lr_best, lr_best_params, lr_cv_score = tune_hyperparameters(lr_pipeline, lr_grid, X_train, y_train, cv=5)
    
    print("\n--- Tuning 2. Random Forest ---")
    rf_pipeline = get_random_forest_pipeline()
    rf_best, rf_best_params, rf_cv_score = tune_hyperparameters(rf_pipeline, rf_grid, X_train, y_train, cv=5)
    
    print("\n--- Tuning 3. XGBoost ---")
    xgb_pipeline = get_xgboost_pipeline(scale_pos_weight=scale_pos_weight)
    xgb_best, xgb_best_params, xgb_cv_score = tune_hyperparameters(xgb_pipeline, xgb_grid, X_train, y_train, cv=5)
    
    # 6. Evaluation on Validation Set
    print("\n=========================================")
    print("Evaluating Models on Validation Set")
    print("=========================================")
    
    models = {
        'Logistic Regression': lr_best,
        'Random Forest': rf_best,
        'XGBoost': xgb_best
    }
    
    validation_results = {}
    validation_metrics = {}
    
    for name, model in models.items():
        print(f"Predicting with {name}...")
        y_pred_prob = model.predict_proba(X_val)[:, 1]
        validation_results[name] = (y_val, y_pred_prob)
        
        # Calculate metrics (finding optimal threshold for F1)
        metrics = calculate_metrics(y_val, y_pred_prob)
        validation_metrics[name] = metrics
        
        print(f"  {name} Results:")
        print(f"    Validation ROC-AUC: {metrics['roc_auc']:.4f}")
        print(f"    Validation PR-AUC:  {metrics['pr_auc']:.4f}")
        print(f"    Optimal Threshold:   {metrics['threshold']:.4f}")
        print(f"    F1-Score:           {metrics['f1_score']:.4f}")
        print(f"    Precision:          {metrics['precision']:.4f}")
        print(f"    Recall:             {metrics['recall']:.4f}")
        print(f"    G-Mean:             {metrics['gmean']:.4f}")
        print(f"    Accuracy:           {metrics['accuracy']:.4f}")
        print(f"    Balanced Accuracy:  {metrics['balanced_accuracy']:.4f}")
        tn, fp, fn, tp = metrics['confusion_matrix']
        print(f"    Confusion Matrix:   TN={tn}, FP={fp}, FN={fn}, TP={tp}")
        print("-" * 40)
        
    # Generate Comparison Table
    metric_rows = []
    for name, metrics in validation_metrics.items():
        metric_rows.append({
            'Model': name,
            'ROC-AUC': f"{metrics['roc_auc']:.5f}",
            'PR-AUC': f"{metrics['pr_auc']:.5f}",
            'Optimal Threshold': f"{metrics['threshold']:.4f}",
            'F1-Score': f"{metrics['f1_score']:.5f}",
            'Precision': f"{metrics['precision']:.5f}",
            'Recall': f"{metrics['recall']:.5f}",
            'G-Mean': f"{metrics['gmean']:.5f}",
            'Accuracy': f"{metrics['accuracy']:.5f}",
            'Balanced Accuracy': f"{metrics['balanced_accuracy']:.5f}"
        })
    comparison_df = pd.DataFrame(metric_rows)
    print("\n--- Model Comparison Summary ---")
    print(comparison_df.to_string(index=False))
    comparison_df.to_csv(os.path.join(reports_dir, 'model_comparison.csv'), index=False)
    
    # 7. Generate & Save Figures
    print("\nGenerating evaluation plots...")
    
    # Save ROC curves to reports and artifacts
    plot_roc_curves(validation_results, os.path.join(reports_dir, 'roc_comparison.png'))
    plot_roc_curves(validation_results, os.path.join(artifacts_dir, 'roc_comparison.png'))
    
    # Save PR curves to reports and artifacts
    plot_pr_curves(validation_results, os.path.join(reports_dir, 'pr_comparison.png'))
    plot_pr_curves(validation_results, os.path.join(artifacts_dir, 'pr_comparison.png'))
    
    # Feature Importances for Random Forest and XGBoost
    plot_feature_importance('Random Forest', rf_best, feature_names, os.path.join(reports_dir, 'rf_feature_importance.png'))
    plot_feature_importance('Random Forest', rf_best, feature_names, os.path.join(artifacts_dir, 'rf_feature_importance.png'))
    
    plot_feature_importance('XGBoost', xgb_best, feature_names, os.path.join(reports_dir, 'xgb_feature_importance.png'))
    plot_feature_importance('XGBoost', xgb_best, feature_names, os.path.join(artifacts_dir, 'xgb_feature_importance.png'))
    
    # Determine the best model based on ROC-AUC
    best_model_name = max(validation_metrics, key=lambda k: validation_metrics[k]['roc_auc'])
    best_model = models[best_model_name]
    best_model_params = lr_best_params if best_model_name == 'Logistic Regression' else (rf_best_params if best_model_name == 'Random Forest' else xgb_best_params)
    best_threshold = validation_metrics[best_model_name]['threshold']
    
    print(f"\n>>> Best Model: {best_model_name} (ROC-AUC = {validation_metrics[best_model_name]['roc_auc']:.5f}) <<<")
    
    # Plot Confusion Matrix of the Best Model
    y_best_pred_prob = validation_results[best_model_name][1]
    y_best_pred = (y_best_pred_prob >= best_threshold).astype(int)
    plot_confusion_matrix_heatmap(y_val, y_best_pred, os.path.join(reports_dir, 'best_model_confusion_matrix.png'), model_name=best_model_name)
    plot_confusion_matrix_heatmap(y_val, y_best_pred, os.path.join(artifacts_dir, 'best_model_confusion_matrix.png'), model_name=best_model_name)
    
    # 8. Final Retraining on Full Training Set
    print("\n=========================================")
    print(f"Retraining Best Model ({best_model_name}) on Full Dataset...")
    print("=========================================")
    
    full_preprocessor = CreditDataPreprocessor()
    full_preprocessor.fit(X)
    X_full = full_preprocessor.transform(X)
    
    # Instantiate fresh best pipeline with optimal params
    if best_model_name == 'Logistic Regression':
        final_model = get_logistic_regression_pipeline()
    elif best_model_name == 'Random Forest':
        final_model = get_random_forest_pipeline()
    else:  # XGBoost
        # Recompute imbalance on full set
        full_pos = y.sum()
        full_neg = len(y) - full_pos
        full_scale_pos_weight = full_neg / full_pos
        final_model = get_xgboost_pipeline(scale_pos_weight=full_scale_pos_weight)
        
    final_model.set_params(**best_model_params)
    
    print("Fitting model...")
    final_model.fit(X_full, y)
    
    # Save the full pipeline
    model_save_path = r"c:\Users\Jyoti\OneDrive\Desktop\task2\best_model.joblib"
    print(f"Saving final preprocessor and model to {model_save_path}...")
    pipeline_payload = {
        'preprocessor': full_preprocessor,
        'model': final_model,
        'feature_names': feature_names,
        'model_name': best_model_name,
        'best_threshold': best_threshold,
        'validation_metrics': validation_metrics
    }
    
    try:
        joblib.dump(pipeline_payload, model_save_path)
        print("Model saved successfully!")
    except Exception as e:
        print(f"Error saving model with joblib: {e}. Trying standard pickle...")
        import pickle
        model_save_path_pkl = r"c:\Users\Jyoti\OneDrive\Desktop\task2\best_model.pkl"
        with open(model_save_path_pkl, 'wb') as f:
            pickle.dump(pipeline_payload, f)
        print(f"Model saved successfully to {model_save_path_pkl}!")

    print("\nTraining Pipeline Completed Successfully!")

if __name__ == '__main__':
    main()
