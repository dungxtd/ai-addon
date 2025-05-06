import * as fs from 'fs-extra';
import * as path from 'path';
import * as dotenv from 'dotenv';

export interface FileMapping {
    inputFile: string;
    mdFile: string;
    featureFile: string;
    exists: boolean;
    outputFile?: string; // For backward compatibility
}

export function getOutputFile(mapping: FileMapping): string {
    return mapping.mdFile; // Default to md file for compatibility
}

export class FileScanner {
    private inputFolder: string;
    private outputFolder: string;

    constructor() {
        dotenv.config();
        this.inputFolder = process.env.INPUT_FOLDER || './input';
        this.outputFolder = process.env.OUTPUT_FOLDER || './output';
    }

    async initialize(): Promise<void> {
        await fs.ensureDir(this.inputFolder);
        await fs.ensureDir(this.outputFolder);
    }

    async scanFiles(): Promise<FileMapping[]> {
        const files = await this.getAllFiles(this.inputFolder);
        return Promise.all(
            files.map(async (file) => {
                const mapping = this.mapInputToOutput(file);
                const mdExists = await fs.pathExists(mapping.mdFile);
                const featureExists = await fs.pathExists(mapping.featureFile);
                const exists = mdExists && featureExists;
                return { ...mapping, exists };
            })
        );
    }

    private async getAllFiles(dir: string): Promise<string[]> {
        const files: string[] = [];
        const items = await fs.readdir(dir);

        for (const item of items) {
            const fullPath = path.join(dir, item);
            const stat = await fs.stat(fullPath);

            if (stat.isDirectory()) {
                files.push(...(await this.getAllFiles(fullPath)));
            } else if (item.endsWith('.json')) {
                files.push(fullPath);
            }
        }

        return files;
    }

    private mapInputToOutput(inputFilePath: string): Omit<FileMapping, 'exists'> {
        const relativePath = path.relative(this.inputFolder, inputFilePath);
        const baseName = path.basename(relativePath, path.extname(relativePath));
        const mdFile = path.join(this.outputFolder, `${baseName}.md`);
        const featureFile = path.join(this.outputFolder, `${baseName}.feature`);

        return {
            inputFile: inputFilePath,
            mdFile,
            featureFile
        };
    }

    getInputFolder(): string {
        return this.inputFolder;
    }

    getOutputFolder(): string {
        return this.outputFolder;
    }
}