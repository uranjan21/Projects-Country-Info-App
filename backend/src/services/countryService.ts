import { Country } from '../types/country';
import { SimpleCache } from '../utils/cache';

const BASE_URL = 'https://restcountries.com/v3.1';
const TTL = 1000 * 60 * 5;

const allCountriesCache = new SimpleCache<Country[]>(TTL);
const countryByCodeCache = new SimpleCache<Country>(TTL);
const regionCache = new SimpleCache<Country[]>(TTL);

const processCountryData = (data: any): Country => ({
  name: data.name,
  cca2: data.cca2,
  cca3: data.cca3,
  region: data.region,
  subregion: data.subregion,
  capital: data.capital,
  population: data.population,
  flags: data.flags,
  timezones: data.timezones,
  currencies: data.currencies,
  languages: data.languages,
});

export const fetchAllCountries = async (): Promise<Country[]> => {
  const cached = allCountriesCache.get('all');
  if (cached) return cached;

  const res = await fetch(`${BASE_URL}/all`);
  if (!res.ok) throw new Error('Failed to fetch countries');
  const data = await res.json();
  const processed = data.map(processCountryData);
  allCountriesCache.set('all', processed);
  return processed;
};

export const fetchCountryByCode = async (code: string): Promise<Country> => {
  const cached = countryByCodeCache.get(code);
  if (cached) return cached;

  const res = await fetch(`${BASE_URL}/alpha/${code}`);
  if (!res.ok) throw new Error('Failed to fetch country');
  const data = await res.json();
  const processed = processCountryData(data[0] ?? data);
  countryByCodeCache.set(code, processed);
  return processed;
};

export const fetchCountriesByRegion = async (region: string): Promise<Country[]> => {
  const cached = regionCache.get(region);
  if (cached) return cached;

  const res = await fetch(`${BASE_URL}/region/${region}`);
  if (!res.ok) throw new Error('Failed to fetch countries by region');
  const data = await res.json();
  const processed = data.map(processCountryData);
  regionCache.set(region, processed);
  return processed;
};

type SearchParams = {
  name?: string | string[];
  capital?: string | string[];
  region?: string | string[];
  timezone?: string | string[];
};

export const searchCountries = async (params: SearchParams): Promise<Country[]> => {
  const countries = await fetchAllCountries();

  return countries.filter((country) => {
    const matchName =
      params.name && country.name.common.toLowerCase().includes((params.name as string).toLowerCase());
    const matchCapital =
      params.capital &&
      country.capital &&
      country.capital[0].toLowerCase().includes((params.capital as string).toLowerCase());
    const matchRegion =
      params.region && country.region.toLowerCase() === (params.region as string).toLowerCase();
    const matchTimezone =
      params.timezone &&
      country.timezones.some((tz) => tz.includes(params.timezone as string));

    return (
      (!params.name || matchName) &&
      (!params.capital || matchCapital) &&
      (!params.region || matchRegion) &&
      (!params.timezone || matchTimezone)
    );
  });
};
