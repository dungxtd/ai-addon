export interface ApiSpecParser {
  canParse(content: any): boolean;
  parse(content: any): any;
}
