# Credit Scoring Model Pipeline (Task 2)

This directory contains a complete, production-ready machine learning pipeline for **Credit Scoring**, built to predict the probability that a borrower will experience financial distress (delinquency of 90 days or worse) within the next two years.

The model is trained on Kaggle's "Give Me Some Credit" dataset.

## Project Structure

```
task2/
├── src/
│   ├── preprocessing.py   # CreditDataPreprocessor class with custom feature engineering
│   ├── models.py          # Model pipelines (LR, RF, XGBoost) and hyperparameter tuning
│   └── evaluate.py        # Metrics computation and visualization functions
├── reports/               # Evaluation plots and comparison CSV
│   ├── model_comparison.csv
│   ├── roc_comparison.png
│   ├── pr_comparison.png
│   ├── rf_feature_importance.png
│   ├── xgb_feature_importance.png
│   └── best_model_confusion_matrix.png
├── train.py               # Main model training and tuning entrypoint
├── predict.py             # Model inference entrypoint
├── predictions.csv        # Final probability predictions for the test set
└── .gitignore             # Git ignore patterns for dataset and models
```

## Features and Preprocessing

The `CreditDataPreprocessor` handles the following operations:
1. **Anomaly Resolution**: Standardizes delinquency counters (e.g., handles placeholder codes like 96 and 98).
2. **Missing Value Imputation**:
   - `MonthlyIncome`: Imputed dynamically using the median monthly income of the borrower's **age decile**.
   - `NumberOfDependents`: Imputed using the mode.
   - Adds missing value indicator columns for transparency.
3. **Feature Engineering**:
   - `TotalLatePayments`: Sum of all 30-59 days, 60-89 days, and 90+ days late payments.
   - `UnsecuredDebtActive`: Binary flag checking if utilization of unsecured lines is positive.
   - `MonthlyDebt`: Absolute monthly debt computed from `DebtRatio` and `MonthlyIncome`.
   - `IncomePerPerson`: Monthly income divided by dependents count.
   - `MonthlyBalanceAfterDebt`: Remaining income after paying monthly debt.
   - `IsRetired`: Binary flag indicating if age is greater than 65.
   - `TotalLoansAndLines`: Total number of open credit lines and real estate loans.
   - `RatioOpenToTotalLoans`: Ratio of open credit lines to total loans and lines.

## Model Training & Results

Three classifier pipelines were trained and tuned using **5-Fold Cross-Validation** on the stratified training set (80/20 train-validation split):
1. **Logistic Regression** (with feature scaling and L2 regularization)
2. **Random Forest** (tuned max depth and number of estimators)
3. **XGBoost** (tuned learning rate, depth, estimators, and class weight to handle imbalance)

### Validation Performance Summary

| Model | Validation ROC-AUC | PR-AUC | Optimal Threshold | F1-Score | Precision | Recall | Accuracy | Balanced Accuracy |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Logistic Regression** | 0.8620 | 0.3922 | 0.7513 | 0.4479 | 0.4102 | 0.4933 | 0.9187 | 0.7212 |
| **Random Forest** | 0.8656 | 0.3806 | 0.6727 | 0.4339 | 0.3647 | 0.5357 | 0.9066 | 0.7344 |
| **XGBoost (Best)** | **0.8694** | **0.4057** | **0.7646** | **0.4508** | **0.3938** | **0.5272** | **0.9142** | **0.7345** |

- The decision thresholds were optimized specifically to maximize the F1-Score to handle class imbalance (delinquents make up ~6.7% of the dataset).
- **XGBoost** achieved the highest overall performance with a **ROC-AUC of 0.8694** and **PR-AUC of 0.4057**.

## Running the Pipeline

### 1. Requirements
Ensure Python and standard ML libraries are installed:
```bash
pip install pandas numpy scikit-learn xgboost joblib matplotlib seaborn
```

### 2. Train the Pipeline
To run the training, CV grid search, evaluation, and retrain the best model on the full set:
```bash
python train.py
```

### 3. Generate Predictions
To load the retrained model, preprocess the test set, and output probability predictions to `predictions.csv`:
```bash
python predict.py
```
