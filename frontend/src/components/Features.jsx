function Features() {
  return (
    <>
      <h2 className="section-title" id="why-title">🤝 Why Choose MindBridge?</h2>

      <div className="features" id="features">
        <div className="card ai">
          <span className="icon-badge">🤖</span>
          <h3>AI Recognition</h3>
          <p>Recognizes hand gestures in real time.</p>
        </div>
        <div className="card cam">
          <span className="icon-badge">📹</span>
          <h3>Live Camera</h3>
          <p>Instant gesture detection using AI.</p>
        </div>
        <div className="card rep">
          <span className="icon-badge">📄</span>
          <h3>Reports</h3>
          <p>Generate complete patient reports.</p>
        </div>
      </div>
    </>
  )
}

export default Features