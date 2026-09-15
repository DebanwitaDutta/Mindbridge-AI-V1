# MindBridge AI VERSION-1

An AI-powered sign language communication assistant designed to help psychologists communicate effectively with hearing and speech-impaired patients through real-time hand gesture recognition.

## Overview
MindBridge AI bridges the communication gap between psychologists and patients who use sign language. The application captures hand gestures through a webcam, recognizes them using a machine learning model, and displays the predicted gesture in real time.

This project was developed as a full-stack application with a React frontend, Flask backend, and a machine learning model trained on custom hand landmark data extracted using MediaPipe.

## Features
 Patient Registration System
 Real-time Camera Integration
 Live Hand Gesture Recognition
 Machine Learning-based Prediction
 React–Flask API Communication
 Session Management
 Real-time Prediction Updates

## Tech Stack

### Frontend
- React
- Vite
- JavaScript
- CSS
### Backend
- Python
- Flask
- Flask-CORS

### Computer Vision & Machine Learning
- OpenCV
- MediaPipe
- CVZone
- Scikit-learn
- NumPy
- Joblib


## Project Structure

MindBridge-AI/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── models/
│   ├── dataset/
│   ├── app.py
│   ├── camera.py
│   ├── predictor.py
│   ├── hand_detector.py
│   └── requirements.txt
│
└── README.md


### Backend Setup

cd backend

python -m venv venv

venv\Scripts\activate      # Windows

pip install -r requirements.txt

python app.py


### Frontend Setup

(Open a new terminal)

cd frontend

npm install

npm run dev

The application will start on:

Frontend:
http://localhost:5173

Backend:
http://127.0.0.1:5000

## 🧠 How It Works

1. The psychologist begins a new session.
2. Patient information is entered through the registration form.
3. The frontend sends the patient details to the Flask backend.
4. The backend starts the webcam.
5. Hand landmarks are extracted using MediaPipe via CVZone.
6. The trained machine learning model predicts the performed gesture.
7. Predictions are displayed live on the session page.

## Future Improvements

- Patient History
- SQLite Database Integration
- Session Reports
- Sentence Formation from Multiple Gestures
- User Authentication
- Therapist Dashboard
- Improved UI/UX
- Larger Gesture Dataset
- Enhanced Prediction Accuracy


## Project Status

Current Version: **Version 1**

Implemented:
- Patient registration
- Backend API integration
- Real-time camera access
- Live gesture prediction
- Frontend–backend communication

Future versions will focus on data persistence, improved recognition, and advanced patient management features.
