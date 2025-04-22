import { Router } from 'express';
import {
  getAllCountries,
  getCountryByCode,
  getCountriesByRegion,
  searchCountriesHandler
} from '../controllers/countryController';

const router = Router();

router.get('/countries', getAllCountries);
router.get('/countries/:code', getCountryByCode);
router.get('/countries/region/:region', getCountriesByRegion);
router.get('/countries/search', searchCountriesHandler);

export default router;