import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'

export default function Lesson1() {
  const initialQuestions = [
    {
      word: 'Hallo',
      correct: 'Hello',
      options: ['Goodbye', 'Please', 'Hello', 'Thanks']
    },
    {
      word: 'Dank je',
      correct: 'Thank you',
      options: ['Sorry', 'Thank you', 'Good morning', 'Goodbye']
    },
    {
      word: 'Tot ziens',
      correct: 'Goodbye',
      options: ['Goodbye', 'Hello', 'Please', 'Yes']
    }
  ]

  const [queue, setQueue] = useState(initialQuestions)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [feedback, setFeedback] = useState(null)

  const question = queue[currentIndex]

  function handleAnswer(option) {
    if (!question) return

    const isCorrect = option === question.correct

    if (isCorrect) {
      setFeedback('correct')

      setTimeout(() => {
        const next = currentIndex + 1
        setFeedback(null)

        if (next < queue.length) {
          setCurrentIndex(next)
        } else {
          alert('Lesson completed! 🎉')
        }
      }, 700)

    } else {
      setFeedback('wrong')

      // move question to end of queue (retry later)
      setTimeout(() => {
        setFeedback(null)

        setQueue(prev => {
          const updated = [...prev]
          const wrongQ = updated.splice(currentIndex, 1)[0]
          updated.push(wrongQ)
          return updated
        })

        // stay on same index (new question slides in)
      }, 700)
    }
  }

  if (!question) return <div>Loading...</div>

  return (
    <div className="lesson-page">
      <Link to="/">← Back to home</Link>

      <h1>Lesson 1 — Greetings</h1>

      <div className="quiz-card">
        <h2 style={{ color: '#000' }}>{question.word}</h2>

        {feedback && (
          <h3 style={{
            color: feedback === 'correct' ? 'green' : 'red'
          }}>
            {feedback === 'correct' ? 'Correct ✅' : 'Wrong ❌'}
          </h3>
        )}

        <div className="options">
          {question.options.map((option) => (
            <button
              key={option}
              className={`option-button ${
                feedback === 'correct' && option === question.correct
                  ? 'correct'
                  : ''
              }`}
              onClick={() => handleAnswer(option)}
              disabled={feedback !== null}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}