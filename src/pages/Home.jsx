import { Link } from 'react-router-dom'

import lessons from '../data/lessons'
import '../App.css'

export default function Home() {
  return (
    <div className="app">
      <header className="hero">
        <h1>Learn Dutch</h1>

        <p>
          Interactive Dutch lessons
        </p>
      </header>

      <section className="lesson-section">
        <h2>Choose a lesson</h2>

        <div className="lesson-grid">
          {lessons.map((lesson) => (
            <Link
              key={lesson.id}
              to={`/lesson/${lesson.id}`}
              className="lesson-card"
            >
              <h3>
                Lesson {lesson.id}
              </h3>

              <p>{lesson.title}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}