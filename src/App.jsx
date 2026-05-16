
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Lesson1 from './pages/Lesson1'


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lesson/1" element={<Lesson1 />} />
      </Routes>
    </BrowserRouter>
  )
}

