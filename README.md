# Content Strategist App

A Next.js application for content strategy analysis and generation, leveraging AI capabilities to process and analyze content data.

## Prerequisites

- Node.js (v18 or higher)
- Yarn package manager
- MongoDB database
- Pinecone account and API key
- OpenAI API key

## Setup

1. Clone the repository:
```bash
git clone [repository-url]
cd content-strategist-app
```

2. Install dependencies:
```bash
yarn install
```

3. Create a `.env.local` file in the root directory with the following environment variables:
```env
MONGODB_URI=your_mongodb_connection_string
PINECONE_API_KEY=your_pinecone_api_key
OPENAI_API_KEY=your_openai_api_key
```

## Input Format

The application processes two main CSV files located in the `csv/` directory:

1. `competitors.csv` - Contains competitor analysis data
2. `topics.csv` - Contains topic research and analysis

Each CSV file should follow its specific format as defined in the application.

### Uploading CSV Files
When you run the application, you'll need to upload these CSV files through the web interface:

1. Start the application using `yarn dev`
2. Navigate to `http://localhost:3000`
3. Use the file upload interface to select and upload:
   - `competitors.csv` for competitor analysis
   - `topics.csv` for topic research
4. The application will process the files and make the data available for analysis

Note: Make sure your CSV files are properly formatted before uploading.

## Running the Application

### Development Mode

To run the application in development mode:

```bash
yarn dev
```

The application will be available at `http://localhost:3000`

### Production Build

To create a production build:

```bash
yarn build
yarn start
```

### Linting

To run the linter:

```bash
yarn lint
```

## Project Structure

- `/src` - Source code directory
  - `/app` - Next.js app directory
  - `/components` - React components
  - `/lib` - Utility functions and shared code
- `/csv` - Input CSV files
- `/public` - Static assets

## Technologies Used

- Next.js 14
- React 18
- TypeScript
- MongoDB
- Pinecone
- OpenAI API




