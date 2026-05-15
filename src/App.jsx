export default function App() {
  return (
    <div>
      <h1>Learn Dutch</h1>
      <p>Welkom bij Dutch Learning!</p>
    </div>
  )
}

import lesson1 from './data/lesson1'

export default function App() {
  return (
    <div style={{ padding: '40px' }}>
      <h1>{lesson1.title}</h1>

      {lesson1.words.map((word, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <h2>{word.dutch}</h2>
          <p>{word.english}</p>
        </div>
      ))}
    </div>
  )
}
