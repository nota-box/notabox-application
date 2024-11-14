export interface SearchSuggestion {
  id: number;
  text: string;
  frequency: number;
}

export interface SearchResult {
  id: number;
  name: string;
  type: string;
  size: string;
  modified: string;
  icon: any;
  description: string;
  tags: string[];
  createdBy?: string;
  lastModifiedBy?: string;
  version?: string;
  status?: string;
}