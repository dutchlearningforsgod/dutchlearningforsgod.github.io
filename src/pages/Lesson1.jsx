import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'

export default function Lesson1() {
  const questions = [
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

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)

  const question = questions[currentQuestion]

  function handleAnswer(option) {
    if (option === question.correct) {
      setScore(score + 1)
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      alert(`Finished! Score: ${score + 1}/${questions.length}`)
    }
  }

  return (
    <div className="lesson-page">
      <Link to="/">← Back to home</Link>

      <h1>Lesson 1 — Greetings</h1>

      <div className="quiz-card">
        <h2>{question.word}</h2>

        <div className="options">
          {question.options.map((option) => (
            <button
              key={option}
              className="option-button"
              onClick={() => handleAnswer(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <p>
        Question {currentQuestion + 1} / {questions.length}
      </p>
    </div>
  )
}