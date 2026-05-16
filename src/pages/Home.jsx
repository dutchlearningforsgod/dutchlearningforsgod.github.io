import { Link } from 'react-router-dom'
import '../App.css'

export default function Home() {
  const lessons = [1, 2, 3, 4, 5]

  return (
    <div className="app">
      <header className="hero">
        <h1>Learn Dutch 🇳🇱</h1>
        <p>Interactive Dutch lessons for beginners</p>
      </header>

      <section className="lesson-section">
        <h2>Choose a lesson</h2>

        <div className="lesson-grid">
          {lessons.map((lesson) => (
            <Link
              key={lesson}
              to={`/lesson/${lesson}`}
              className="lesson-card"
            >
              <h3>Lesson {lesson}</h3>
              <p>Start learning</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}