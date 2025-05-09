export interface AIProvider {
  generateTestScenarios(apiSpec: any): Promise<{
    gaugeSpec: string;
    gherkinFeature: string;
  }>;
}
