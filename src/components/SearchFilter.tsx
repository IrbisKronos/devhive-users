// "use client" — requires browser event handlers (onChange)
"use client";

import React from "react";

interface SearchFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  cityFilter: string;
  onCityChange: (city: string) => void;
  cities: string[];
}

/**
 * Controlled search & city filter component.
 * Purely presentational — no filtering logic here; it delegates value changes
 * to the parent via callbacks. Debouncing happens in useUsers, not here.
 * Wrapped in React.memo to skip re-renders when props haven't changed.
 */
const SearchFilter: React.FC<SearchFilterProps> = React.memo(
  ({ searchQuery, onSearchChange, cityFilter, onCityChange, cities }) => {
    return (
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={cityFilter}
          onChange={(e) => onCityChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="">All Cities</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

SearchFilter.displayName = "SearchFilter";

export default SearchFilter;
