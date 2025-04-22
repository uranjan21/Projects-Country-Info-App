# Country Info App

The **Country Info App** is a full-stack web application that allows users to explore information about countries around the world. Users can search, filter, and view detailed information about countries, including their name, region, capital, population, timezones, currencies, and languages.

## Features

- **Search**: Search for countries by name or capital.
- **Filters**: Filter countries by region and timezone.
- **Infinite Scrolling**: Load more countries as you scroll.
- **Country Details**: View detailed information about a selected country in a modal.
- **Responsive Design**: Fully responsive and optimized for all devices.

## Tech Stack

### Frontend

- **React**: Component-based UI development.
- **TypeScript**: Type-safe development.
- **Tailwind CSS**: Styling and responsive design.
- **Intersection Observer API**: Infinite scrolling implementation.

### Backend

- **REST API**: Fetch country data from an external API (e.g., [REST Countries API](https://restcountries.com)).

## Folder Structure

```
country-info-app/
├── frontend/
│   ├── src/
│   │   ├── api/               # API service for fetching country data
│   │   ├── components/        # Reusable React components
│   │   ├── context/           # Context API for global state management
│   │   ├── pages/             # Page components
│   │   ├── types/             # TypeScript type definitions
│   │   ├── App.tsx            # Main app component
│   │   ├── index.tsx          # Entry point
│   └── public/                # Static assets
└── ...
```

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/country-info-app.git
   cd country-info-app/frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the app in your browser:
   ```
   http://localhost:3000
   ```

## Usage

1. Use the **Search Bar** to search for countries by name or capital.
2. Apply **Filters** to narrow down the results by region or timezone.
3. Scroll down to load more countries dynamically.
4. Click on a country card to view detailed information in a modal.

## Components

### `CountryListPage`

- Displays the list of countries with search and filter options.
- Implements infinite scrolling using the Intersection Observer API.

### `CountryDetailModal`

- Displays detailed information about a selected country in a modal.
- Includes data such as name, region, capital, population, timezones, currencies, and languages.

### `SearchBar`

- Allows users to search for countries by name or capital.

### `Filters`

- Provides options to filter countries by region and timezone.

### `CountryCard`

- Displays a summary of a country's information (name, region, flag, timezone).

## Context API

The app uses the **Context API** to manage global state, including:

- List of countries
- Search term and filters
- Selected country for the modal
- Loading state for infinite scrolling

## API Integration

The app fetches country data from the [REST Countries API](https://restcountries.com). The `countryService` module handles all API requests.

## Acknowledgments

- [REST Countries API](https://restcountries.com) for providing country data.
- [Tailwind CSS](https://tailwindcss.com) for styling.
- [React](https://reactjs.org) for the frontend framework.

---
