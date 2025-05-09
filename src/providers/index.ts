import { AIProvider } from './provider.interface';
import { OpenAIProvider } from './openai.provider';
import { GoogleAIProvider } from './google.provider';
import { OllamaProvider } from './ollama.provider';
import { Config } from '../config/config';

export function getProvider(config: Config): AIProvider {
  switch (config.preferredProvider) {
    case 'openai':
      return new OpenAIProvider(config);
    case 'google':
      return new GoogleAIProvider(config);
    case 'ollama':
      return new OllamaProvider(config);
    default:
      throw new Error(`Unsupported provider: ${config.preferredProvider}`);
  }
}
