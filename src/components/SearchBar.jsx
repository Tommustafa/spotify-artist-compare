import { useState, useEffect, useRef } from 'react';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const debounceRef = useRef(null);

  useEffect(() => {
    // Clear previous timeout
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Debounce search by 300ms
    debounceRef.current = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, onSearch]);

  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <svg 
          className="search-icon" 
          viewBox="0 0 24 24" 
          fill="currentColor"
        >
          <path d="M10.533 1.279C5.352 1.279 1.126 5.419 1.126 10.558C1.126 15.697 5.352 19.837 10.533 19.837C12.767 19.837 14.824 19.067 16.44 17.779L20.793 22.132C21.183 22.523 21.817 22.523 22.207 22.132C22.598 21.742 22.598 21.108 22.207 20.718L17.863 16.374C19.162 14.785 19.94 12.763 19.94 10.558C19.94 5.419 15.714 1.279 10.533 1.279ZM3.126 10.558C3.126 6.552 6.428 3.279 10.533 3.279C14.638 3.279 17.94 6.552 17.94 10.558C17.94 14.564 14.638 17.837 10.533 17.837C6.428 17.837 3.126 14.564 3.126 10.558Z"/>
        </svg>
        <input
          type="text"
          placeholder="Search for an artist..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        {query && (
          <button 
            className="clear-button"
            onClick={() => setQuery('')}
            aria-label="Clear search"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
