import React from 'react'

interface SearchBarProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  searchBy: 'name' | 'capital'
  setSearchBy: (val: 'name' | 'capital') => void
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  searchBy,
  setSearchBy,
}) => {
  return (
    <div className="flex justify-center space-y-4 md:space-y-0 md:space-x-6">
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-center gap-4 md:gap-6">
        <input
          type="text"
          placeholder={`Search by ${searchBy}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:flex-1 px-6 py-3 border border-[#2B6CB0] bg-[#1A202C] text-white rounded-lg shadow-md focus:ring-2 focus:ring-[#4FD1C5] focus:outline-none transition-all placeholder:text-[#A0AEC0]"
        />
        <select
          value={searchBy}
          onChange={(e) => setSearchBy(e.target.value as 'name' | 'capital')}
          className="w-full md:w-40 px-6 py-3 border border-[#2B6CB0] bg-[#1A202C] text-white rounded-lg shadow-md focus:ring-2 focus:ring-[#4FD1C5] focus:outline-none transition-all"
        >
          <option value="name">Name</option>
          <option value="capital">Capital</option>
        </select>
      </div>
    </div>
  )
}

export default SearchBar