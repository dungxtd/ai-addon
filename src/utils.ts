import * as fs from 'fs-extra';
import { TestScenario } from './types';

export async function readJsonFile(filePath: string): Promise<any> {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        throw new Error(`Error reading JSON file: ${error.message}`);
    }
}

export async function writeMarkdownFile(filePath: string, scenarios: TestScenario[]): Promise<void> {
    const isFeatureFile = filePath.endsWith('.feature');
    try {
        const content = formatScenariosToMarkdown(scenarios, isFeatureFile);
        await fs.writeFile(filePath, content, 'utf8');
    } catch (error) {
        throw new Error(`Error writing markdown file: ${error.message}`);
    }
}

function formatScenariosToMarkdown(scenarios: TestScenario[], isFeature: boolean = false): string {
    return scenarios
        .map(scenario => {
            const title = isFeature ? `Feature: ${scenario.title}` : `# ${scenario.title}`;
            const content = scenario.steps[0].steps.join('\n\n');
            return `${title}\n\n${content}\n---\n`;
        })
        .join('\n');
}

export function sanitizeFileName(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}