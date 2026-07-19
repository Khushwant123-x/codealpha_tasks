import numpy as np
import pandas as pd
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier
from sklearn.model_selection import GridSearchCV, StratifiedKFold

def get_logistic_regression_pipeline():
    """
    Returns a pipeline with scaling and Logistic Regression.
    Logistic Regression requires feature scaling for optimal convergence.
    """
    return Pipeline([
        ('scaler', StandardScaler()),
        ('classifier', LogisticRegression(
            max_iter=1000,
            class_weight='balanced',
            random_state=42,
            solver='lbfgs'
        ))
    ])

def get_random_forest_pipeline():
    """
    Returns a Random Forest Classifier.
    """
    return Pipeline([
        ('classifier', RandomForestClassifier(
            class_weight='balanced',
            random_state=42,
            n_jobs=-1
        ))
    ])

def get_xgboost_pipeline(scale_pos_weight=1.0):
    """
    Returns an XGBoost Classifier.
    """
    return Pipeline([
        ('classifier', XGBClassifier(
            use_label_encoder=False,
            eval_metric='logloss',
            scale_pos_weight=scale_pos_weight,
            random_state=42,
            n_jobs=-1
        ))
    ])

def get_hyperparameter_grids(scale_pos_weight=1.0):
    """
    Returns hyperparameter search grids for each model type.
    We keep search spaces reasonable to ensure fast training while finding good parameters.
    """
    lr_grid = {
        'classifier__C': [0.01, 0.1, 1.0, 10.0],
        'classifier__penalty': ['l2']
    }
    
    rf_grid = {
        'classifier__n_estimators': [100, 200],
        'classifier__max_depth': [6, 10, 15],
        'classifier__min_samples_split': [5, 10]
    }
    
    xgb_grid = {
        'classifier__n_estimators': [100, 200],
        'classifier__max_depth': [4, 6, 8],
        'classifier__learning_rate': [0.05, 0.1, 0.2],
        'classifier__subsample': [0.8]
    }
    
    return lr_grid, rf_grid, xgb_grid

def tune_hyperparameters(pipeline, param_grid, X, y, cv=5, scoring='roc_auc'):
    """
    Performs grid search to find the best hyperparameters for a given pipeline.
    """
    print(f"Starting Grid Search with {cv} folds...")
    grid_search = GridSearchCV(
        estimator=pipeline,
        param_grid=param_grid,
        cv=cv,
        scoring=scoring,
        n_jobs=-1,
        verbose=1,
        return_train_score=True
    )
    grid_search.fit(X, y)
    print(f"Best parameters: {grid_search.best_params_}")
    print(f"Best CV ROC-AUC: {grid_search.best_score_:.4f}")
    return grid_search.best_estimator_, grid_search.best_params_, grid_search.best_score_
