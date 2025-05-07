import { Collection, Request } from 'postman-collection';
import { ApiInfo, TestScenario, CollectionProcessor, TestStep } from './types';
import { readJsonFile, writeMarkdownFile, sanitizeFileName } from './utils';
import { generateTestStepsFromAI } from './generator';

function parseGaugeResponse(response: string): TestStep[] {
    console.debug('Parsing Gauge response:', response);
    const scenarios = response.split(/\n(?=\s*Scenario:)/);
    return scenarios.map(scenario => {
        const lines = scenario.split('\n').filter(line => line.trim());
        const scenarioTitle = lines[0].replace(/^\s*Scenario:\s*/, '').trim();
        const steps = lines.slice(1)
            .filter(line => line.trim() && !line.toLowerCase().startsWith('scenario:'))
            .map(line => line.replace(/^[*\s]+/, '').trim());
        return {
            scenario: scenarioTitle,
            steps
        };
    }).filter(step => step.scenario && step.steps.length > 0);
}

function parseGherkinResponse(response: string): TestStep[] {
    console.debug('Parsing Gherkin response:', response);
    const scenarios = response.split(/\n(?=\s*Scenario:)/);
    return scenarios.map(scenario => {
        const lines = scenario.split('\n').filter(line => line.trim());
        const scenarioTitle = lines[0].replace(/^\s*Scenario:\s*/, '').trim();
        const steps = lines.slice(1)
            .filter(line => line.trim() && !line.toLowerCase().startsWith('scenario:'))
            .map(line => line.replace(/^\s*(Given|When|Then|And)\s+/, '').trim());
        return {
            scenario: scenarioTitle,
            steps
        };
    }).filter(step => step.scenario && step.steps.length > 0);
}
import { FileScanner } from './fileScanner';
import * as path from 'path';
import * as fs from 'fs-extra';

class PostmanCollectionProcessor implements CollectionProcessor {
    processRequest(request: Request): ApiInfo {
        const req = request as any;
        return {
            name: req.name || '',
            method: (req.method || 'GET').toLowerCase(),
            url: req.url?.toString() || '',
            headers: Object.fromEntries((req.headers?.all() || []).map(h => [h.key, h.value])),
            body: req.body?.raw || undefined
        };
    }

    processFolder(folder: any, parentPath: string[] = []): ApiInfo[] {
        const apis: ApiInfo[] = [];
        const currentPath = [...parentPath, folder.name];

        if (folder.items) {
            folder.items.forEach((item: any) => {
                if (item.request) {
                    const apiInfo = this.processRequest(item.request);
                    apiInfo.path = currentPath;
                    apis.push(apiInfo);
                } else if (item.items) {
                    apis.push(...this.processFolder(item, currentPath));
                }
            });
        }

        return apis;
    }
}

async function processCollection(collectionPath: string): Promise<void> {
    try {
        console.log('\n=== Starting Collection Processing ===');
        // Read and parse the collection file
        console.log(`\n[1/4] Reading collection from: ${collectionPath}`);
        const collectionData = await readJsonFile(collectionPath);
        const collection = new Collection(collectionData);
        console.log(`Collection loaded successfully: ${collection.name || 'Unnamed Collection'}`);
        if (!collection || !collection.items) {
            throw new Error('Invalid collection format');
        }
        const processor = new PostmanCollectionProcessor();

        console.log('\n[2/4] Processing API requests...');
        const apis: ApiInfo[] = [];
        collection.forEachItem((item: any) => {
            console.log(`Processing: ${item.name}`);
            if (item.request) {
                const apiInfo = processor.processRequest(item.request);
                apiInfo.path = [item.name];
                apis.push(apiInfo);
            } else if (item.items) {
                apis.push(...processor.processFolder(item));
            }
        });

        console.log(`Found ${apis.length} API endpoints\n\n[3/4] Generating test scenarios...`);
        const gaugeScenarios: { title: string; steps: TestStep[] }[] = [];
        const gherkinScenarios: { title: string; steps: TestStep[] }[] = [];

        for (const api of apis) {
            const apiTitle = api.path ? `${api.path.join(' > ')} > ${api.name}` : api.name;
            console.log(`Generating tests for: ${apiTitle} (${api.method.toUpperCase()} ${api.url})`);
            let attempts = 0;
            const maxAttempts = 3;
            while (attempts < maxAttempts) {
                try {
                    const testFormats = await generateTestStepsFromAI(api);
                    const title = api.path ? 
                        `${api.path.join(' > ')} > ${api.name}` :
                        api.name;

                    const gaugeSteps = parseGaugeResponse(testFormats.gauge);
                    const gherkinSteps = parseGherkinResponse(testFormats.gherkin);

                    // Verify that we have valid steps
                    if (gaugeSteps.length === 0 || gherkinSteps.length === 0 ||
                        gaugeSteps.some(s => s.steps.length === 0) || 
                        gherkinSteps.some(s => s.steps.length === 0)) {
                        console.log(`Retrying test generation for ${apiTitle} (attempt ${attempts + 1}/${maxAttempts})`);
                        attempts++;
                        continue;
                    }

                    gaugeScenarios.push({
                        title,
                        steps: gaugeSteps
                    });

                    gherkinScenarios.push({
                        title,
                        steps: gherkinSteps
                    });
                    break;
                } catch (error) {
                    console.error(`Error generating tests for ${apiTitle}:`, error.message);
                    attempts++;
                    if (attempts === maxAttempts) {
                        console.error(`Failed to generate tests for ${apiTitle} after ${maxAttempts} attempts`);
                        break;
                    }
                    console.log(`Retrying test generation (attempt ${attempts + 1}/${maxAttempts})`);
                }
            }
        }

        // Generate output filenames
        const outputDir = path.join(process.cwd(), 'output');
        await ensureOutputDirectory(outputDir);
        const baseName = path.basename(collectionPath, '.json');
        const gaugeFile = path.join(outputDir, `${baseName}.md`);
        const gherkinFile = path.join(outputDir, `${baseName}.feature`);

        console.log('\n[4/4] Writing test scenarios to files...');
        await writeMarkdownFile(gaugeFile, gaugeScenarios);
        await writeMarkdownFile(gherkinFile, gherkinScenarios);
        console.log('\n=== Processing Complete ===');
        console.log(`Generated ${gaugeScenarios.length} test scenarios in two formats:`);
        console.log(`Gauge Spec: ${gaugeFile}`);
        console.log(`Gherkin Feature: ${gherkinFile}`);

    } catch (error) {
        console.error('Error processing collection:', error);
        process.exit(1);
    }
}

async function ensureOutputDirectory(dir: string): Promise<void> {
    try {
        await fs.ensureDir(dir);
    } catch (error) {
        throw new Error(`Error creating output directory: ${error.message}`);
    }
}

async function main() {
    try {
        console.log('\n=== Starting Test Generation Process ===');
        
        // Initialize file scanner
        const scanner = new FileScanner();
        await scanner.initialize();
        
        // Scan for files to process
        console.log('\n[1/2] Scanning for Postman collections...');
        const files = await scanner.scanFiles();
        
        if (files.length === 0) {
            console.log('No JSON files found in input folder.');
            return;
        }
        
        console.log(`Found ${files.length} collection(s)`);
        
        // Process each file
        console.log('\n[2/2] Processing collections...');
        for (const file of files) {
            if (file.exists) {
                console.log(`⏩ Skipped: ${path.basename(file.inputFile)} (both formats exist)`);
                continue;
            }
            
            await processCollection(file.inputFile);
            console.log(`✅ Processed: ${path.basename(file.inputFile)} → ${path.basename(file.mdFile)} & ${path.basename(file.featureFile)}`);
        }
        
        console.log('\n=== Processing Complete ===');
        
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

main();