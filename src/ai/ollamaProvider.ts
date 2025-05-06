import { AIProvider, AIConfig, ApiInfo, TestFormat } from '../types';
import axios from 'axios';

export class OllamaProvider implements AIProvider {
    private config: AIConfig;
    private baseUrl: string;

    constructor(config: AIConfig) {
        this.config = config;
        this.baseUrl = config.endpoint || 'http://localhost:11434';
    }

    async generateTestFormats(api: ApiInfo): Promise<TestFormat> {
        try {
            const prompt = this.config.promptTemplate
                .replace('{{name}}', api.name || 'Unnamed API')
                .replace('{{method}}', api.method)
                .replace('{{url}}', api.url)
                .replace('{{headers}}', JSON.stringify(api.headers, null, 2))
                .replace('{{body}}', api.body || '');

            const response = await axios.post(`${this.baseUrl}/api/generate`, {
                model: this.config.model,
                prompt: prompt,
                stream: false
            });

            if (!response.data || !response.data.response) {
                throw new Error('No response from Ollama');
            }

            const content = response.data.response;
            const [gauge, gherkin] = content.split('---GHERKIN---').map(part => part.trim());
            return {
                gauge: gauge || '',
                gherkin: gherkin || ''
            };
        } catch (error) {
            if (error.code === 'ECONNREFUSED') {
                throw new Error('Could not connect to Ollama server. Is it running?');
            }
            throw new Error(`Ollama API error: ${error.message}`);
        }
    }
}