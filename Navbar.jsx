function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">MindBridge AI</div>
      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#features">Features</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#account" className="account-link">👤 Patient History</a></li>
      </ul>
    </nav>
  )
}

export default Navbar