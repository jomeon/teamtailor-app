# Teamtailor Candidate Exporter

A robust, production-ready Node.js web application that fetches candidate data along with their job applications from the Teamtailor API and exports it as a clean CSV file.

##  Features
- **JSON:API Standard Handling**: Efficiently parses complex JSON:API relationships and included resources.
- **CSV Generation**: Flattens nested data into a structured CSV format using `json2csv`.
- **Clean Architecture**: Strong separation of concerns (Controllers, Services, Routes).
- **Automated CI/CD**: Integrated GitHub Actions workflow for continuous integration.
- **Comprehensive Testing**: Unit and Integration tests using Jest and Supertest.
- **Sleek UI**: Simple, user-friendly frontend to trigger the download.

##  Tech Stack
- **Backend**: Node.js, Express.js
- **API Communication**: Axios
- **Data Transformation**: json2csv
- **Testing**: Jest, Supertest
- **Dev Tools**: Nodemon, Dotenv

##  Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- A valid Teamtailor API Key (v20240404)

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/jomeon/teamtailor-app.git](https://github.com/jomeon/teamtailor-app.git)
   cd teamtailor-export-app
2. **Install dependencies:**
   ```bash
   npm install
3. **Configure Environment Variables:**
    Rename the provided .env.example file to .env and insert your API key:
    TEAMTAILOR_API_KEY=your_actual_api_key_here
    PORT=3000
4. **Run the app:**
    ```bash
    npm start


### Testing
    ```bash
    npm test