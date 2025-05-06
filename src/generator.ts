import { ApiInfo, TestStep } from './types';
import { AIFactory } from './ai/aiFactory';

export async function generateTestStepsFromAI(apiData: ApiInfo): Promise<TestStep[]> {
    try {
        const aiProvider = await AIFactory.createProvider();
        const prompt = generatePrompt(apiData);
        const response = await aiProvider.generateTestSteps(prompt);
        return parseAIResponse(response);
    } catch (error) {
        throw new Error(`Error generating test steps: ${error.message}`);
    }
}

function generatePrompt(apiData: ApiInfo): string {
    return `Generate test scenarios for the following API endpoint:
    Name: ${apiData.name}
    Method: ${apiData.method}
    URL: ${apiData.url}
    Headers: ${JSON.stringify(apiData.headers)}
    ${apiData.body ? `Body: ${JSON.stringify(apiData.body)}` : ''}`;
}

function parseAIResponse(response: string): TestStep[] {
    // Split the response into scenarios
    const scenarios = response.split(/\n(?=##?\s+)/);
    
    return scenarios.map(scenario => {
        const lines = scenario.split('\n').filter(line => line.trim());
        const scenarioTitle = lines[0].replace(/^##?\s+/, '').trim();
        const steps = lines.slice(1)
            .filter(line => line.startsWith('*'))
            .map(line => line.replace(/^\*\s+/, '').trim());

        return {
            scenario: scenarioTitle,
            steps: steps.length > 0 ? steps : ['No steps provided']
        };
    });
}