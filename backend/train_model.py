import pandas as pd
import joblib
import os

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report

# -------------------------
# Load Dataset
# -------------------------

csv_file = "dataset/gesture_data.csv"

data = pd.read_csv(csv_file, header=None)

print("\nDataset Loaded Successfully!")
print(data.head())

# -------------------------
# Separate Features & Labels
# -------------------------

X = data.iloc[:, :-1]
y = data.iloc[:, -1]

print("\nTotal Samples :", len(X))
print("Total Features :", X.shape[1])
print("Gesture Classes :", y.unique())

# -------------------------
# Train Test Split
# -------------------------

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# -------------------------
# Normalize Data
# -------------------------

scaler = StandardScaler()

X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# -------------------------
# Train Logistic Regression
# -------------------------

model = LogisticRegression(
    max_iter=5000
)

model.fit(X_train, y_train)

# -------------------------
# Evaluate
# -------------------------

prediction = model.predict(X_test)

accuracy = accuracy_score(y_test, prediction)

print("\n=================================")
print("Accuracy :", round(accuracy * 100, 2), "%")
print("=================================\n")

print(classification_report(y_test, prediction))

# -------------------------
# Save Model
# -------------------------

os.makedirs("models", exist_ok=True)

joblib.dump(model, "models/logistic_model.pkl")
joblib.dump(scaler, "models/scaler.pkl")

print("\nModel Saved Successfully!")
print("Location : models/logistic_model.pkl")
print("Location : models/scaler.pkl")