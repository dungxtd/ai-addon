import { Request } from 'postman-collection';

export interface ApiInfo {
    name: string;
    method: string;
    url: string;
    headers: Record<string, string>;
    body?: any;
    path?: string[];
}

export interface TestStep {
    scenario: string;
    steps: string[];
}

export interface AIConfig {
    provider: string;
    model: string;
    promptTemplate: string;
    apiKey?: string;
    endpoint?: string;
}

export interface TestFormat {
    gauge: string;
    gherkin: string;
}

export interface TestScenario {
    title: string;
    steps: TestStep[];
}

export interface GeneratedTests {
    gauge: TestStep[];
    gherkin: TestStep[];
}

export interface AIProvider {
    generateTestFormats(api: ApiInfo): Promise<TestFormat>;
}

export interface CollectionProcessor {
    processRequest(request: Request): ApiInfo;
    processFolder(folder: any, path: string[]): ApiInfo[];
}