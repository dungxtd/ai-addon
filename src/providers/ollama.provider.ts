import ollama from 'ollama';
import { AIProvider } from './provider.interface';
import { Config } from '../config/config';

export class OllamaProvider implements AIProvider {
  private endpoint: string;
  private model: string = 'llama3';

  constructor(config: Config) {
    if (!config.ollamaEndpoint) {
      throw new Error('Ollama endpoint is required');
    }
    
    this.endpoint = config.ollamaEndpoint;
  }

  async generateTestScenarios(apiSpec: any): Promise<{ gaugeSpec: string; gherkinFeature: string }> {
    const prompt = this.buildPrompt(apiSpec);
    
    const response = await ollama.chat({
      model: this.model,
      messages: [
        {
          role: 'system',
          content: `You are an expert QA engineer and assistant that helps generate automated API test scenarios from API specification files such as Postman Collections and OpenAPI/Swagger JSON.`
        },
        {
          role: 'user',
          content: prompt
        }
      ],
    });

    const content = response.message.content;
    
    // Extract Gauge spec and Gherkin feature from the response
    const gaugeSpec = this.extractGaugeSpec(content);
    const gherkinFeature = this.extractGherkinFeature(content);
    
    return {
      gaugeSpec,
      gherkinFeature
    };
  }

  private buildPrompt(apiSpec: any): string {
    return `
# Generate Test Scenarios from API Specification

## API Specification:
\`\`\`json
${JSON.stringify(apiSpec, null, 2)}
\`\`\`

## Instructions:
Generate detailed API test scenarios in two formats:
1. Gauge Spec in Markdown syntax (.spec)
2. Gherkin Feature in .feature format for BDD testing

For each API endpoint, generate test scenarios that cover:
- ✅ 200 OK – Successful Request
- ❌ 400 Bad Request – Invalid input
- 🔒 401 Unauthorized – Missing or invalid authentication
- 🚫 403 Forbidden – Authenticated but access denied

Each output should contain realistic request steps and assertions based on common patterns or explicit response examples.

## Output Format:
Please provide your response in the following format:

### Gauge Spec:
\`\`\`gauge
# Your Gauge spec content here
\`\`\`

### Gherkin Feature:
\`\`\`gherkin
Feature: Your Gherkin feature content here
\`\`\`
`;
  }

  private extractGaugeSpec(content: string): string {
    const gaugeMatch = content.match(/```gauge\s*([\s\S]*?)```/);
    return gaugeMatch ? gaugeMatch[1].trim() : '';
  }

  private extractGherkinFeature(content: string): string {
    const gherkinMatch = content.match(/```gherkin\s*([\s\S]*?)```/);
    return gherkinMatch ? gherkinMatch[1].trim() : '';
  }
}
