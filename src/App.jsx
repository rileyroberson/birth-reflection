import { HashRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Survey from './pages/Survey'
import ThankYou from './pages/ThankYou'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </HashRouter>
  )
}
