import pandas as pd
import numpy as np
from sklearn.base import BaseEstimator, TransformerMixin

class CreditDataPreprocessor(BaseEstimator, TransformerMixin):
    def __init__(self):
        # Fit parameters
        self.global_median_age = None
        self.age_deciles_median_income = {}
        self.global_median_income = None
        self.mode_dependents = None
        self.feature_columns = None
        
    def fit(self, X, y=None):
        df = X.copy()
        
        # 1. Median Age
        valid_ages = df['age'][df['age'] > 0]
        self.global_median_age = valid_ages.median() if len(valid_ages) > 0 else 45
        
        # Replace age <= 0 for calculations
        df['age'] = np.where(df['age'] <= 0, self.global_median_age, df['age'])
        
        # 2. Income statistics by age deciles
        # Calculate quantiles safely
        try:
            df['age_decile'] = pd.qcut(df['age'], q=10, labels=False, duplicates='drop')
        except ValueError:
            df['age_decile'] = 0
            
        # Compute median income per age decile
        decile_medians = df.groupby('age_decile')['MonthlyIncome'].median()
        self.global_median_income = df['MonthlyIncome'].median()
        if pd.isna(self.global_median_income):
            self.global_median_income = 5400.0  # Fallback
            
        for decile in range(10):
            val = decile_medians.get(decile, self.global_median_income)
            self.age_deciles_median_income[decile] = val if not pd.isna(val) else self.global_median_income
            
        # 3. Dependents mode
        mode_dep_series = df['NumberOfDependents'].mode()
        self.mode_dependents = mode_dep_series.iloc[0] if len(mode_dep_series) > 0 else 0
        
        return self
        
    def transform(self, X, y=None):
        df = X.copy()
        
        # Missing value indicators
        df['MonthlyIncome_isnull'] = df['MonthlyIncome'].isnull().astype(int)
        df['NumberOfDependents_isnull'] = df['NumberOfDependents'].isnull().astype(int)
        
        # Clean age: replace <= 0 or null with global median
        df['age'] = df['age'].fillna(self.global_median_age)
        df['age'] = np.where(df['age'] <= 0, self.global_median_age, df['age'])
        
        # Clean dependents
        df['NumberOfDependents'] = df['NumberOfDependents'].fillna(self.mode_dependents)
        
        # Clean delinquency counters
        # 96 or 98 represent missing/unknown codes
        delinquency_cols = ['NumberOfTime30-59DaysPastDueNotWorse', 'NumberOfTimes90DaysLate', 'NumberOfTime60-89DaysPastDueNotWorse']
        df['DelinquencyCounters_is_anomalous'] = df[delinquency_cols].isin([96, 98]).any(axis=1).astype(int)
        
        for col in delinquency_cols:
            df[col] = np.where(df[col].isin([96, 98]), 0, df[col])
            
        # Clean RevolvingUtilizationOfUnsecuredLines
        df['RevolvingUtilization_gt_1'] = (df['RevolvingUtilizationOfUnsecuredLines'] > 1.0).astype(int)
        df['RevolvingUtilizationOfUnsecuredLines'] = df['RevolvingUtilizationOfUnsecuredLines'].clip(upper=1.0)
        
        # Clean DebtRatio vs MonthlyIncome
        # If MonthlyIncome is null or 0, DebtRatio is usually absolute debt
        df['DebtRatio_is_absolute_debt'] = ((df['MonthlyIncome'].isnull()) | (df['MonthlyIncome'] == 0) & (df['DebtRatio'] > 1.0)).astype(int)
        
        # Impute MonthlyIncome using age decile medians
        try:
            temp_age_decile = pd.qcut(df['age'], q=10, labels=False, duplicates='drop')
        except ValueError:
            temp_age_decile = pd.Series(0, index=df.index)
            
        income_fill_values = temp_age_decile.map(self.age_deciles_median_income).fillna(self.global_median_income)
        df['MonthlyIncome'] = df['MonthlyIncome'].fillna(income_fill_values)
        
        # Feature Engineering
        # 1. Total Late Payments
        df['TotalLatePayments'] = df['NumberOfTime30-59DaysPastDueNotWorse'] + df['NumberOfTime60-89DaysPastDueNotWorse'] + df['NumberOfTimes90DaysLate']
        
        # 2. Unsecured Debt Active flag
        df['UnsecuredDebtActive'] = (df['RevolvingUtilizationOfUnsecuredLines'] > 0).astype(int)
        
        # 3. Monthly Debt Amount
        df['MonthlyDebt'] = np.where(
            df['DebtRatio_is_absolute_debt'] == 1,
            df['DebtRatio'],
            df['DebtRatio'] * df['MonthlyIncome']
        )
        
        # 4. Income Per Person
        df['IncomePerPerson'] = df['MonthlyIncome'] / (df['NumberOfDependents'] + 1)
        
        # 5. Monthly Balance After Debt
        df['MonthlyBalanceAfterDebt'] = df['MonthlyIncome'] - df['MonthlyDebt']
        
        # 6. Retired flag
        df['IsRetired'] = (df['age'] > 65).astype(int)
        
        # 7. Total Loans and Lines
        df['TotalLoansAndLines'] = df['NumberOfOpenCreditLinesAndLoans'] + df['NumberRealEstateLoansOrLines']
        
        # 8. Ratio of Open to Total Loans
        df['RatioOpenToTotalLoans'] = df['NumberOfOpenCreditLinesAndLoans'] / (df['TotalLoansAndLines'] + 1)
        
        if self.feature_columns is None:
            self.feature_columns = list(df.columns)
            
        # Reorder to match fit columns
        return df[self.feature_columns]

if __name__ == '__main__':
    # Test prep
    print("Testing Preprocessor...")
    train_path = r"c:\Users\Jyoti\OneDrive\Desktop\task2\cs-training.csv"
    train_df = pd.read_csv(train_path, index_col=0)
    
    X = train_df.drop(columns=['SeriousDlqin2yrs'])
    y = train_df['SeriousDlqin2yrs']
    
    preprocessor = CreditDataPreprocessor()
    preprocessor.fit(X)
    
    import time
    start = time.time()
    X_trans = preprocessor.transform(X)
    print(f"Transformation took: {time.time() - start:.4f} seconds")
    
    print("Original shape:", X.shape)
    print("Transformed shape:", X_trans.shape)
    print("Columns in transformed data:")
    print(X_trans.columns.tolist())
    print("Null counts in transformed data:")
    print(X_trans.isnull().sum())
