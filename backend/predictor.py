'''import joblib
import numpy as np

# Load trained model and scaler
model = joblib.load("models/logistic_model.pkl")
scaler = joblib.load("models/scaler.pkl")


def predict_gesture(landmarks):
    """
    Predicts the gesture from 21 hand landmarks.
    Returns:
        gesture_name
        confidence (0-100)
    """

    if landmarks is None:
        return None, 0

    features = []

    for point in landmarks:
        features.extend(point)

    features = np.array(features).reshape(1, -1)

    features = scaler.transform(features)

    prediction = model.predict(features)[0]

    confidence = np.max(model.predict_proba(features)) * 100

    return prediction, confidence
'''
import joblib
import numpy as np

# Load model and scaler
model = joblib.load("models/logistic_model.pkl")
scaler = joblib.load("models/scaler.pkl")


def predict_gesture(landmarks):

    if landmarks is None:
        return "UNKNOWN", 0

    features = []

    for point in landmarks:
        features.extend(point)

    features = np.array(features).reshape(1, -1)

    features = scaler.transform(features)

    prediction = model.predict(features)[0]

    probabilities = model.predict_proba(features)[0]

    confidence = np.max(probabilities) * 100

    if confidence < 70:
        prediction = "UNKNOWN"

    return prediction, confidence