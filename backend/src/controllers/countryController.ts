import { Request, Response } from 'express';
import {
  fetchAllCountries,
  fetchCountryByCode,
  fetchCountriesByRegion,
  searchCountries
} from '../services/countryService'; // Ensure the file exists at this path

export const getAllCountries = async (_req: Request, res: Response) => {
  try {
    const countries = await fetchAllCountries();
    res.json(countries);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Server Error' });
  }
};

export const getCountryByCode = async (req: Request, res: Response) => {
  try {
    const code = req.params.code;
    const country = await fetchCountryByCode(code);
    res.json(country);
  } catch (err: any) {
    res.status(404).json({ error: err.message || 'Country not found' });
  }
};

export const getCountriesByRegion = async (req: Request, res: Response) => {
  try {
    const region = req.params.region;
    const countries = await fetchCountriesByRegion(region);
    res.json(countries);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Server Error' });
  }
};

export const searchCountriesHandler = async (req: Request, res: Response) => {
  try {
    const results = await searchCountries(req.query);
    res.json(results);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Search failed' });
  }
};