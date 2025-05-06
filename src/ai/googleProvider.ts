import { AIProvider, AIConfig } from './types';
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

    async generateTestSteps(input: string): Promise<string> {
        try {
            const model = this.client.getGenerativeModel({ model: this.config.model });
            const prompt = this.config.promptTemplate.replace('{{input}}', input);

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const content = response.text();

            if (!content) {
                throw new Error('No response from Google AI');
            }

            return content;
        } catch (error) {
            throw new Error(`Google AI API error: ${error.message}`);
        }
    }
}