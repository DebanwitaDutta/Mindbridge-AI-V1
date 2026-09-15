import { useState } from "react";

function PatientForm({ onClose, onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    patientId: "",
    age: "",
    gender: "",
    contact: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send patient data to Flask
      const response = await fetch("http://127.0.0.1:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Failed to register patient.");
      }

      const data = await response.json();

      console.log("Backend Response:", data);

      // Keep Claude's existing navigation/behaviour
      if (onSubmit) {
        onSubmit(form);
      }

      // Optional: close the modal after successful registration
      if (onClose) {
        onClose();
      }

    } catch (error) {
      console.error("Registration Error:", error);
      alert("Could not connect to backend.");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <h2 className="modal-title">Patient Details</h2>

        <p className="modal-subtitle">
          Fill this in before starting the session.
        </p>

        <form onSubmit={handleSubmit} className="patient-form">

          <label>
            Full Name
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Ananya Sharma"
              required
            />
          </label>

          <label>
            Patient ID
            <input
              type="text"
              name="patientId"
              value={form.patientId}
              onChange={handleChange}
              placeholder="e.g. PT-0042"
              required
            />
          </label>

          <div className="form-row">

            <label>
              Age
              <input
                type="number"
                name="age"
                min="0"
                value={form.age}
                onChange={handleChange}
                placeholder="e.g. 34"
                required
              />
            </label>

            <label>
              Gender
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">
                  Prefer not to say
                </option>
              </select>
            </label>

          </div>

          <label>
            Contact Number
            <input
              type="tel"
              name="contact"
              value={form.contact}
              onChange={handleChange}
              placeholder="e.g. +91 98765 43210"
            />
          </label>

          <label>
            Notes (optional)
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows="3"
              placeholder="Any relevant context before the session..."
            />
          </label>

          <button
            type="submit"
            className="btn-start modal-submit"
          >
            Begin Session
          </button>

        </form>
      </div>
    </div>
  );
}

export default PatientForm;