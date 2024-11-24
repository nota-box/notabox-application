"use client";

import { motion } from "framer-motion";

interface SearchSuggestionsProps {
  suggestions: string[];
  query: string;
  onSelect: (suggestion: string) => void;
}

export function SearchSuggestions({
  suggestions,
  query,
  onSelect,
}: SearchSuggestionsProps) {
  const highlightMatch = (text: string) => {
    if (!query) return text;
    
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, i) => 
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={i} className="font-bold">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="search-suggestions"
    >
      <ul className="divide-y divide-border/30">
        {suggestions.map((suggestion, index) => (
          <li key={index}>
            <button
              className="w-full px-4 py-2 text-left hover:bg-primary/10 transition-colors first:rounded-t-2xl last:rounded-b-2xl"
              onClick={() => onSelect(suggestion)}
            >
              {highlightMatch(suggestion)}
            </button>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}