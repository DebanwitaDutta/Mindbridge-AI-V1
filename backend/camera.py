import threading
import time

import cv2

from hand_detector import detector
from predictor import predict_gesture

# ---- shared state (protected by _lock) ----
_lock = threading.Lock()
_latest_frame = None          # last JPEG-encoded frame, as bytes
_latest_prediction = "Waiting..."
_camera_running = False
_camera_error = None          # human-readable error, if startup failed

_capture_thread = None
_cap = None


def _capture_loop():
    global _latest_frame, _latest_prediction, _camera_running, _camera_error, _cap

    # CAP_DSHOW avoids some silent-open failures on Windows
    _cap = cv2.VideoCapture(0, cv2.CAP_DSHOW)

    if not _cap.isOpened():
        _camera_error = "Could not open webcam (index 0). Is it in use by another app?"
        _camera_running = False
        return

    print("Camera started")

    while True:
        with _lock:
            if not _camera_running:
                break

        success, img = _cap.read()

        if not success:
            with _lock:
                _camera_error = "Lost connection to webcam."
                _camera_running = False
            break

        hands, img = detector.findHands(img)

        if hands:
            hand = hands[0]
            lmList = hand["lmList"]

            prediction, confidence = predict_gesture(lmList)

            x, y, w, h = hand["bbox"]

            cv2.rectangle(img, (x, y), (x + w, y + h), (255, 0, 255), 3)
            cv2.putText(
                img,
                f"{prediction} ({confidence:.1f}%)",
                (x, y - 20),
                cv2.FONT_HERSHEY_SIMPLEX,
                1,
                (0, 255, 0),
                2,
            )

            with _lock:
                _latest_prediction = prediction

        # Encode frame as JPEG for browser streaming (replaces cv2.imshow)
        ok, buffer = cv2.imencode(".jpg", img)
        if ok:
            with _lock:
                _latest_frame = buffer.tobytes()

    if _cap is not None:
        _cap.release()
        _cap = None

    print("Camera stopped")


def launch_camera():
    """Start the capture thread if it isn't already running."""
    global _capture_thread, _camera_running, _camera_error

    with _lock:
        if _camera_running:
            return True, None
        _camera_running = True
        _camera_error = None

    _capture_thread = threading.Thread(target=_capture_loop, daemon=True)
    _capture_thread.start()

    # Give the camera a brief moment to open so we can report failure fast
    time.sleep(0.5)

    with _lock:
        if _camera_error:
            return False, _camera_error
        return True, None


def stop_camera():
    global _camera_running
    with _lock:
        _camera_running = False


def get_prediction():
    with _lock:
        return _latest_prediction


def is_running():
    with _lock:
        return _camera_running


def get_error():
    with _lock:
        return _camera_error


def generate_mjpeg():
    """Yields multipart JPEG frames for an MJPEG HTTP stream."""
    while True:
        with _lock:
            frame = _latest_frame
            running = _camera_running

        if frame is not None:
            yield (
                b"--frame\r\n"
                b"Content-Type: image/jpeg\r\n\r\n" + frame + b"\r\n"
            )

        if not running:
            break

        time.sleep(0.03)  # ~30 fps cap