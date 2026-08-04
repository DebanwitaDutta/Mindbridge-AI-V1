import csv
import os

CSV_FILE = "dataset/gesture_data.csv"


def save_landmarks(landmarks, gesture_name):
    """
    Saves one hand's landmarks to CSV.
    """

    if landmarks is None:
        return

    # Create dataset folder if it doesn't exist
    os.makedirs("dataset", exist_ok=True)

    # Flatten x,y,z values
    row = []

    for point in landmarks:
        row.append(point[0])   # x
        row.append(point[1])   # y
        row.append(point[2])   # z

    row.append(gesture_name)

    with open(CSV_FILE, "a", newline="") as file:
        writer = csv.writer(file)
        writer.writerow(row)

    print(f"Saved sample for '{gesture_name}'")