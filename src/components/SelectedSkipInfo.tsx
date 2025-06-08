
import React from 'react';

interface SelectedSkipInfoProps {
  selectedSkip: string | null;
}

const SelectedSkipInfo: React.FC<SelectedSkipInfoProps> = ({ selectedSkip }) => {
  const skipInfo = {
    '4-yard': { name: '4 Yard Skip', price: '£211', description: 'Small projects (20-40 bin bags)' },
    '6-yard': { name: '6 Yard Skip', price: '£235', description: 'Medium projects (40-60 bin bags)' },
    '8-yard': { name: '8 Yard Skip', price: '£268', description: 'Large projects (60-80 bin bags)' },
    '10-yard': { name: '10 Yard Skip', price: '£275', description: 'Extra large projects (80-100 bin bags)' },
    '12-yard': { name: '12 Yard Skip', price: '£284', description: 'Major projects (100+ bin bags)' }
  };

  if (!selectedSkip || !skipInfo[selectedSkip as keyof typeof skipInfo]) {
    return null;
  }

  const info = skipInfo[selectedSkip as keyof typeof skipInfo];

  return (
    <div className="bg-gray-800/50 rounded-lg p-4 md:p-6 border border-[#4C6EF5] mb-4 md:mb-6">
      <h4 className="text-lg md:text-xl font-semibold mb-2 text-[#4C6EF5]">Selected Skip</h4>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <div>
          <h5 className="text-base md:text-lg font-medium text-white">{info.name}</h5>
          <p className="text-gray-300 text-sm md:text-base">{info.description}</p>
          <p className="text-xs md:text-sm text-gray-400">14-day hire period</p>
        </div>
        <div className="mt-2 sm:mt-0">
          <span className="text-xl md:text-2xl font-bold text-[#4C6EF5]">{info.price}</span>
        </div>
      </div>
    </div>
  );
};

export default SelectedSkipInfo;
