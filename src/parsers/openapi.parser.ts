import { ApiSpecParser } from './parser.interface';

export class OpenApiParser implements ApiSpecParser {
  canParse(content: any): boolean {
    return (content.swagger || content.openapi) && content.paths;
  }

  parse(content: any): any {
    const result: any = {
      name: content.info?.title || 'API Specification',
      description: content.info?.description || '',
      version: content.info?.version || '',
      endpoints: []
    };

    // Process all paths and methods
    for (const path in content.paths) {
      const pathItem = content.paths[path];
      
      for (const method in pathItem) {
        // Skip non-HTTP method properties
        if (!['get', 'post', 'put', 'delete', 'patch', 'options', 'head'].includes(method)) {
          continue;
        }
        
        const operation = pathItem[method];
        
        const endpoint = {
          name: operation.summary || operation.operationId || `${method.toUpperCase()} ${path}`,
          description: operation.description || '',
          method: method.toUpperCase(),
          path: path,
          headers: this.extractHeaders(operation),
          parameters: this.extractParameters(operation.parameters, content.components?.parameters),
          requestBody: this.extractRequestBody(operation.requestBody, content.components?.schemas),
          responses: this.extractResponses(operation.responses, content.components?.schemas)
        };
        
        result.endpoints.push(endpoint);
      }
    }

    return result;
  }

  private extractHeaders(operation: any): Record<string, string> {
    const headers: Record<string, string> = {};
    
    if (!operation.parameters) return headers;
    
    for (const param of operation.parameters) {
      if (param.in === 'header') {
        headers[param.name] = param.example || '';
      }
    }
    
    return headers;
  }

  private extractParameters(parameters: any[] = [], componentParams: any = {}): any[] {
    const result: any[] = [];
    
    if (!parameters) return result;
    
    for (const param of parameters) {
      // Handle parameter reference
      let resolvedParam = param;
      if (param.$ref) {
        const refName = param.$ref.split('/').pop();
        resolvedParam = componentParams[refName];
      }
      
      if (!resolvedParam) continue;
      
      result.push({
        name: resolvedParam.name,
        in: resolvedParam.in,
        required: resolvedParam.required || false,
        description: resolvedParam.description || '',
        schema: resolvedParam.schema,
        example: resolvedParam.example
      });
    }
    
    return result;
  }

  private extractRequestBody(requestBody: any, schemas: any = {}): any {
    if (!requestBody) return null;
    
    // Handle request body reference
    let resolvedRequestBody = requestBody;
    if (requestBody.$ref) {
      const refName = requestBody.$ref.split('/').pop();
      resolvedRequestBody = schemas[refName];
    }
    
    if (!resolvedRequestBody) return null;
    
    const content = resolvedRequestBody.content;
    if (!content) return null;
    
    // Try to get JSON content type
    const contentType = content['application/json'] || 
                        content['application/x-www-form-urlencoded'] || 
                        Object.values(content)[0];
    
    if (!contentType) return null;
    
    return {
      required: resolvedRequestBody.required || false,
      description: resolvedRequestBody.description || '',
      schema: contentType.schema,
      example: contentType.example || this.extractExample(contentType.schema, schemas)
    };
  }

  private extractResponses(responses: any, schemas: any = {}): any[] {
    const result: any[] = [];
    
    if (!responses) return result;
    
    for (const statusCode in responses) {
      const response = responses[statusCode];
      
      // Handle response reference
      let resolvedResponse = response;
      if (response.$ref) {
        const refName = response.$ref.split('/').pop();
        resolvedResponse = schemas[refName];
      }
      
      if (!resolvedResponse) continue;
      
      const content = resolvedResponse.content;
      let schema = null;
      let example = null;
      
      if (content) {
        // Try to get JSON content type
        const contentType = content['application/json'] || Object.values(content)[0];
        
        if (contentType) {
          schema = contentType.schema;
          example = contentType.example || this.extractExample(contentType.schema, schemas);
        }
      }
      
      result.push({
        statusCode,
        description: resolvedResponse.description || '',
        headers: resolvedResponse.headers || {},
        schema,
        example
      });
    }
    
    return result;
  }

  private extractExample(schema: any, schemas: any = {}): any {
    if (!schema) return null;
    
    // Handle schema reference
    if (schema.$ref) {
      const refName = schema.$ref.split('/').pop();
      schema = schemas[refName];
    }
    
    if (!schema) return null;
    
    // If schema has example, use it
    if (schema.example) return schema.example;
    
    // Otherwise, generate a simple example based on schema type
    switch (schema.type) {
      case 'object':
        const example: Record<string, any> = {};
        if (schema.properties) {
          for (const prop in schema.properties) {
            example[prop] = this.extractExample(schema.properties[prop], schemas);
          }
        }
        return example;
      case 'array':
        return [this.extractExample(schema.items, schemas)];
      case 'string':
        return 'string';
      case 'number':
      case 'integer':
        return 0;
      case 'boolean':
        return false;
      default:
        return null;
    }
  }
}
