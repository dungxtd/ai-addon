import OpenAI from 'openai';
import { AIProvider, AIConfig, AIResponse } from './types';
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

    async generateTestSteps(input: string): Promise<string> {
        try {
            const prompt = this.config.promptTemplate.replace('{{input}}', input);

            const response = await this.client.chat.completions.create({
                model: this.config.model,
                messages: [{
                    role: 'user',
                    content: prompt
                }],
                temperature: 0.7,
            });

            const content = response.choices[0]?.message?.content;
            if (!content) {
                throw new Error('No response from OpenAI');
            }

            return content;
        } catch (error) {
            throw new Error(`OpenAI API error: ${error.message}`);
        }
    }
}