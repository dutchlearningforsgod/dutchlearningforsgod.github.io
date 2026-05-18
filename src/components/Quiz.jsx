import { useState, useMemo } from 'react'

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5)
}

export default function Quiz({ lesson }) {
  const [queue, setQueue] = useState(lesson.questions)
  const [currentIndex, setCurrentIndex] = useState(0)

  const [feedback, setFeedback] = useState(null)
  const [lastWasCorrect, setLastWasCorrect] = useState(false)

  const [input, setInput] = useState('')
  const [selectedWords, setSelectedWords] = useState([])

  const [stats, setStats] = useState({
    correct: 0,
    wrong: 0
  })

  const isFinished = queue.length === 0
  const question = queue[currentIndex]

  // ✅ Hooks must always be called — before any early return
  const shuffledOptions = useMemo(() => {
    if (!question || lesson.type !== 'multiple-choice') return []
    return shuffleArray(question.options)
  }, [question])

  const shuffledWords = useMemo(() => {
    if (!question || lesson.type !== 'sentence-builder') return []
    return shuffleArray(question.words)
  }, [question])

  if (isFinished) {
    return (
      <div className="quiz-card">
        <h2 style={{ color: '#000' }}>
          Lesson Complete 🎉
        </h2>

        <p style={{ color: '#000' }}>
          Correct: {stats.correct}
        </p>

        <p style={{ color: '#000' }}>
          Wrong: {stats.wrong}
        </p>
      </div>
    )
  }

  function handleResult(isCorrect) {
    setLastWasCorrect(isCorrect)

    setFeedback({
      correctAnswer: question.correct
    })

    setStats(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      wrong: prev.wrong + (isCorrect ? 0 : 1)
    }))
  }

  function continueLesson() {
    let updated = [...queue]

    if (lastWasCorrect) {
      updated.splice(currentIndex, 1)
    } else {
      const wrongQuestion = updated.splice(currentIndex, 1)[0]
      updated.push(wrongQuestion)
    }

    setQueue(updated)
    setCurrentIndex(0)
    setFeedback(null)
    setInput('')
    setSelectedWords([])
  }

  function handleMultiple(option) {
    handleResult(option === question.correct)
  }

  function handleTyping(e) {
    e.preventDefault()
    const ok =
      input.trim().toLowerCase() === question.correct.toLowerCase()
    handleResult(ok)
  }

  function handleWordClick(word) {
    setSelectedWords(prev => [...prev, word])
  }

  function removeLastWord() {
    setSelectedWords(prev => prev.slice(0, -1))
  }

  function clearSentence() {
    setSelectedWords([])
  }

  function checkSentence() {
    const answer = selectedWords.join(' ')
    const ok = answer === question.correct
    handleResult(ok)
  }

  return (
    <div className="quiz-card">
      <h2 style={{ color: '#000' }}>
        {lesson.type === 'sentence-builder'
            ? `Translate: "${question.prompt}"`
            : question.question}
      </h2>

      {/* FEEDBACK SCREEN */}
      {feedback ? (
        <div className="feedback-box">
          <h3 style={{ color: lastWasCorrect ? 'green' : 'red' }}>
            {lastWasCorrect ? 'Correct ✅' : 'Wrong ❌'}
          </h3>

          <p>Correct answer:</p>

          <h2 style={{ color: '#000' }}>
            {feedback.correctAnswer}
          </h2>

          <button className="continue-button" onClick={continueLesson}>
            Continue
          </button>
        </div>

      ) : (
        <>
          {/* MULTIPLE CHOICE */}
          {lesson.type === 'multiple-choice' && (
            <div className="options">
              {shuffledOptions.map(option => (
                <button
                  key={option}
                  className="option-button"
                  onClick={() => handleMultiple(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {/* TYPING */}
          {lesson.type === 'typing' && (
            <form onSubmit={handleTyping} className="typing-form">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="typing-input"
                placeholder="Type answer..."
              />
              <button className="option-button">Check</button>
            </form>
          )}

          {/* SENTENCE BUILDER */}
          {lesson.type === 'sentence-builder' && (
            <div>
              <div className="options">
                {shuffledWords.map(word => (
                  <button
                    key={word}
                    className="option-button"
                    onClick={() => handleWordClick(word)}
                  >
                    {word}
                  </button>
                ))}
              </div>

              <div style={{ marginTop: '20px' }}>
                <h3 style={{ color: '#000' }}>
                  {selectedWords.join(' ')}
                </h3>
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
                <button className="option-button" onClick={removeLastWord}>
                  Undo
                </button>
                <button className="option-button" onClick={clearSentence}>
                  Clear
                </button>
                <button className="continue-button" onClick={checkSentence}>
                  Check
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* PROGRESS */}
      <p style={{ color: '#000' }}>
        Remaining: {queue.length} | Correct: {stats.correct} | Wrong: {stats.wrong}
      </p>
    </div>
  )
}
