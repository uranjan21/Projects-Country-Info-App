import React from 'react'

interface FiltersProps {
  selectedRegion: string
  setSelectedRegion: (region: string) => void
  selectedTimezone: string
  setSelectedTimezone: (tz: string) => void
  allTimezones: string[]
}

const Filters: React.FC<FiltersProps> = ({
  selectedRegion,
  setSelectedRegion,
  selectedTimezone,
  setSelectedTimezone,
  allTimezones,
}) => {
  const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Antarctic']

  return (
    <div className="flex justify-center space-y-4 md:space-y-0 md:space-x-6">
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-center gap-4 md:gap-6">
        {/* Region Dropdown */}
        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          className="w-full md:flex-1 px-6 py-3 border border-[#2B6CB0] bg-[#1A202C] text-white rounded-lg shadow-md focus:ring-2 focus:ring-[#4FD1C5] focus:outline-none transition-all"
        >
          <option value="">All Regions</option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>

        {/* Timezone Dropdown */}
        <select
          value={selectedTimezone}
          onChange={(e) => setSelectedTimezone(e.target.value)}
          className="w-full md:flex-1 px-6 py-3 border border-[#2B6CB0] bg-[#1A202C] text-white rounded-lg shadow-md focus:ring-2 focus:ring-[#4FD1C5] focus:outline-none transition-all"
        >
          <option value="">All Timezones</option>
          {allTimezones.map((tz) => (
            <option key={tz} value={tz}>
              {tz}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default Filters