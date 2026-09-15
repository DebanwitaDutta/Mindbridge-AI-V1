import { useEffect, useState } from "react";

function Session({ patient, onEnd }) {
  const [prediction, setPrediction] = useState("Waiting...");
  const [cameraStarted, setCameraStarted] = useState(false);
  const [cameraError, setCameraError] = useState(null);

  useEffect(() => {
    async function startCamera() {
      try {
        const res = await fetch("http://127.0.0.1:5000/start-camera", {
          method: "POST",
        });

        const data = await res.json();

        if (data.success) {
          setCameraStarted(true);
          setCameraError(null);
        } else {
          setCameraStarted(false);
          setCameraError(data.error || "Unknown camera error");
        }
      } catch (err) {
        console.error(err);
        setCameraError("Could not reach backend. Is it running?");
      }
    }

    startCamera();

    const interval = setInterval(async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/prediction");
        const data = await res.json();

        if (data.prediction) {
          setPrediction(data.prediction);
        }
      } catch (err) {
        console.log(err);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  async function endSession() {
    try {
      await fetch("http://127.0.0.1:5000/stop-camera", {
        method: "POST",
      });
    } catch (err) {
      console.log(err);
    }

    onEnd();
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "40px",
      }}
    >
      <h1>MindBridge AI Session</h1>

      <hr />

      <h2>Patient Details</h2>

      <p><b>Name:</b> {patient?.name}</p>
      <p><b>ID:</b> {patient?.patientId}</p>
      <p><b>Age:</b> {patient?.age}</p>
      <p><b>Gender:</b> {patient?.gender}</p>

      <br />

      <h2>
        Camera Status :
        {cameraError
          ? " 🔴 Error"
          : cameraStarted
          ? " 🟢 Running"
          : " 🟡 Starting..."}
      </h2>

      {cameraError && (
        <p style={{ color: "#f87171" }}>
          {cameraError}
        </p>
      )}

      <br />

      {cameraStarted && !cameraError && (
        <img
          src="http://127.0.0.1:5000/video-feed"
          alt="Live camera feed"
          style={{
            width: "640px",
            maxWidth: "100%",
            borderRadius: "12px",
            border: "2px solid #334155",
          }}
        />
      )}

      <br />

      <h1>{prediction}</h1>

      <br />

      <button
        onClick={endSession}
        style={{
          padding: "15px 30px",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        End Session
      </button>
    </div>
  );
}

export default Session;
