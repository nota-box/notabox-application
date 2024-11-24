"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SideMenu } from "@/components/side-menu";
import { SearchResults } from "@/components/search-results";
import { SearchSuggestions } from "@/components/search-suggestions";
import { Logo } from "@/components/logo";
import { TypingEffect } from "@/components/typing-effect";
import { useAuth } from "@/lib/auth";
import { getSearchSuggestions, addToSearchHistory } from "@/lib/search";
import { FilterSection } from "@/components/search/filter-section";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [lastSearchQuery, setLastSearchQuery] = useState("");
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const { user, isGuest } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user && !isGuest) {
      router.push('/auth');
    }
  }, [user, isGuest, router]);

  // Filter states
  const [recordTypes, setRecordTypes] = useState({
    documents: true,
    notes: true,
    media: true,
  });
  const [date, setDate] = useState<Date>();
  const [selectedTags, setSelectedTags] = useState({
    work: false,
    personal: false,
    important: false,
    archived: false,
  });

  const suggestions = getSearchSuggestions(searchQuery);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchExpanded(true);
      setShowSuggestions(false);
      setLastSearchQuery(searchQuery.trim());
      addToSearchHistory(searchQuery.trim());
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (!value.trim()) {
      setShowSuggestions(false);
    } else {
      setShowSuggestions(true);
    }
  };

  const handleSearchFocus = () => {
    if (searchQuery.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleSuggestionSelect = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    setIsSearchExpanded(true);
    setLastSearchQuery(suggestion);
    addToSearchHistory(suggestion);
  };

  if (!user && !isGuest) {
    return null;
  }

  return (
    <main className="min-h-screen w-full relative overflow-x-hidden">
      <div className="tubelight-effect absolute inset-0 pointer-events-none" />
      
      <div className={`logo-container ${isSearchExpanded ? 'expanded' : ''}`}>
        <Logo isSearchFocused={isSearchExpanded} />
      </div>
      
      <div className={`w-full ${isSearchExpanded ? '' : 'h-screen flex items-center'} search-transition`}>
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto">
            <AnimatePresence>
              {!isSearchExpanded && (
                <TypingEffect
                  isVisible={!isSearchExpanded}
                  className="mb-12"
                />
              )}
            </AnimatePresence>

            <div className={`sticky-wrapper ${isSearchExpanded ? 'expanded' : ''}`}>
              <div 
                ref={searchContainerRef}
                className="search-container"
              >
                <form
                  onSubmit={handleSearch}
                  className="flex items-center gap-2 p-2"
                >
                  <Input
                    type="text"
                    placeholder="Search your notes..."
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    onFocus={handleSearchFocus}
                    className="border-0 focus-visible:ring-0 bg-transparent px-4"
                  />
                  <div className="flex items-center gap-1">
                    <Button type="submit" variant="ghost" size="icon" className="rounded-full">
                      <Search className="h-5 w-5" />
                    </Button>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      className={`rounded-full filter-trigger ${showFilters ? 'bg-primary/10' : ''}`}
                      onClick={() => setShowFilters(!showFilters)}
                    >
                      <Filter className="h-5 w-5" />
                    </Button>
                  </div>
                </form>

                <AnimatePresence>
                  {showSuggestions && suggestions.length > 0 && !showFilters && (
                    <SearchSuggestions
                      suggestions={suggestions}
                      query={searchQuery}
                      onSelect={handleSuggestionSelect}
                    />
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {showFilters && (
                    <FilterSection
                      recordTypes={recordTypes}
                      setRecordTypes={setRecordTypes}
                      date={date}
                      setDate={setDate}
                      selectedTags={selectedTags}
                      setSelectedTags={setSelectedTags}
                      onClose={() => setShowFilters(false)}
                    />
                  )}
                </AnimatePresence>
              </div>
            </div>

            {isSearchExpanded && lastSearchQuery && (
              <div className="results-container">
                <SearchResults 
                  query={lastSearchQuery}
                  filters={{ recordTypes, date, selectedTags }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="fixed bottom-4 left-4 rounded-full w-12 h-12"
        onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}
      >
        <Menu className="h-6 w-6" />
      </Button>

      <SideMenu 
        open={isSideMenuOpen} 
        onClose={() => setIsSideMenuOpen(false)}
      />
    </main>
  );
}