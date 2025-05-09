import * as fs from 'fs-extra';
import * as path from 'path';
import { AIConfig } from '../types';

const DEFAULT_CONFIG: AIConfig = {
    provider: 'google',
    model: 'gemini-2.0-flash',
    promptTemplate: `Given the following API request details, generate test scenarios in both Gauge and Gherkin formats (important).

API Details:
Name: {{name}}
Method: {{method}}
URL: {{url}}
Headers: {{headers}}
Body: {{body}}

Generate test scenarios for:
1. Successful request (status 200)
2. Bad request (status 400)
3. Unauthorized (status 401)
4. Forbidden (status 403)

First, provide the Gauge format scenarios with steps prefixed by '*'.

Then add a line containing only '---GHERKIN---'

Finally, provide the Gherkin format scenarios using 'Given/When/Then/And' steps.

Include response body validation in both formats. No explanation needed.`
};

export async function loadConfig(configPath?: string): Promise<AIConfig> {
    try {
        const filePath = configPath || path.join(process.cwd(), 'src', 'config', 'ai.config.json');
        
        if (await fs.pathExists(filePath)) {
            const configFile = await fs.readFile(filePath, 'utf8');
            const config = JSON.parse(configFile);
            return { ...DEFAULT_CONFIG, ...config };
        }

        console.warn('Config file not found, using default configuration');
        return DEFAULT_CONFIG;
    } catch (error) {
        console.error('Error loading config:', error);
        return DEFAULT_CONFIG;
    }
}