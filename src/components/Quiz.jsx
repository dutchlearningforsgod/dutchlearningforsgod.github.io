import { useState } from 'react'

export default function Quiz({ questions }) {
  const [queue, setQueue] = useState(questions)
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

      setTimeout(() => {
        setFeedback(null)

        setQueue(prev => {
          const updated = [...prev]
          const wrongQ = updated.splice(currentIndex, 1)[0]
          updated.push(wrongQ)
          return updated
        })
      }, 700)
    }
  }

  if (!question) {
    return <h2>Lesson completed 🎉</h2>
  }

  return (
    <div className="quiz-card">
      <h2 style={{ color: '#000' }}>
        {question.word}
      </h2>

      {feedback && (
        <h3
          style={{
            color:
              feedback === 'correct'
                ? 'green'
                : 'red'
          }}
        >
          {feedback === 'correct'
            ? 'Correct ✅'
            : 'Wrong ❌'}
        </h3>
      )}

      <div className="options">
        {question.options.map((option) => (
          <button
            key={option}
            className={`option-button ${
              feedback === 'correct' &&
              option === question.correct
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

      <p>
        Question {currentIndex + 1} / {queue.length}
      </p>
    </div>
  )
}