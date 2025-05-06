import * as fs from 'fs-extra';
import * as path from 'path';
import { AIConfig } from '../ai/types';

const DEFAULT_CONFIG: AIConfig = {
    provider: 'openai',
    model: 'gpt-4',
    promptTemplate: `Given the following API request details, generate test scenarios in Gauge format:

{{input}}

Please provide test steps for:
1. Successful request (status 200)
2. Bad request (status 400)
3. Unauthorized (status 401)
4. Forbidden (status 403)

Include response body validation where applicable.`
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