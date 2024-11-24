"use client";

// Mock data for initial search history
const DEFAULT_SEARCHES = [
  "Project documentation",
  "Meeting notes",
  "Research data",
  "Team updates",
  "Product roadmap"
];

// Maximum number of searches to keep in history
const MAX_HISTORY_ITEMS = 10;

// Get search history from localStorage or return default items
const getStoredHistory = (): string[] => {
  if (typeof window === 'undefined') return DEFAULT_SEARCHES;
  
  try {
    const stored = localStorage.getItem('searchHistory');
    return stored ? JSON.parse(stored) : DEFAULT_SEARCHES;
  } catch {
    return DEFAULT_SEARCHES;
  }
};

// Add a new search query to history
export const addToSearchHistory = (query: string) => {
  if (typeof window === 'undefined' || !query.trim()) return;
  
  const history = getStoredHistory();
  const normalizedQuery = query.trim();
  
  // Add new query to the beginning and remove duplicates
  const newHistory = [
    normalizedQuery,
    ...history.filter(item => item.toLowerCase() !== normalizedQuery.toLowerCase())
  ].slice(0, MAX_HISTORY_ITEMS);
  
  localStorage.setItem('searchHistory', JSON.stringify(newHistory));
};

// Get search suggestions based on input query
export function getSearchSuggestions(query: string): string[] {
  const history = getStoredHistory();
  const normalizedQuery = query.toLowerCase().trim();
  
  if (!normalizedQuery) {
    return history.slice(0, 5); // Show recent searches when input is empty
  }
  
  return history
    .filter(item => item.toLowerCase().includes(normalizedQuery))
    .slice(0, 5); // Return top 5 matches
}

// Clear search history
export const clearSearchHistory = () => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('searchHistory', JSON.stringify(DEFAULT_SEARCHES));
};