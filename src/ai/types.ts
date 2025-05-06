export interface AIConfig {
    provider: string;
    model: string;
    promptTemplate: string;
    apiKey?: string;
    endpoint?: string;
}

export interface AIProvider {
    generateTestSteps(input: string): Promise<string>;
}

export interface AIResponse {
    content: string;
    error?: string;
}