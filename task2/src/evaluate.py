import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import (
    roc_auc_score, roc_curve, precision_recall_curve, 
    f1_score, precision_score, recall_score, accuracy_score,
    confusion_matrix, average_precision_score, balanced_accuracy_score
)

def find_optimal_threshold(y_true, y_pred_prob):
    """
    Finds the decision threshold that maximizes the F1-score.
    """
    precisions, recalls, thresholds = precision_recall_curve(y_true, y_pred_prob)
    # Avoid division by zero
    f1_scores = np.zeros_like(thresholds)
    for idx, t in enumerate(thresholds):
        y_pred = (y_pred_prob >= t).astype(int)
        f1_scores[idx] = f1_score(y_true, y_pred, zero_division=0)
        
    best_idx = np.argmax(f1_scores)
    best_threshold = thresholds[best_idx]
    best_f1 = f1_scores[best_idx]
    return best_threshold, best_f1

def calculate_metrics(y_true, y_pred_prob, threshold=None):
    """
    Calculates key performance metrics.
    If threshold is None, the threshold that maximizes the F1 score will be automatically determined.
    """
    roc_auc = roc_auc_score(y_true, y_pred_prob)
    pr_auc = average_precision_score(y_true, y_pred_prob)
    
    if threshold is None:
        threshold, _ = find_optimal_threshold(y_true, y_pred_prob)
        
    y_pred = (y_pred_prob >= threshold).astype(int)
    
    precision = precision_score(y_true, y_pred, zero_division=0)
    recall = recall_score(y_true, y_pred, zero_division=0)
    f1 = f1_score(y_true, y_pred, zero_division=0)
    accuracy = accuracy_score(y_true, y_pred)
    balanced_acc = balanced_accuracy_score(y_true, y_pred)
    
    # Calculate G-Mean
    tn, fp, fn, tp = confusion_matrix(y_true, y_pred).ravel()
    specificity = tn / (tn + fp) if (tn + fp) > 0 else 0
    gmean = np.sqrt(recall * specificity)
    
    metrics = {
        'threshold': threshold,
        'roc_auc': roc_auc,
        'pr_auc': pr_auc,
        'f1_score': f1,
        'precision': precision,
        'recall': recall,
        'accuracy': accuracy,
        'balanced_accuracy': balanced_acc,
        'gmean': gmean,
        'confusion_matrix': (tn, fp, fn, tp)
    }
    return metrics

def plot_roc_curves(results, save_path):
    """
    Plots overlayed ROC curves for multiple models with a clean design.
    results: dict of {model_name: (y_true, y_pred_prob)}
    """
    plt.figure(figsize=(8, 6), dpi=150)
    sns.set_theme(style="whitegrid")
    
    # Premium color palette
    colors = {
        'Logistic Regression': '#4F46E5',  # Indigo
        'Random Forest': '#10B981',        # Emerald green
        'XGBoost': '#F59E0B'               # Amber
    }
    
    for name, (y_true, y_pred_prob) in results.items():
        fpr, tpr, _ = roc_curve(y_true, y_pred_prob)
        auc = roc_auc_score(y_true, y_pred_prob)
        color = colors.get(name, '#6B7280') # Default gray
        plt.plot(fpr, tpr, label=f'{name} (AUC = {auc:.4f})', linewidth=2.5, color=color)
        
    plt.plot([0, 1], [0, 1], 'k--', linewidth=1.5, color='#9CA3AF')
    plt.xlim([-0.02, 1.02])
    plt.ylim([-0.02, 1.02])
    plt.xlabel('False Positive Rate (1 - Specificity)', fontsize=12, fontweight='bold', labelpad=10)
    plt.ylabel('True Positive Rate (Recall)', fontsize=12, fontweight='bold', labelpad=10)
    plt.title('Receiver Operating Characteristic (ROC) Curve Comparison', fontsize=14, fontweight='bold', pad=15)
    plt.legend(loc="lower right", frameon=True, facecolor='white', framealpha=0.9, fontsize=10)
    plt.tight_layout()
    plt.savefig(save_path, dpi=300)
    plt.close()

def plot_pr_curves(results, save_path):
    """
    Plots overlayed Precision-Recall curves.
    results: dict of {model_name: (y_true, y_pred_prob)}
    """
    plt.figure(figsize=(8, 6), dpi=150)
    sns.set_theme(style="whitegrid")
    
    colors = {
        'Logistic Regression': '#4F46E5',  # Indigo
        'Random Forest': '#10B981',        # Emerald green
        'XGBoost': '#F59E0B'               # Amber
    }
    
    for name, (y_true, y_pred_prob) in results.items():
        precision, recall, _ = precision_recall_curve(y_true, y_pred_prob)
        pr_auc = average_precision_score(y_true, y_pred_prob)
        color = colors.get(name, '#6B7280')
        plt.plot(recall, precision, label=f'{name} (PR-AUC = {pr_auc:.4f})', linewidth=2.5, color=color)
        
    plt.xlim([-0.02, 1.02])
    plt.ylim([-0.02, 1.02])
    plt.xlabel('Recall (Sensitivity)', fontsize=12, fontweight='bold', labelpad=10)
    plt.ylabel('Precision (Positive Predictive Value)', fontsize=12, fontweight='bold', labelpad=10)
    plt.title('Precision-Recall (PR) Curve Comparison', fontsize=14, fontweight='bold', pad=15)
    plt.legend(loc="lower left", frameon=True, facecolor='white', framealpha=0.9, fontsize=10)
    plt.tight_layout()
    plt.savefig(save_path, dpi=300)
    plt.close()

def plot_feature_importance(model_name, model, feature_names, save_path, top_n=15):
    """
    Plots the feature importance of a tree-based model.
    """
    # Extract importances from the pipeline classifier
    if hasattr(model, 'named_steps'):
        classifier = model.named_steps['classifier']
    else:
        classifier = model
        
    if not hasattr(classifier, 'feature_importances_'):
        print(f"Model {model_name} does not support feature importances.")
        return
        
    importances = classifier.feature_importances_
    indices = np.argsort(importances)[::-1][:top_n]
    
    # Create DataFrame for Seaborn
    feat_df = pd.DataFrame({
        'Feature': [feature_names[i] for i in indices],
        'Importance': importances[indices]
    })
    
    plt.figure(figsize=(10, 6), dpi=150)
    sns.set_theme(style="whitegrid")
    
    # Select color palette based on model name
    color = '#10B981' if model_name == 'Random Forest' else '#F59E0B'
    
    sns.barplot(
        x='Importance', 
        y='Feature', 
        data=feat_df, 
        color=color, 
        edgecolor='black', 
        linewidth=0.5
    )
    
    plt.xlabel('Relative Importance Value', fontsize=12, fontweight='bold', labelpad=10)
    plt.ylabel('Features', fontsize=12, fontweight='bold', labelpad=10)
    plt.title(f'{model_name} Top Feature Importances', fontsize=14, fontweight='bold', pad=15)
    plt.tight_layout()
    plt.savefig(save_path, dpi=300)
    plt.close()

def plot_confusion_matrix_heatmap(y_true, y_pred, save_path, model_name="Best Model"):
    """
    Plots a highly polished confusion matrix heatmap.
    """
    tn, fp, fn, tp = confusion_matrix(y_true, y_pred).ravel()
    cm_data = np.array([[tn, fp], [fn, tp]])
    
    plt.figure(figsize=(6, 5), dpi=150)
    
    # Custom color palette matching Indigo vibe
    cmap = sns.light_palette("#4F46E5", as_cmap=True)
    
    labels = [
        [f'True Neg (TN)\n{tn:,}\n({tn/len(y_true)*100:.1f}%)', f'False Pos (FP)\n{fp:,}\n({fp/len(y_true)*100:.1f}%)'],
        [f'False Neg (FN)\n{fn:,}\n({fn/len(y_true)*100:.1f}%)', f'True Pos (TP)\n{tp:,}\n({tp/len(y_true)*100:.1f}%)']
    ]
    
    sns.heatmap(
        cm_data, 
        annot=labels, 
        fmt='', 
        cmap=cmap, 
        cbar=True,
        square=True,
        xticklabels=['Non-Delinquent (0)', 'Delinquent (1)'],
        yticklabels=['Non-Delinquent (0)', 'Delinquent (1)'],
        annot_kws={"fontsize": 11, "fontweight": "bold"}
    )
    
    plt.ylabel('Actual Label', fontsize=12, fontweight='bold', labelpad=10)
    plt.xlabel('Predicted Label', fontsize=12, fontweight='bold', labelpad=10)
    plt.title(f'Confusion Matrix - {model_name}', fontsize=14, fontweight='bold', pad=15)
    plt.tight_layout()
    plt.savefig(save_path, dpi=300)
    plt.close()
