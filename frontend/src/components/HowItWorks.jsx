function HowItWorks() {
  const steps = [
    { num: 1, label: 'Register Patient' },
    { num: 2, label: 'Detect Gestures' },
    { num: 3, label: 'AI Translation' },
    { num: 4, label: 'Generate Sentences' },
    { num: 5, label: 'Save Report' },
  ]

  return (
    <>
      <h2 className="section-title how-title" id="about">How It Works</h2>
      <div className="steps">
        {steps.map((step, i) => (
          <div key={step.num}>
            <div className="step">
              <div className="step-num">{step.num}</div>
              <span className="txt">{step.label}</span>
            </div>
            {i < steps.length - 1 && <div className="arrow">↓</div>}
          </div>
        ))}
      </div>
    </>
  )
}

export default HowItWorks