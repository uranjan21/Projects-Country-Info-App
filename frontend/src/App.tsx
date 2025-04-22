import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { CountryProvider } from './context/CountryContext'
import CountryListPage from './pages/CountryListPage'

const App: React.FC = () => {
  return (
    <CountryProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            {/* Default to /country */}
            <Route path="/" element={<Navigate to="/country" replace />} />
            {/* Main country list with modal logic inside */}
            <Route path="/country" element={<CountryListPage />} />
          </Routes>
        </div>
      </Router>
    </CountryProvider>
  )
}

export default App