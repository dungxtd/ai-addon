import { ApiInfo, TestFormat } from './types';
import { AIFactory } from './ai/aiFactory';

export async function generateTestStepsFromAI(apiData: ApiInfo): Promise<TestFormat> {
    try {
        const aiProvider = await AIFactory.createProvider();
        const response = await aiProvider.generateTestFormats(apiData);
    console.log('\nAI Response for', apiData.name, ':\n', response);
    return response;
    } catch (error) {
        throw new Error(`Error generating test steps: ${error.message}`);
    }
}