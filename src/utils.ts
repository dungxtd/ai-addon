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
    try {
        const content = formatScenariosToMarkdown(scenarios);
        await fs.writeFile(filePath, content, 'utf8');
    } catch (error) {
        throw new Error(`Error writing markdown file: ${error.message}`);
    }
}

export function formatScenariosToMarkdown(scenarios: TestScenario[]): string {
    return scenarios.map(scenario => {
        const scenarioContent = [`# ${scenario.title}\n`];
        
        scenario.steps.forEach(step => {
            scenarioContent.push(`## ${step.scenario}\n`);
            step.steps.forEach(testStep => {
                scenarioContent.push(`* ${testStep}\n`);
            });
            scenarioContent.push('\n');
        });

        return scenarioContent.join('');
    }).join('\n---\n\n');
}

export function sanitizeFileName(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}