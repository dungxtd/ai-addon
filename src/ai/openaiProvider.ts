import OpenAI from 'openai';
import { AIProvider, AIConfig, ApiInfo, TestFormat } from '../types';
import * as dotenv from 'dotenv';

export class OpenAIProvider implements AIProvider {
    private client: OpenAI;
    private config: AIConfig;

    constructor(config: AIConfig) {
        dotenv.config();
        const apiKey = process.env.OPENAI_API_KEY || config.apiKey;
        if (!apiKey) {
            throw new Error('OpenAI API key is required');
        }

        this.client = new OpenAI({ apiKey });
        this.config = config;
    }

    async generateTestFormats(api: ApiInfo): Promise<TestFormat> {
        try {
            const prompt = this.config.promptTemplate
                .replace('{{method}}', api.method)
                .replace('{{url}}', api.url)
                .replace('{{headers}}', JSON.stringify(api.headers, null, 2))
                .replace('{{body}}', api.body || '');

            const response = await this.client.chat.completions.create({
                model: this.config.model,
                messages: [{
                    role: 'user',
                    content: prompt
                }],
                temperature: 0.7,
            });

            const content = response.choices[0].message.content || '';
            const [gauge, gherkin] = content.split('---GHERKIN---').map(part => part.trim());
            return {
                gauge: gauge || '',
                gherkin: gherkin || ''
            };
        } catch (error) {
            throw new Error(`OpenAI API error: ${error.message}`);
        }
    }
}