import { useEffect, useState, useRef, useCallback } from 'react'
import { getAllCountries } from '../api/countryService'
import CountryCard from '../components/CountryCard' // Updated casing
import SearchBar from '../components/Searchbar'
import Filters from '../components/Filters'
import { Country } from '../types/country'
import CountryDetailModal from '../components/CountryDetailModel'

const BATCH_SIZE = 20

const CountryListPage: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([])
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchBy, setSearchBy] = useState<'name' | 'capital'>('name')
  const [region, setRegion] = useState('')
  const [timezone, setTimezone] = useState('')
  const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true) // Adding loading state
  const loader = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setIsLoading(true) // Start loading
    getAllCountries()
      .then(setCountries)
      .catch((err) => console.error('Error fetching countries:', err))
      .finally(() => setIsLoading(false)) // End loading
  }, [])

  const filteredCountries = countries.filter((country) => {
    const searchValue =
      searchBy === 'name'
        ? country.name?.common || ''
        : country.capital?.[0] || ''

    const searchMatch = searchTerm
      ? searchValue.toLowerCase().includes(searchTerm.toLowerCase())
      : true

    const regionMatch = region ? country.region === region : true
    const timezoneMatch = timezone ? country.timezones?.includes(timezone) : true

    return searchMatch && regionMatch && timezoneMatch
  })

  const visibleCountries = filteredCountries.slice(0, visibleCount)

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries
      if (entry.isIntersecting && visibleCount < filteredCountries.length) {
        setVisibleCount((prev) => prev + BATCH_SIZE)
      }
    },
    [visibleCount, filteredCountries.length]
  )

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '200px',
      threshold: 0,
    })

    if (loader.current) observer.observe(loader.current)

    return () => {
      if (loader.current) observer.unobserve(loader.current)
    }
  }, [handleObserver])

  const allTimezones = Array.from(
    new Set(countries.flatMap((c) => c.timezones || []))
  ).sort()

  // Disable scroll when modal is open
  useEffect(() => {
    if (selectedCountryCode) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [selectedCountryCode])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2A4365] via-[#4FD1C5] to-[#2A4365] px-4 py-10 md:px-12 lg:px-24 space-y-12 relative text-white">
      {/* Hero Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl md:text-5xl font-extrabold text-off-white drop-shadow-lg">Discover Countries</h1>
        <p className="text-[#4FD1C5] text-lg">Search, filter, and explore countries around the globe 🌍</p>
      </div>

      {/* Search + Filters */}
      <div className="max-w-5xl mx-auto backdrop-blur-lg bg-[#2D3748]/70 border border-[#4FD1C5] p-6 rounded-3xl shadow-xl space-y-6">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchBy={searchBy}
          setSearchBy={setSearchBy}
        />
        <Filters
          selectedRegion={region}
          setSelectedRegion={setRegion}
          selectedTimezone={timezone}
          setSelectedTimezone={setTimezone}
          allTimezones={allTimezones}
        />
      </div>

      {/* Country Cards */}
      <div className="max-w-7xl mx-auto bg-[#1A202C] p-8 rounded-3xl shadow-2xl space-y-10 relative z-0">
        {isLoading && (
          <div className="text-[#4FD1C5] text-center text-lg">Loading countries...</div>
        )}

        {!isLoading && filteredCountries.length === 0 && (
          <div className="text-[#4FD1C5] text-center text-lg">
            No countries match the search/filter criteria.
          </div>
        )}

        {visibleCountries.length > 0 && !isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {visibleCountries.map((country, i) => (
              <div
                key={country.cca3}
                onClick={() => setSelectedCountryCode(country.cca3)}
                className="cursor-pointer transition-transform hover:scale-105 hover:shadow-2xl"
                style={{ animationDelay: `${i * 50}ms`, animation: 'fadeInUp 0.4s ease-out forwards' }}
              >
                <CountryCard
                  name={country.name?.common || 'Unknown'}
                  region={country.region || 'Unknown'}
                  flag={country.flags?.svg || country.flags?.png || ''}
                  timezone={country.timezones?.[0] || 'UTC'}
                />
              </div>
            ))}
          </div>
        )}

        <div ref={loader} className="h-16 text-center text-[#4FD1C5] text-sm pt-4">
          {visibleCount < filteredCountries.length
            ? 'Loading more countries...'
            : 'All countries loaded.'}
        </div>
      </div>

      {/* Country Detail Modal with Dark Overlay */}
      {selectedCountryCode && (
        <>
          {/* Glowing Backdrop */}
          <div
            className="fixed inset-0 bg-gradient-to-t from-[#2D3748] via-[#1A202C] to-[#2B6CB0] backdrop-blur-lg z-40 shadow-lg"
            onClick={() => setSelectedCountryCode(null)} // Close modal when clicking outside
          ></div>

          {/* Modal */}
          <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <CountryDetailModal
              code={selectedCountryCode}
              onClose={() => setSelectedCountryCode(null)}
            />
          </div>
        </>
      )}

      {/* Animation Keyframes */}
      <style>
        {`
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  )
}

export default CountryListPage