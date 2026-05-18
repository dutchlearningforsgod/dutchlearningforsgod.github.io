import { Link } from 'react-router-dom'
import lessons from '../data/lessons'
import '../App.css'

const typeLabels = {
  'multiple-choice':   '🔤 Multiple Choice',
  'typing':            '⌨️ Typing',
  'matching':          '🔗 Matching',
  'listening':         '🔊 Listening',
  'sentence-builder':  '🧩 Sentence Builder',
  'fill-in-the-blank': '📝 Final Test',
}

const typeColors = {
  'multiple-choice':   '#2563eb',
  'typing':            '#7c3aed',
  'matching':          '#0891b2',
  'listening':         '#d97706',
  'sentence-builder':  '#059669',
  'fill-in-the-blank': '#dc2626',
}

export default function Home() {
  return (
    <div className="app">
      <header className="hero">
        <h1>Learn Dutch</h1>
        <p>Interactive Dutch lessons for miss Sgod</p>
      </header>

      <section className="lesson-section">
        <h2>Choose a lesson</h2>

        <div className="lesson-grid">
          {lessons.map((lesson) => (
            <Link
              key={lesson.id}
              to={`/lesson/${lesson.id}`}
              className="lesson-card"
              style={{ textDecoration: 'none' }}
            >
              <div style={{
                display: 'inline-block',
                background: typeColors[lesson.type] || '#2563eb',
                color: 'white',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                padding: '3px 10px',
                borderRadius: '20px',
                marginBottom: '10px',
              }}>
                {typeLabels[lesson.type] || lesson.type}
              </div>

              <h4 style={{ margin: '0 0 6px', color: '#000' }}>
                Lesson {lesson.id}
              </h4>

              <p style={{ margin: 0, color: '#444', fontSize: '0.9rem' }}>
                {lesson.title}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}