import dotenv from 'dotenv';
import fs from 'fs-extra';
import path from 'path';
import { processApiSpecification } from './utils/processor';
import { loadConfig } from './config/config';

// Load environment variables
dotenv.config();

async function main() {
  try {
    // Load configuration
    const config = loadConfig();
    
    // Create output directory if it doesn't exist
    if (!fs.existsSync(config.outputFolder)) {
      fs.mkdirSync(config.outputFolder, { recursive: true });
    }
    
    // Get all files from input directory
    const files = fs.readdirSync(config.inputFolder);
    
    // Process each file
    for (const file of files) {
      const filePath = path.join(config.inputFolder, file);
      const stats = fs.statSync(filePath);
      
      // Skip directories
      if (stats.isDirectory()) continue;
      
      // Skip non-JSON files
      if (!file.endsWith('.json')) continue;
      
      // Check if file has already been processed
      const outputBaseName = path.basename(file, '.json');
      const gaugeOutputPath = path.join(config.outputFolder, `${outputBaseName}.spec`);
      const gherkinOutputPath = path.join(config.outputFolder, `${outputBaseName}.feature`);
      
      if (fs.existsSync(gaugeOutputPath) && fs.existsSync(gherkinOutputPath)) {
        console.log(`Skipping ${file} - already processed`);
        continue;
      }
      
      console.log(`Processing ${file}...`);
      
      // Process the API specification
      await processApiSpecification(filePath, gaugeOutputPath, gherkinOutputPath);
      
      console.log(`Completed processing ${file}`);
    }
    
    console.log('All files processed successfully');
  } catch (error) {
    console.error('Error processing files:', error);
    process.exit(1);
  }
}

// Run the main function
main();
