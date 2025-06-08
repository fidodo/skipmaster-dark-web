
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';

interface WasteTypeSelectorProps {
  selectedWasteTypes: string[];
  setSelectedWasteTypes: (types: string[]) => void;
  isCompleted: boolean;
}

const WasteTypeSelector: React.FC<WasteTypeSelectorProps> = ({ 
  selectedWasteTypes, 
  setSelectedWasteTypes, 
  isCompleted 
}) => {
  const wasteTypes = [
    { id: 'construction', label: 'Construction Waste' },
    { id: 'household', label: 'Household Waste' },
    { id: 'garden', label: 'Garden Waste' },
    { id: 'commercial', label: 'Commercial Waste' }
  ];

  const handleWasteTypeChange = (wasteType: string, checked: boolean) => {
    if (checked) {
      setSelectedWasteTypes([...selectedWasteTypes, wasteType]);
    } else {
      setSelectedWasteTypes(selectedWasteTypes.filter(type => type !== wasteType));
    }
  };

  return (
    <div className={`bg-gray-800/50 rounded-lg p-6 border-2 transition-colors ${
      isCompleted ? 'border-green-500' : 'border-gray-700'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Select Waste Types</h3>
        {isCompleted && (
          <span className="text-green-500">✓ Complete</span>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {wasteTypes.map((type) => (
          <div key={type.id} className="flex items-center space-x-3">
            <Checkbox
              id={type.id}
              checked={selectedWasteTypes.includes(type.id)}
              onCheckedChange={(checked) => handleWasteTypeChange(type.id, checked as boolean)}
              className="data-[state=checked]:bg-[#4C6EF5] data-[state=checked]:border-[#4C6EF5]"
            />
            <label 
              htmlFor={type.id} 
              className="text-sm font-medium text-gray-300 cursor-pointer"
            >
              {type.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WasteTypeSelector;
