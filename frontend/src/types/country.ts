export interface CountryName {
    common: string;
    official: string;
    nativeName?: {
      [lang: string]: {
        official: string;
        common: string;
      };
    };
  }
  
  export interface CountryFlag {
    svg: string;
    png: string;
    alt?: string;
  }
  
  export interface Currency {
    name: string;
    symbol: string;
  }
  
  export interface Country {
    name: CountryName;
    cca2: string;
    cca3: string;
    capital?: string[];
    region: string;
    subregion?: string;
    population: number;
    flags: CountryFlag;
    timezones: string[];
    currencies?: {
      [code: string]: Currency;
    };
    languages?: {
      [code: string]: string;
    };
  }