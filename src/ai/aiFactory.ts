import { AIProvider } from './types';
import { OpenAIProvider } from './openaiProvider';
import { GoogleAIProvider } from './googleProvider';
import { OllamaProvider } from './ollamaProvider';
import { loadConfig } from '../config/configLoader';

export type AIProviderType = 'openai' | 'google' | 'ollama';

export class AIFactory {
    static async createProvider(): Promise<AIProvider> {
        const config = await loadConfig();
        
        switch (config.provider) {
            case 'openai':
                return new OpenAIProvider(config);
            case 'google':
                return new GoogleAIProvider(config);
            case 'ollama':
                return new OllamaProvider(config);
            default:
                throw new Error(`Unsupported AI provider: ${config.provider}`);
        }
    }
}