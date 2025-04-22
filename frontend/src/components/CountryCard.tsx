import React from 'react'

interface CountryCardProps {
  name: string
  region: string
  flag: string
  timezone: string
}

const CountryCard: React.FC<CountryCardProps> = ({
  name,
  region,
  flag,
  timezone,
}) => {
  return (
    <div className="bg-gray-800 rounded-xl shadow-md border border-gray-700 transition-transform transform hover:scale-105 cursor-pointer hover:shadow-[0_0_15px_4px_rgba(0,255,255,0.3)]">
      <img
        src={flag}
        alt={`Flag of ${name}`}
        className="w-full h-40 object-cover rounded-t-xl"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold text-cyan-300">{name}</h2>
        <p className="text-gray-300">Region: <span className="text-white">{region}</span></p>
        <p className="text-gray-400 text-sm">Timezone: <span className="text-white">{timezone}</span></p>
      </div>
    </div>
  )
}

export default CountryCard