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
            const model = this.client.getGenerativeModel({
                model: this.config.model,
                generationConfig: {
                    temperature: 0.2,
                    topP: 0.8,
                    topK: 40,
                    maxOutputTokens: 8192,
                }
            });

            // Replace all template variables
            let prompt = this.config.promptTemplate
                .replace('{{name}}', api.path ? api.path[api.path.length - 1] : 'API Endpoint')
                .replace('{{method}}', api.method)
                .replace('{{url}}', api.url)
                .replace('{{headers}}', JSON.stringify(api.headers, null, 2))
                .replace('{{body}}', api.body ? JSON.stringify(api.body, null, 2) : 'No body');

            console.log(`Sending prompt to Google AI: ${this.config.model}`);

            const result = await model.generateContent(prompt);
            const content = result.response.text();

            console.log('Response received from Google AI');

            // Check if the response contains the separator
            if (!content.includes('---GHERKIN---')) {
                console.warn('Response does not contain the expected separator "---GHERKIN---"');
                console.log('Attempting to identify Gauge and Gherkin sections...');

                // Try to identify sections based on content patterns
                const lines = content.split('\n');
                let gaugeContent = [];
                let gherkinContent = [];
                let inGherkin = false;

                for (const line of lines) {
                    // Look for patterns that indicate Gherkin format
                    if (!inGherkin &&
                        (line.trim().startsWith('Feature:') ||
                         line.trim().startsWith('Given ') ||
                         line.trim().startsWith('When ') ||
                         line.trim().startsWith('Then '))) {
                        inGherkin = true;
                    }

                    if (inGherkin) {
                        gherkinContent.push(line);
                    } else {
                        gaugeContent.push(line);
                    }
                }

                // If we couldn't identify separate sections, use the whole content for both
                if (gaugeContent.length === 0 || gherkinContent.length === 0) {
                    console.warn('Could not identify separate Gauge and Gherkin sections');
                    return {
                        gauge: content,
                        gherkin: content
                    };
                }

                return {
                    gauge: gaugeContent.join('\n'),
                    gherkin: gherkinContent.join('\n')
                };
            }

            // Normal case with separator
            const [gauge, gherkin] = content.split('---GHERKIN---').map(part => part.trim());

            return {
                gauge: gauge || '',
                gherkin: gherkin || ''
            };
        } catch (error) {
            console.error('Google AI API error:', error);
            throw new Error(`Google AI API error: ${error.message}`);
        }
    }
}