import { AIProvider, AIConfig, ApiInfo, TestFormat } from '../types';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';

export class GoogleAIProvider implements AIProvider {
    private client: GoogleGenerativeAI;
    private config: AIConfig;

    constructor(config: AIConfig) {
        dotenv.config();
        const apiKey = process.env.GOOGLE_AI_API_KEY || config.apiKey;
        if (!apiKey) {
            throw new Error('Google AI API key is required');
        }

        this.client = new GoogleGenerativeAI(apiKey);
        this.config = config;
    }

    async generateTestFormats(api: ApiInfo): Promise<TestFormat> {
        try {
            const model = this.client.getGenerativeModel({ model: this.config.model });
            const prompt = this.config.promptTemplate
                .replace('{{name}}', api.name || 'Unnamed API')
                .replace('{{method}}', api.method)
                .replace('{{url}}', api.url)
                .replace('{{headers}}', JSON.stringify(api.headers, null, 2))
                .replace('{{body}}', api.body || '');

            const result = await model.generateContent(prompt);
            const content = result.response.text();
            const [gauge, gherkin] = content.split('---GHERKIN---').map(part => part.trim());
            return {
                gauge: gauge || '',
                gherkin: gherkin || ''
            };
        } catch (error) {
            throw new Error(`Google AI API error: ${error.message}`);
        }
    }
}