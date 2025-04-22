import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { CountryProvider } from './context/CountryContext'
import CountryListPage from './pages/CountryListPage'
import ThemeToggle from './components/ThemeToggle'

const App: React.FC = () => {
  return (
    <CountryProvider>
      <Router>
        <ThemeToggle />
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
          <Routes>
            <Route path="/" element={<Navigate to="/country" replace />} />
            <Route path="/country" element={<CountryListPage />} />
          </Routes>
        </div>
      </Router>
    </CountryProvider>
  )
}

export default App