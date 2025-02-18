import React, { useState } from 'react';

export const InputSearch = ({ className = '', onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Panggil fungsi onSearch dengan debounce
    const timeoutId = setTimeout(() => {
      onSearch(value);
    }, 300);

    // Bersihkan timeout sebelumnya
    return () => clearTimeout(timeoutId);
  };

  return (
    <input
      type="text"
      placeholder="Cari task..."
      value={searchTerm}
      onChange={handleChange}
      className={`w-full p-4 bg-ashGray1 border border-gray-200 rounded-lg outline-none text-sm ${className}`}
    />
  );
};