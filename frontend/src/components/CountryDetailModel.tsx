import { useEffect, useState } from 'react'
import { getCountryByCode } from '../api/countryService'
import { Country } from '../types/country'

interface Props {
  code: string
  onClose: () => void
}

const CountryDetailModal: React.FC<Props> = ({ code, onClose }) => {
  const [country, setCountry] = useState<Country | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    getCountryByCode(code)
      .then(setCountry)
      .catch(() => setError('Country not found'))
  }, [code])

  const closeModal = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (error) {
    return (
      <div
        className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-md bg-opacity-30"
        onClick={closeModal}
      >
        <div className="bg-gray-900 text-red-400 p-6 rounded-xl shadow-xl border border-red-500/50">
          {error}
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    )
  }

  if (!country) {
    return (
      <div
        className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-md bg-opacity-30"
        onClick={closeModal}
      >
        <div className="flex space-x-4">
          <div className="w-40 h-40 bg-gray-700 rounded-xl animate-pulse"></div>
          <div className="space-y-6">
            <div className="h-6 w-48 bg-gray-700 rounded animate-pulse"></div>
            <div className="h-6 w-64 bg-gray-700 rounded animate-pulse"></div>
            <div className="h-6 w-56 bg-gray-700 rounded animate-pulse"></div>
            <div className="h-6 w-64 bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  const {
    name,
    region,
    subregion,
    capital,
    population,
    flags,
    timezones,
    currencies,
    languages,
  } = country

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={closeModal}
    >
      {/* Modal Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-gray-800 opacity-80 backdrop-blur-md" />

      {/* Modal Content */}
      <div
        className="relative w-full max-w-3xl mx-4 sm:mx-6 bg-gray-900 text-white rounded-2xl p-8 border border-cyan-500/30 shadow-[0_0_25px_2px_rgba(0,255,255,0.2)] animate-fadeInUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl"
        >
          &times;
        </button>

        <div className="md:flex gap-6">
          <div className="md:w-1/2 flex justify-center items-center mb-6 md:mb-0">
            <img
              src={flags?.svg || flags?.png}
              alt={name?.common}
              className="w-full max-w-xs rounded-lg shadow-xl border border-cyan-500/20 hover:shadow-[0_0_15px_4px_rgba(0,255,255,0.3)] transform hover:scale-105 transition-all duration-300"
            />
          </div>

          <div className="md:w-1/2 space-y-4">
            <h2 className="text-3xl font-bold text-cyan-300">{name?.common}</h2>
            <p><span className="font-semibold text-cyan-400">Official Name:</span> {name?.official}</p>
            <p><span className="font-semibold text-cyan-400">Region:</span> {region} {subregion && `(${subregion})`}</p>
            <p><span className="font-semibold text-cyan-400">Capital:</span> {capital?.[0] || 'N/A'}</p>
            <p><span className="font-semibold text-cyan-400">Population:</span> {population.toLocaleString()}</p>
            <p><span className="font-semibold text-cyan-400">Timezones:</span> {timezones?.join(', ')}</p>
            <p>
              <span className="font-semibold text-cyan-400">Currencies:</span>{' '}
              {currencies
                ? Object.values(currencies).map((c: any) => `${c.name} (${c.symbol})`).join(', ')
                : 'N/A'}
            </p>
            <p>
              <span className="font-semibold text-cyan-400">Languages:</span>{' '}
              {languages ? Object.values(languages).join(', ') : 'N/A'}
            </p>
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style>
        {`
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeInUp {
            animation: fadeInUp 0.5s ease-out forwards;
          }
        `}
      </style>
    </div>
  )
}

export default CountryDetailModal
