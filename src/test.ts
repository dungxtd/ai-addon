import * as fs from 'fs-extra';
import * as path from 'path';
import { generateTestStepsFromAI } from './generator';
import { ApiInfo } from './types';

/**
 * Test the AI response parsing with a sample API
 */
async function testAIResponseParsing(): Promise<void> {
    console.log('\n=== Starting AI Response Parsing Test ===');
    
    // Sample API info for testing
    const sampleApi: ApiInfo = {
        method: 'get',
        url: 'https://api.example.com/users',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer {{token}}'
        },
        path: ['Users', 'Get User']
    };
    
    try {
        console.log('Generating test formats for sample API...');
        const testFormats = await generateTestStepsFromAI(sampleApi);
        
        console.log('\nGauge Format:');
        console.log('-------------');
        console.log(testFormats.gauge);
        
        console.log('\nGherkin Format:');
        console.log('---------------');
        console.log(testFormats.gherkin);
        
        // Save the test output to files for inspection
        const outputDir = path.join(process.cwd(), 'output');
        await fs.ensureDir(outputDir);
        
        await fs.writeFile(
            path.join(outputDir, 'test-gauge.md'), 
            testFormats.gauge
        );
        
        await fs.writeFile(
            path.join(outputDir, 'test-gherkin.feature'), 
            testFormats.gherkin
        );
        
        console.log('\nTest output saved to:');
        console.log('- output/test-gauge.md');
        console.log('- output/test-gherkin.feature');
        
        console.log('\n=== AI Response Parsing Test Complete ===');
    } catch (error) {
        console.error('Error in AI response parsing test:', error);
        process.exit(1);
    }
}

/**
 * Verify the output files exist and have content
 */
async function verifyOutputFiles(): Promise<void> {
    console.log('\n=== Verifying Output Files ===');
    
    const outputDir = path.join(process.cwd(), 'output');
    const gaugeFile = path.join(outputDir, 'test-gauge.md');
    const gherkinFile = path.join(outputDir, 'test-gherkin.feature');
    
    try {
        // Check if files exist
        const gaugeExists = await fs.pathExists(gaugeFile);
        const gherkinExists = await fs.pathExists(gherkinFile);
        
        console.log(`Gauge file exists: ${gaugeExists}`);
        console.log(`Gherkin file exists: ${gherkinExists}`);
        
        if (!gaugeExists || !gherkinExists) {
            console.error('One or more output files are missing');
            process.exit(1);
        }
        
        // Check if files have content
        const gaugeContent = await fs.readFile(gaugeFile, 'utf8');
        const gherkinContent = await fs.readFile(gherkinFile, 'utf8');
        
        console.log(`Gauge file has content: ${gaugeContent.length > 0}`);
        console.log(`Gherkin file has content: ${gherkinContent.length > 0}`);
        
        if (gaugeContent.length === 0 || gherkinContent.length === 0) {
            console.error('One or more output files are empty');
            process.exit(1);
        }
        
        console.log('\n=== Output Files Verification Complete ===');
        console.log('All tests passed!');
    } catch (error) {
        console.error('Error verifying output files:', error);
        process.exit(1);
    }
}

async function main() {
    try {
        // Run the AI response parsing test
        await testAIResponseParsing();
        
        // Verify the output files
        await verifyOutputFiles();
    } catch (error) {
        console.error('Test failed:', error);
        process.exit(1);
    }
}

// Run the tests
main();
