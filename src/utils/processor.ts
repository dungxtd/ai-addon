import fs from 'fs-extra';
import { getParser } from '../parsers';
import { getProvider } from '../providers';
import { loadConfig } from '../config/config';

export async function processApiSpecification(
  inputFilePath: string,
  gaugeOutputPath: string,
  gherkinOutputPath: string
): Promise<void> {
  try {
    // Load configuration
    const config = loadConfig();
    
    // Read and parse the input file
    const fileContent = await fs.readFile(inputFilePath, 'utf-8');
    const jsonContent = JSON.parse(fileContent);
    
    // Get the appropriate parser
    const parser = getParser(jsonContent);
    
    // Parse the API specification
    const parsedSpec = parser.parse(jsonContent);
    
    // Get the AI provider
    const provider = getProvider(config);
    
    // Generate test scenarios
    const { gaugeSpec, gherkinFeature } = await provider.generateTestScenarios(parsedSpec);
    
    // Write output files
    await fs.writeFile(gaugeOutputPath, gaugeSpec, 'utf-8');
    await fs.writeFile(gherkinOutputPath, gherkinFeature, 'utf-8');
    
    console.log(`Generated test scenarios for ${inputFilePath}`);
    console.log(`- Gauge spec: ${gaugeOutputPath}`);
    console.log(`- Gherkin feature: ${gherkinOutputPath}`);
  } catch (error) {
    console.error(`Error processing ${inputFilePath}:`, error);
    throw error;
  }
}
