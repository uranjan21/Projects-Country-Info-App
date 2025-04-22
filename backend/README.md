# Country Info App - Backend

This is the backend service for the Country Info App, a full-stack application that provides detailed information about countries.

## Features
- RESTful API for country data.
- Fetch country details such as name, population, region, and more.
- Integration with external APIs for up-to-date information.

## Tech Stack
- **Node.js**: Runtime environment.
- **Express.js**: Web framework.
- **Fetch**: For making HTTP requests.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/country-info-app.git
    cd country-info-app/backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the root directory and add the following:
    ```
    PORT=5000
    ```

4. Start the server:
    ```bash
    npm start
    ```

## API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Endpoints
- **GET /countries**: Fetch all countries.
- **GET /countries/:id**: Fetch details of a specific country.
- **POST /countries**: Add a new country (requires authentication).
- **PUT /countries/:id**: Update country details (requires authentication).
- **DELETE /countries/:id**: Delete a country (requires authentication).

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request.
