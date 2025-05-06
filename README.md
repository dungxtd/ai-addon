# Postman Collection Test Generator

This project automates the generation of test cases from a Postman Collection JSON file and outputs them in Gauge Spec format. It uses AI to generate comprehensive test steps for each API endpoint.

## Features

- Reads and parses Postman Collection JSON files
- Extracts API calls including method, URL, headers, and request body
- Generates test steps using AI for various scenarios:
  - Successful requests (200)
  - Bad requests (400)
  - Unauthorized access (401)
  - Forbidden access (403)
- Outputs test scenarios in Gauge markdown format
- Handles nested folders and request groups

## Project Structure

```
/src
  - index.ts          # Main entry point
  - generator.ts      # AI test step generation
  - types.ts          # TypeScript interfaces
  - utils.ts          # Helper functions
/postman
  - collection.json   # Example collection
/output
  - generated-spec.md # Generated test scenarios
```

## Prerequisites

- Node.js (v14 or higher)
- TypeScript
- NPM or Yarn

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

## Usage

Run the generator with a Postman Collection JSON file:

```bash
ts-node src/index.ts postman/collection.json
```

The generated test scenarios will be saved in `output/generated-spec.md`.

## Configuration

### AI Provider Setup

1. Copy `.env.example` to `.env` and configure your API keys:
```bash
cp .env.example .env
```

2. Edit `.env` with your API keys:
```env
OPENAI_API_KEY=your_openai_api_key_here
GOOGLE_AI_API_KEY=your_google_ai_api_key_here
```

3. Configure AI provider settings in `src/config/ai.config.json`:
```json
{
    "provider": "openai",  // or "google" or "ollama"
    "model": "gpt-4",     // model name for the chosen provider
    "promptTemplate": "Your custom prompt template here"
}
```

### Supported AI Providers

- **OpenAI**: Uses GPT models via OpenAI API
- **Google AI**: Uses Google's Generative AI models
- **Ollama**: Uses local AI models via Ollama server

### Custom Prompt Templates

The prompt template can be customized in `ai.config.json`. Use `{{input}}` as a placeholder for API details:

```json
{
    "promptTemplate": "Generate test scenarios for: {{input}}"
}
```

## Output Format

The generated test scenarios follow the Gauge markdown format:

```markdown
# API Endpoint Name

## Successful Request
* Send GET request to endpoint
* Verify response status code is 200
* Verify response contains valid data

## Error Cases
* Send invalid request
* Verify response status code is 400
* Verify error message
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC