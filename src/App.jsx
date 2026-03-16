import { HashRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Survey from './pages/Survey'
import ThankYou from './pages/ThankYou'
import Timeline from './pages/Timeline'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/timeline" element={<Timeline />} />
      </Routes>
    </HashRouter>
  )
}
