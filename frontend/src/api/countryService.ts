const BASE_URL = 'http://localhost:3000/api/countries'

export const getAllCountries = async () => {
  const res = await fetch(`${BASE_URL}`)
  if (!res.ok) throw new Error('Failed to fetch countries')
  return res.json()
}

export const getCountryByCode = async (code: string) => {
  const res = await fetch(`${BASE_URL}/${code}`)
  if (!res.ok) throw new Error('Failed to fetch country')
  return res.json()
}

export const getCountriesByRegion = async (region: string) => {
  const res = await fetch(`${BASE_URL}/region/${region}`)
  if (!res.ok) throw new Error('Failed to fetch countries by region')
  return res.json()
}

export const searchCountries = async (params: {
  name?: string
  capital?: string
  region?: string
  timezone?: string
}) => {
  const query = new URLSearchParams(params as Record<string, string>).toString()
  const res = await fetch(`${BASE_URL}/search?${query}`)
  if (!res.ok) throw new Error('Search request failed')
  return res.json()
}