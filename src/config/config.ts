import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export interface Config {
  inputFolder: string;
  outputFolder: string;
  openaiApiKey?: string;
  googleAiApiKey?: string;
  ollamaEndpoint?: string;
  preferredProvider: 'openai' | 'google' | 'ollama';
}

export function loadConfig(): Config {
  return {
    inputFolder: process.env.INPUT_FOLDER || './input',
    outputFolder: process.env.OUTPUT_FOLDER || './output',
    openaiApiKey: process.env.OPENAI_API_KEY,
    googleAiApiKey: process.env.GOOGLE_AI_API_KEY,
    ollamaEndpoint: process.env.OLLAMA_ENDPOINT,
    preferredProvider: (process.env.PREFERRED_PROVIDER as 'openai' | 'google' | 'ollama') || 'openai'
  };
}
