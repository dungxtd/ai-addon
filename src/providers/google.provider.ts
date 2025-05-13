import { GoogleGenerativeAI } from '@google/generative-ai';
import { AIProvider } from './provider.interface';
import { Config } from '../config/config';

export class GoogleAIProvider implements AIProvider {
  private client: GoogleGenerativeAI;
  private model: string = 'gemini-2.0-flash';

  constructor(config: Config) {
    if (!config.googleAiApiKey) {
      throw new Error('Google AI API key is required');
    }

    this.client = new GoogleGenerativeAI(config.googleAiApiKey);
  }

  async generateTestScenarios(apiSpec: any): Promise<{ gaugeSpec: string; gherkinFeature: string }> {
    const prompt = this.buildPrompt(apiSpec);

    const model = this.client.getGenerativeModel({ model: this.model });

    const result = await model.generateContent(prompt);
    const response = result.response;
    const content = response.text();

    // Extract Gauge spec and Gherkin feature from the response
    const gaugeSpec = this.extractGaugeSpec(content);
    const gherkinFeature = this.extractGherkinFeature(content);

    return {
      gaugeSpec,
      gherkinFeature
    };
  }

  private buildPrompt(apiSpec: any): string {
    // Extract base URL from servers if available
    let baseUrl = "https://api.example.com";
    if (apiSpec.servers && apiSpec.servers.length > 0 && apiSpec.servers[0].url) {
      baseUrl = apiSpec.servers[0].url;
    }

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

## Output Format Examples:

### Gauge Spec (.spec) Example:
\`\`\`
# API Test - Get User

## Scenario: Get User Details - Success
* Call GET "${baseUrl}/users/1"
* Verify response status is 200
* Verify response body contains "id"
* Verify response body contains "name"

## Scenario: Create User - Success
* Set request body to
"""
{
  "name": "New User",
  "email": "newuser@example.com",
  "role": "editor"
}
"""
* Call POST "${baseUrl}/users"
* Verify response status is 201
* Verify response body contains "id"

## Scenario: Get User Details - Bad Request (400)
* Call GET "${baseUrl}/users/invalid_id"
* Verify response status is 400
* Verify response body contains "error"

## Scenario: Get User Details - Unauthorized (401)
* Call GET "${baseUrl}/users/1"
* Set Authorization header "Bearer invalid_token"
* Verify response status is 401
* Verify response body contains "error"

## Scenario: Get User Details - Forbidden (403)
* Call GET "${baseUrl}/users/1"
* Set Authorization header "Bearer forbidden_token"
* Verify response status is 403
* Verify response body contains "error"
\`\`\`

### Gherkin Feature (.feature) Example:
\`\`\`
Feature: Get User API

  Scenario: Get User Details - Success
    Given I send a GET request to "${baseUrl}/users/1"
    Then the response status should be 200
    And the response body should contain "id"
    And the response body should contain "name"

  Scenario: Create User - Success
    Given I set the request body to
    """
    {
      "name": "New User",
      "email": "newuser@example.com",
      "role": "editor"
    }
    """
    When I send a POST request to "${baseUrl}/users"
    Then the response status should be 201
    And the response body should contain "id"

  Scenario: Get User Details - Bad Request (400)
    Given I send a GET request to "${baseUrl}/users/invalid_id"
    Then the response status should be 400
    And the response body should contain "error"

  Scenario: Get User Details - Unauthorized (401)
    Given I send a GET request to "${baseUrl}/users/1" with authorization "Bearer invalid_token"
    Then the response status should be 401
    And the response body should contain "error"

  Scenario: Get User Details - Forbidden (403)
    Given I send a GET request to "${baseUrl}/users/1" with authorization "Bearer forbidden_token"
    Then the response status should be 403
    And the response body should contain "error"
\`\`\`

Please follow these exact formats for your response, with proper headings, scenario structures, and detailed verification steps.

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
    if (!gaugeMatch) return '';

    let specContent = gaugeMatch[1].trim();

    // Ensure code blocks use Markdown style (```) instead of triple quotes (""")
    specContent = specContent.replace(/"""/g, '```');

    // Fix nested code blocks by ensuring proper formatting
    // This regex finds code blocks and ensures they're properly formatted
    specContent = specContent.replace(/```(.*?)\n([\s\S]*?)```/g, (_, language, code) => {
      return '```' + language.trim() + '\n' + code.trim() + '\n```';
    });

    return specContent;
  }

  private extractGherkinFeature(content: string): string {
    const gherkinMatch = content.match(/```gherkin\s*([\s\S]*?)```/);
    if (!gherkinMatch) return '';

    let featureContent = gherkinMatch[1].trim();

    // Ensure code blocks use Markdown style (```) instead of triple quotes (""")
    featureContent = featureContent.replace(/"""/g, '```');

    // Fix nested code blocks by ensuring proper formatting
    // This regex finds code blocks and ensures they're properly formatted
    featureContent = featureContent.replace(/```(.*?)\n([\s\S]*?)```/g, (_, language, code) => {
      return '```' + language.trim() + '\n' + code.trim() + '\n```';
    });

    return featureContent;
  }
}
