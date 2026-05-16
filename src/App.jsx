import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

import Home from './pages/Home'
import LessonPage from './pages/LessonPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/lesson/:id"
          element={<LessonPage />}
        />
      </Routes>
    </BrowserRouter>
  )
}