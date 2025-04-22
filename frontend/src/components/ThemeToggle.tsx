import { useEffect, useState } from 'react'
import { SunIcon, MoonIcon } from 'lucide-react'

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    const storedTheme = localStorage.getItem('theme')
    console.log('Initial stored theme:', storedTheme)
    if (storedTheme) {
      return storedTheme === 'dark'
    }
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    console.log('System prefers dark mode:', systemPrefersDark)
    return systemPrefersDark
  })

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      console.log('Applying dark theme')
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      console.log('Applying light theme')
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
    console.log('Current theme in localStorage:', localStorage.getItem('theme'))
  }, [isDark])

  return (
    <button
      onClick={() => {
        console.log('Toggling theme. Current isDark:', isDark)
        setIsDark((prev) => !prev)
      }}
      className="fixed top-4 right-4 z-50 p-2 bg-gray-700 text-white rounded-full shadow-md hover:bg-gray-600 transition"
      aria-label="Toggle Theme"
    >
      {isDark ? <SunIcon size={20} /> : <MoonIcon size={20} />}
    </button>
  )
}

export default ThemeToggle