import { useState } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import PatientForm from "../components/PatientForm";

function Home({ onSessionStart }) {

  const [showForm, setShowForm] = useState(false);

  function handleStartSession() {
    setShowForm(true);
  }

  function handleCloseForm() {
    setShowForm(false);
  }

  function handleFormSubmit(patientData) {

    console.log("Patient Registered");

    console.log(patientData);

    setShowForm(false);

    if (onSessionStart) {
      onSessionStart(patientData);
    }

  }

  return (
    <div className="page">

      <Navbar />

      <Hero
        onStartSession={handleStartSession}
      />

      <Features />

      <HowItWorks />

      <footer>
        © 2026 MindBridge AI — Bridging communication, one gesture at a time.
      </footer>

      {showForm && (

        <PatientForm

          onClose={handleCloseForm}

          onSubmit={handleFormSubmit}

        />

      )}

    </div>
  );
}

export default Home;