export interface Country {
    name: {
      common: string;
      official: string;
    };
    cca2: string; // 2-letter country code
    cca3: string; // 3-letter country code
    region: string;
    subregion?: string;
    capital?: string[];
    population: number;
    flags: {
      svg: string;
      png: string;
    };
    timezones: string[];
    currencies?: {
      [currencyCode: string]: {
        name: string;
        symbol: string;
      };
    };
    languages?: {
      [langCode: string]: string;
    };
  }