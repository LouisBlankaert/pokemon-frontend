"use client"

import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const letter = e.target.value;
    setSearchTerm(letter);
    onSearch(letter);
  };

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={handleSearch}
      placeholder="Rechercher un Pokémon..."
      className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
    />
  );
}
