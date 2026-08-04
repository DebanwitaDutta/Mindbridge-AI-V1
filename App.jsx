import { useState } from "react";

import "./App.css";

import Home from "./pages/Home";
import Session from "./pages/Session";

function App() {

  const [page, setPage] = useState("home");

  const [patient, setPatient] = useState(null);

  const startSession = (patientData) => {

    setPatient(patientData);

    setPage("session");

  };

  const endSession = () => {

    setPage("home");

  };

  if (page === "session") {

    return (

      <Session

        patient={patient}

        onEnd={endSession}

      />

    );

  }

  return (

    <Home

      onSessionStart={startSession}

    />

  );

}

export default App;