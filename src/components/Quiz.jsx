import { useState, useMemo, useEffect } from 'react'

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5)
}

// ------------------------------------
// Matching sub-component
// ------------------------------------
function MatchingQuiz({ question, onComplete }) {
  const dutchWords   = useMemo(() => shuffleArray(question.pairs.map(p => p.dutch)),   [question])
  const englishWords = useMemo(() => shuffleArray(question.pairs.map(p => p.english)), [question])

  const [selectedDutch,   setSelectedDutch]   = useState(null)
  const [selectedEnglish, setSelectedEnglish] = useState(null)
  const [matched,  setMatched]  = useState([])
  const [flashing, setFlashing] = useState(null)

  useEffect(() => {
    if (!selectedDutch || !selectedEnglish) return

    const pair = question.pairs.find(p => p.dutch === selectedDutch)
    const isCorrect = pair && pair.english === selectedEnglish

    setFlashing(isCorrect ? 'correct' : 'wrong')

    setTimeout(() => {
      if (isCorrect) {
        const newMatched = [...matched, selectedDutch]
        setMatched(newMatched)
        if (newMatched.length === question.pairs.length) {
          setTimeout(() => onComplete(), 400)
        }
      }
      setSelectedDutch(null)
      setSelectedEnglish(null)
      setFlashing(null)
    }, 600)
  }, [selectedDutch, selectedEnglish])

  function getStyle(word, side) {
    const isSelected = side === 'dutch' ? selectedDutch === word : selectedEnglish === word
    const dutchKey   = side === 'dutch' ? word : question.pairs.find(p => p.english === word)?.dutch
    const isMatched  = matched.includes(dutchKey)

    if (isMatched)                            return { background: '#16a34a', color: 'white', opacity: 0.55, cursor: 'default' }
    if (isSelected && flashing === 'correct') return { background: '#16a34a', color: 'white' }
    if (isSelected && flashing === 'wrong')   return { background: '#dc2626', color: 'white' }
    if (isSelected)                           return { background: '#1d4ed8', color: 'white' }
    return {}
  }

  return (
    <div>
      <p style={{ color: '#555', marginBottom: '20px' }}>
        Tap a Dutch word, then its English translation.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {dutchWords.map(word => (
            <button
              key={word}
              className="option-button"
              disabled={matched.includes(word)}
              style={getStyle(word, 'dutch')}
              onClick={() => !flashing && setSelectedDutch(word)}
            >
              {word}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {englishWords.map(word => (
            <button
              key={word}
              className="option-button"
              disabled={matched.includes(question.pairs.find(p => p.english === word)?.dutch)}
              style={getStyle(word, 'english')}
              onClick={() => !flashing && setSelectedEnglish(word)}
            >
              {word}
            </button>
          ))}
        </div>
      </div>

      <p style={{ color: '#000', marginTop: '16px' }}>
        Matched: {matched.length} / {question.pairs.length}
      </p>
    </div>
  )
}

// ------------------------------------
// Listening sub-component
// ------------------------------------
function ListeningQuiz({ question, onResult }) {
  const [input,     setInput]     = useState('')
  const [hasPlayed, setHasPlayed] = useState(false)

  function speak() {
    window.speechSynthesis.cancel()
    const utt = new SpeechSynthesisUtterance(question.dutch)
    utt.lang = 'nl-NL'
    utt.rate = 0.85
    window.speechSynthesis.speak(utt)
    setHasPlayed(true)
  }

  function handleSubmit(e) {
    e.preventDefault()
    const ok = input.trim().toLowerCase() === question.dutch.toLowerCase()
    onResult(ok)
  }

  return (
    <div className="typing-form">
      <p style={{ color: '#555' }}>
        Press Play, listen carefully, then type what you hear.
      </p>

      <p style={{ color: '#888', fontStyle: 'italic' }}>
        {question.hint}
      </p>

      <button
        type="button"
        className="option-button"
        onClick={speak}
        style={{ fontSize: '1.4rem', padding: '20px' }}
      >
        🔊 Play
      </button>

      {hasPlayed && (
        <form onSubmit={handleSubmit} className="typing-form">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            className="typing-input"
            placeholder="Type what you heard..."
            autoFocus
          />
          <button className="option-button">Check</button>
        </form>
      )}
    </div>
  )
}

// ------------------------------------
// Fill-in-the-blank sub-component
// ------------------------------------
function FillBlankQuiz({ question, onResult }) {
  const shuffledOptions = useMemo(
    () => shuffleArray(question.options),
    [question]
  )

  const [chosen,   setChosen]   = useState(null)
  const [revealed, setRevealed] = useState(false)

  function handlePick(option) {
    if (revealed) return
    const isCorrect = option === question.correct
    setChosen(option)
    setRevealed(true)
    setTimeout(() => onResult(isCorrect), 900)
  }

  function optionStyle(option) {
    if (!revealed) return {}
    if (option === question.correct) return { background: '#16a34a', color: 'white' }
    if (option === chosen)           return { background: '#dc2626', color: 'white' }
    return { opacity: 0.45 }
  }

  return (
    <div>
      <p style={{
        fontSize: '1.15rem',
        lineHeight: '2',
        color: '#111',
        margin: '0 0 28px',
        textAlign: 'left'
      }}>
        {question.before}{' '}
        <span style={{
          display: 'inline-block',
          minWidth: '110px',
          borderBottom: '3px solid #2563eb',
          textAlign: 'center',
          fontWeight: 'bold',
          color: revealed ? '#2563eb' : 'transparent',
          transition: 'color 0.3s'
        }}>
          {revealed ? question.correct : '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'}
        </span>
        {' '}{question.after}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {shuffledOptions.map((option, i) => (
          <button
            key={option}
            className="option-button"
            style={optionStyle(option)}
            onClick={() => handlePick(option)}
            disabled={revealed}
          >
            <span style={{ opacity: 0.6, marginRight: '6px', fontSize: '0.85rem' }}>
              {['A', 'B', 'C', 'D'][i]}
            </span>
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

// ------------------------------------
// Main Quiz component
// ------------------------------------
export default function Quiz({ lesson }) {
  const [queue,          setQueue]          = useState(lesson.questions)
  const [currentIndex,   setCurrentIndex]   = useState(0)
  const [feedback,       setFeedback]       = useState(null)
  const [lastWasCorrect, setLastWasCorrect] = useState(false)
  const [input,          setInput]          = useState('')
  const [selectedWords,  setSelectedWords]  = useState([])
  const [stats, setStats] = useState({ correct: 0, wrong: 0 })

  const isFinished = queue.length === 0
  const question   = queue[currentIndex]

  // Hooks must always run before any early return
  const shuffledOptions = useMemo(() => {
    if (!question || lesson.type !== 'multiple-choice') return []
    return shuffleArray(question.options)
  }, [question])

  const shuffledWords = useMemo(() => {
    if (!question || lesson.type !== 'sentence-builder') return []
    return shuffleArray(question.words)
  }, [question])

  if (isFinished) {
    const total = stats.correct + stats.wrong
    const pct   = total > 0 ? Math.round((stats.correct / total) * 100) : 0
    return (
      <div className="quiz-card">
        <h2 style={{ color: '#000' }}>Lesson Complete 🎉</h2>
        <p style={{ color: '#000' }}>Correct: {stats.correct}</p>
        <p style={{ color: '#000' }}>Wrong: {stats.wrong}</p>
        {lesson.type === 'fill-in-the-blank' && (
          <p style={{ color: '#000', fontWeight: 'bold', fontSize: '1.2rem' }}>
            Score: {pct}% {pct >= 80 ? '⭐' : pct >= 60 ? '👍' : '📚'}
          </p>
        )}
      </div>
    )
  }

  function handleResult(isCorrect) {
    setLastWasCorrect(isCorrect)
    setFeedback({
      correctAnswer: lesson.type === 'listening' ? question.dutch : question.correct
    })
    setStats(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      wrong:   prev.wrong   + (isCorrect ? 0 : 1)
    }))
  }

  function continueLesson() {
    let updated = [...queue]
    if (lastWasCorrect) {
      updated.splice(currentIndex, 1)
    } else {
      const wrong = updated.splice(currentIndex, 1)[0]
      updated.push(wrong)
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
    handleResult(input.trim().toLowerCase() === question.correct.toLowerCase())
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
    handleResult(selectedWords.join(' ') === question.correct)
  }

  // Matching: inline flashing, no separate feedback card
  if (lesson.type === 'matching' && !feedback) {
    return (
      <div className="quiz-card">
        <h2 style={{ color: '#000' }}>Match the pairs</h2>
        <MatchingQuiz
          key={currentIndex}
          question={question}
          onComplete={() => handleResult(true)}
        />
        <p style={{ color: '#000', marginTop: '16px' }}>
          Round {stats.correct + stats.wrong + 1} of {lesson.questions.length} |
          Correct: {stats.correct} | Wrong: {stats.wrong}
        </p>
      </div>
    )
  }

  // Fill-in-the-blank: inline flashing, auto-advances, no feedback card
  if (lesson.type === 'fill-in-the-blank' && !feedback) {
    return (
      <div className="quiz-card">
        <h2 style={{ color: '#000' }}>Fill in the blank</h2>

        <p style={{ color: '#555', fontSize: '0.9rem', marginBottom: '8px' }}>
          Question {stats.correct + stats.wrong + 1} of {lesson.questions.length}
        </p>

        <FillBlankQuiz
          key={question.before}
          question={question}
          onResult={(isCorrect) => {
            setStats(prev => ({
              correct: prev.correct + (isCorrect ? 1 : 0),
              wrong:   prev.wrong   + (isCorrect ? 0 : 1)
            }))
            let updated = [...queue]
            updated.splice(currentIndex, 1)
            setQueue(updated)
            setCurrentIndex(0)
          }}
        />

        <p style={{ color: '#000', marginTop: '20px' }}>
          Correct: {stats.correct} | Wrong: {stats.wrong}
        </p>
      </div>
    )
  }

  return (
    <div className="quiz-card">
      <h2 style={{ color: '#000' }}>
        {lesson.type === 'sentence-builder'
          ? `Translate: "${question.prompt}"`
          : lesson.type === 'listening'
          ? 'Listen and type what you hear'
          : question.question}
      </h2>

      {/* FEEDBACK SCREEN */}
      {feedback ? (
        <div className="feedback-box">
          <h3 style={{ color: lastWasCorrect ? 'green' : 'red' }}>
            {lastWasCorrect ? 'Correct ✅' : 'Wrong ❌'}
          </h3>

          <p style={{ color: '#000' }}>Correct answer:</p>

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
                onChange={e => setInput(e.target.value)}
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
                  {selectedWords.join(' ') || '…'}
                </h3>
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
                <button className="option-button" onClick={removeLastWord}>Undo</button>
                <button className="option-button" onClick={clearSentence}>Clear</button>
                <button className="continue-button" onClick={checkSentence}>Check</button>
              </div>
            </div>
          )}

          {/* LISTENING */}
          {lesson.type === 'listening' && (
            <ListeningQuiz
              key={currentIndex}
              question={question}
              onResult={handleResult}
            />
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