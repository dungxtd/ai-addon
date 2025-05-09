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
            // Format the title based on file type
            const title = isFeature ? `Feature: ${scenario.title}` : `# ${scenario.title}`;

            // Process each step in the scenario
            const stepsContent = scenario.steps.map(step => {
                // Clean up scenario title and steps
                let scenarioTitle = step.scenario
                    .replace(/^```gauge\s*/, '')
                    .replace(/^```.*/, '')
                    .replace(/^\*\s*#/, '#')  // Remove asterisk before headings
                    .replace(/^Given\s+Scenario:/, 'Scenario:')  // Remove Given prefix
                    .trim();

                // If the scenario title is empty or just a hash, use a default title
                if (!scenarioTitle || scenarioTitle === '#' || scenarioTitle === '##') {
                    scenarioTitle = 'Test Scenario';
                }

                // Format the scenario title based on file type
                const formattedScenarioTitle = isFeature
                    ? `Scenario: ${scenarioTitle.replace(/^Scenario:\s*/, '')}`  // Ensure only one Scenario: prefix
                    : (scenarioTitle.startsWith('#') ? scenarioTitle : `## ${scenarioTitle}`);

                // Clean and format each step
                const formattedSteps = step.steps
                    .filter(s => s.trim())
                    .map(s => {
                        // Remove any backticks, code blocks, or other artifacts
                        let cleanStep = s
                            .replace(/^```.*/, '')
                            .replace(/```$/, '')
                            .replace(/^Given\s+"""/, '"""')  // Remove Given before multiline strings
                            .replace(/^Given\s+\|/, '|')     // Remove Given before table rows
                            .trim();

                        // Skip empty lines or lines that are just formatting markers
                        if (!cleanStep || cleanStep === '"""' || cleanStep === '|') {
                            return '';
                        }

                        // Format based on file type
                        if (isFeature) {
                            // For Gherkin, ensure steps have proper keywords
                            if (!/(Given|When|Then|And|But)/.test(cleanStep)) {
                                cleanStep = `Given ${cleanStep}`;
                            }

                            // Remove duplicate Given prefixes
                            cleanStep = cleanStep.replace(/^Given\s+Given\s+/, 'Given ');
                        } else {
                            // For Gauge, ensure steps start with *
                            if (!cleanStep.startsWith('*')) {
                                cleanStep = `* ${cleanStep}`;
                            }

                            // Remove duplicate asterisks
                            cleanStep = cleanStep.replace(/^\*\s+\*\s+/, '* ');
                        }

                        return cleanStep;
                    })
                    .filter(Boolean)  // Remove empty lines
                    .join('\n');

                return `${formattedScenarioTitle}\n\n${formattedSteps}`;
            }).join('\n\n');

            return `${title}\n\n${stepsContent}\n\n---\n`;
        })
        .join('\n');
}

export function sanitizeFileName(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}