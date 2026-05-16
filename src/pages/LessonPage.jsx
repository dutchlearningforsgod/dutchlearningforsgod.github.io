import { useParams, Link } from 'react-router-dom'

import lessons from '../data/lessons'
import Quiz from '../components/Quiz'

export default function LessonPage() {
  const { id } = useParams()

  const lesson = lessons.find(
    lesson => lesson.id === Number(id)
  )

  if (!lesson) {
    return <h1>Lesson not found</h1>
  }

  return (
    <div className="lesson-page">
      <Link to="/">← Back to home</Link>

      <h1>
        Lesson {lesson.id} — {lesson.title}
      </h1>

      <p>{lesson.description}</p>

      <Quiz questions={lesson.questions} />
    </div>
  )
}