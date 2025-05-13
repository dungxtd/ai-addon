# AI Addon

AI File Processor using multiple AI providers

## Overview
AI Addon is a tool that processes files using multiple AI providers. It supports Google, OpenAI, and Ollama providers out of the box, and can parse both OpenAPI and Postman collections.

## Installation

```bash
npm install
```

## Project Structure
```
├── input/ - Sample input files
├── output/ - Generated output files
├── src/
│   ├── config/ - Configuration files
│   ├── parsers/ - Parsers for different file formats
│   ├── providers/ - AI provider implementations
│   └── utils/ - Utility functions
├── package.json - Project metadata and dependencies
└── tsconfig.json - TypeScript configuration
```

## Configuration
The project uses environment variables for configuration, stored in `.env` file. A `.env.example` file is provided with example configuration.

## Usage

### Basic Usage
```bash
npm start
```

### Development
For development:
```bash
npm run build
```

### Testing
To run tests:
```bash
npm test
```

## Features
- Processes files using multiple AI providers
- Supports Google, OpenAI, and Ollama providers
- Can parse OpenAPI and Postman collections
- Flexible architecture allowing easy addition of new providers and parsers

## Technology Stack
- Node.js
- TypeScript
- Uses npm for dependency management

## Dependencies
### Development Dependencies
- `@types/node`
- `ts-node`
- `typescript`

### Runtime Dependencies
- `@google/generative-ai`
- `axios`
- `dotenv`
- `fs-extra`
- `ollama`
- `openai`
- `postman-collection`

## License
ISC