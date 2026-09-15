from flask import Flask, jsonify, request, Response
from flask_cors import CORS

from camera import (
    launch_camera,
    stop_camera,
    get_prediction,
    is_running,
    get_error,
    generate_mjpeg,
)

app = Flask(__name__)
CORS(app)

patients = []


@app.route("/")
def home():
    return jsonify({"status": "MindBridge Backend Running"})


@app.route("/register", methods=["POST"])
def register():
    patient = request.json
    patients.append(patient)

    print("\n========== PATIENT ==========")
    print(patient)
    print("=============================\n")

    return jsonify({"success": True})


@app.route("/patients")
def patient_list():
    return jsonify(patients)


@app.route("/start-camera", methods=["POST"])
def start():
    print("Received Start Camera Request")

    ok, error = launch_camera()

    if not ok:
        # Report the real reason back to the frontend instead of a fake success
        return jsonify({"success": False, "error": error}), 500

    return jsonify({"success": True})


@app.route("/video-feed")
def video_feed():
    # This is what the <img> tag in the frontend points at
    return Response(
        generate_mjpeg(),
        mimetype="multipart/x-mixed-replace; boundary=frame",
    )


@app.route("/camera-status")
def camera_status():
    return jsonify({"running": is_running(), "error": get_error()})


@app.route("/prediction")
def prediction():
    return jsonify({"prediction": get_prediction()})


@app.route("/stop-camera", methods=["POST"])
def stop():
    stop_camera()
    return jsonify({"success": True})


if __name__ == "__main__":
    # threaded=True is required: without it Flask's dev server handles one
    # request at a time, which would block /prediction and /video-feed
    # while the camera is streaming.
    app.run(debug=False, threaded=True)