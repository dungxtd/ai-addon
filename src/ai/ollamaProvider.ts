import { AIProvider, AIConfig } from './types';
import axios from 'axios';

export class OllamaProvider implements AIProvider {
    private config: AIConfig;
    private baseUrl: string;

    constructor(config: AIConfig) {
        this.config = config;
        this.baseUrl = config.endpoint || 'http://localhost:11434';
    }

    async generateTestSteps(input: string): Promise<string> {
        try {
            const prompt = this.config.promptTemplate.replace('{{input}}', input);

            const response = await axios.post(`${this.baseUrl}/api/generate`, {
                model: this.config.model,
                prompt: prompt,
                stream: false
            });

            if (!response.data || !response.data.response) {
                throw new Error('No response from Ollama');
            }

            return response.data.response;
        } catch (error) {
            if (error.code === 'ECONNREFUSED') {
                throw new Error('Could not connect to Ollama server. Is it running?');
            }
            throw new Error(`Ollama API error: ${error.message}`);
        }
    }
}