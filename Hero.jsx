function Hero({ onStartSession }) {
  return (
    <section className="hero" id="home">
      <h1>AI Sign Language Communication Assistant</h1>
      <p>Helping psychologists communicate effortlessly with hearing and speech impaired patients.</p>
      <div className="btn-row">
        <button className="btn-start" onClick={onStartSession}>🚀 Start Session</button>
        <button className="btn-learn">Learn More</button>
      </div>
    </section>
  )
}

export default Hero