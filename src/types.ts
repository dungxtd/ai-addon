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

export interface TestScenario {
    title: string;
    steps: TestStep[];
}

export interface CollectionProcessor {
    processRequest(request: Request): ApiInfo;
    processFolder(folder: any, path: string[]): ApiInfo[];
}