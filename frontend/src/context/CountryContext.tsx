import React, { createContext, useState, useEffect, useCallback } from 'react'
import { getAllCountries } from '../api/countryService'
import { Country } from '../types/country'

interface CountryContextProps {
  countries: Country[]
  filteredCountries: Country[]
  visibleCountries: Country[]
  isLoading: boolean
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
  searchBy: 'name' | 'capital'
  setSearchBy: React.Dispatch<React.SetStateAction<'name' | 'capital'>>
  region: string
  setRegion: React.Dispatch<React.SetStateAction<string>>
  timezone: string
  setTimezone: React.Dispatch<React.SetStateAction<string>>
  selectedCountryCode: string | null
  setSelectedCountryCode: React.Dispatch<React.SetStateAction<string | null>>
  loadMoreCountries: () => void
}

export const CountryContext = createContext<CountryContextProps | undefined>(undefined)

const BATCH_SIZE = 20

export const CountryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [countries, setCountries] = useState<Country[]>([])
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchBy, setSearchBy] = useState<'name' | 'capital'>('name')
  const [region, setRegion] = useState('')
  const [timezone, setTimezone] = useState('')
  const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    getAllCountries()
      .then(setCountries)
      .catch((err) => console.error('Error fetching countries:', err))
      .finally(() => setIsLoading(false))
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

  const loadMoreCountries = useCallback(() => {
    if (visibleCount < filteredCountries.length) {
      setVisibleCount((prev) => prev + BATCH_SIZE)
    }
  }, [visibleCount, filteredCountries.length])

  return (
    <CountryContext.Provider
      value={{
        countries,
        filteredCountries,
        visibleCountries,
        isLoading,
        searchTerm,
        setSearchTerm,
        searchBy,
        setSearchBy,
        region,
        setRegion,
        timezone,
        setTimezone,
        selectedCountryCode,
        setSelectedCountryCode,
        loadMoreCountries,
      }}
    >
      {children}
    </CountryContext.Provider>
  )
}
