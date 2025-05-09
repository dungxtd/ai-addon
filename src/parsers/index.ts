import { ApiSpecParser } from './parser.interface';
import { PostmanParser } from './postman.parser';
import { OpenApiParser } from './openapi.parser';

export function getParser(content: any): ApiSpecParser {
  const parsers: ApiSpecParser[] = [
    new PostmanParser(),
    new OpenApiParser()
  ];
  
  for (const parser of parsers) {
    if (parser.canParse(content)) {
      return parser;
    }
  }
  
  throw new Error('Unsupported API specification format');
}
