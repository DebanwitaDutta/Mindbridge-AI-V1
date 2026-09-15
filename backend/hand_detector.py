from cvzone.HandTrackingModule import HandDetector

# Detect up to 2 hands
detector = HandDetector(
    staticMode=False,
    maxHands=2,
    detectionCon=0.7,
    minTrackCon=0.5
)