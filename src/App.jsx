import './App.css'

export default function App() {
  return (
    <div className="app">
      <header className="hero">
        <h1>Learn Dutch</h1>
        <p>
          Interactive Dutch lessons for beginners.
        </p>

        <a href="#lesson1" className="start-button">
          Start Lesson 1
        </a>
      </header>

      <section id="lesson1" className="lesson-section">
        <h2>Lesson 1 — Greetings</h2>

        <div className="lesson-card">
          <h3>Hallo</h3>
          <p>Hello</p>
        </div>

        <div className="lesson-card">
          <h3>Dank je</h3>
          <p>Thank you</p>
        </div>

        <div className="lesson-card">
          <h3>Tot ziens</h3>
          <p>Goodbye</p>
        </div>
      </section>
    </div>
  )
}