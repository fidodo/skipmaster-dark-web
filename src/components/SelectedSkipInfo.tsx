
import React from 'react';

interface SelectedSkipInfoProps {
  selectedSkip: string | null;
}

const SelectedSkipInfo: React.FC<SelectedSkipInfoProps> = ({ selectedSkip }) => {
  const skipInfo = {
    '4-yard': { 
      name: '4 Yard Skip', 
      price: '£298', 
      price_before_vat: 278,
      vat: 20,
      description: 'Small projects (20-40 bin bags)',
      hire_period_days: 14,
      allowed_on_road: true,
      allows_heavy_waste: true,
      size: 4
    },
    '6-yard': { 
      name: '6 Yard Skip', 
      price: '£282', 
      price_before_vat: 235,
      vat: 20,
      description: 'Medium projects (40-60 bin bags)',
      hire_period_days: 14,
      allowed_on_road: true,
      allows_heavy_waste: true,
      size: 6
    },
    '8-yard': { 
      name: '8 Yard Skip', 
      price: '£322', 
      price_before_vat: 268,
      vat: 20,
      description: 'Large projects (60-80 bin bags)',
      hire_period_days: 14,
      allowed_on_road: true,
      allows_heavy_waste: true,
      size: 8
    },
    '10-yard': { 
      name: '10 Yard Skip', 
      price: '£330', 
      price_before_vat: 275,
      vat: 20,
      description: 'Extra large projects (80-100 bin bags)',
      hire_period_days: 14,
      allowed_on_road: false,
      allows_heavy_waste: true,
      size: 10
    },
    '12-yard': { 
      name: '12 Yard Skip', 
      price: '£341', 
      price_before_vat: 284,
      vat: 20,
      description: 'Major projects (100+ bin bags)',
      hire_period_days: 14,
      allowed_on_road: false,
      allows_heavy_waste: true,
      size: 12
    }
  };

  if (!selectedSkip || !skipInfo[selectedSkip as keyof typeof skipInfo]) {
    return null;
  }

  const info = skipInfo[selectedSkip as keyof typeof skipInfo];

  return (
    <div className="bg-gray-800/50 rounded-lg p-4 md:p-6 border border-[#4C6EF5] mb-4 md:mb-6 max-w-2xl mx-auto">
      <h4 className="text-lg md:text-xl font-semibold mb-3 text-[#4C6EF5] text-center">Selected Skip Details</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div>
            <h5 className="text-base md:text-lg font-medium text-white">{info.name}</h5>
            <p className="text-gray-300 text-sm md:text-base">{info.description}</p>
          </div>
          
          <div className="space-y-1 text-xs md:text-sm text-gray-400">
            <p>• {info.hire_period_days}-day hire period</p>
            <p>• Size: {info.size} cubic yards</p>
            {info.allowed_on_road && <p>• Road placement available</p>}
            {info.allows_heavy_waste && <p>• Heavy waste accepted</p>}
          </div>
        </div>
        
        <div className="text-center md:text-right">
          <div className="space-y-1">
            <span className="text-xl md:text-2xl font-bold text-[#4C6EF5] block">{info.price}</span>
            <div className="text-xs text-gray-400">
              <p>Price before VAT: £{info.price_before_vat}</p>
              <p>VAT ({info.vat}%): £{info.price_before_vat * (info.vat / 100)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedSkipInfo;
