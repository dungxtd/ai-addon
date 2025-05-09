import { Collection } from 'postman-collection';
import { ApiSpecParser } from './parser.interface';

export class PostmanParser implements ApiSpecParser {
  canParse(content: any): boolean {
    return content.info && content.info.schema &&
           content.info.schema.includes('schema.getpostman.com') &&
           content.item;
  }

  parse(content: any): any {
    const collection = new Collection(content);
    const result: any = {
      name: collection.name,
      description: collection.description?.toString() || '',
      endpoints: []
    };

    // Process all items (requests) in the collection
    this.processItems(collection.items.all(), result.endpoints);

    return result;
  }

  private processItems(items: any[], endpoints: any[]): void {
    for (const item of items) {
      // If item has items, it's a folder
      if (item.items && item.items.count() > 0) {
        this.processItems(item.items.all(), endpoints);
        continue;
      }

      // Skip items without requests
      if (!item.request) continue;

      const request = item.request;
      const endpoint = {
        name: item.name,
        description: request.description?.toString() || '',
        method: request.method,
        url: request.url.toString(),
        path: this.extractPath(request.url.toString()),
        headers: this.extractHeaders(request.headers),
        body: this.extractBody(request.body),
        responses: this.extractResponses(item.responses)
      };

      endpoints.push(endpoint);
    }
  }

  private extractPath(url: string): string {
    try {
      const urlObj = new URL(url);
      return urlObj.pathname;
    } catch (e) {
      // If URL parsing fails, try to extract path manually
      const match = url.match(/https?:\/\/[^/]+(.*)/);
      return match ? match[1] : url;
    }
  }

  private extractHeaders(headers: any): Record<string, string> {
    const result: Record<string, string> = {};

    if (!headers) return result;

    headers.each((header: any) => {
      result[header.key] = header.value;
    });

    return result;
  }

  private extractBody(body: any): any {
    if (!body) return null;

    switch (body.mode) {
      case 'raw':
        try {
          // Try to parse as JSON
          return JSON.parse(body.raw);
        } catch (e) {
          // Return as string if not valid JSON
          return body.raw;
        }
      case 'formdata':
        const formData: Record<string, any> = {};
        body.formdata.each((param: any) => {
          formData[param.key] = param.value;
        });
        return formData;
      case 'urlencoded':
        const urlencoded: Record<string, any> = {};
        body.urlencoded.each((param: any) => {
          urlencoded[param.key] = param.value;
        });
        return urlencoded;
      default:
        return null;
    }
  }

  private extractResponses(responses: any): any[] {
    const result: any[] = [];

    if (!responses) return result;

    responses.each((response: any) => {
      let body = null;

      try {
        body = JSON.parse(response.body);
      } catch (e) {
        body = response.body;
      }

      result.push({
        name: response.name,
        code: response.code,
        status: response.status,
        body
      });
    });

    return result;
  }
}
