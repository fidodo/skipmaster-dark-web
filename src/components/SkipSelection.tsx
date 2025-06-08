import React from "react";
import SkipCard from "./SkipCard";
import { Skip } from "@/hooks/useSkipData";

interface SkipSelectionProps {
  selectedSkip: string | null;
  onSkipSelect: (skipId: string) => void;
  isCompleted: boolean;
  skips: Skip[];
  loading: boolean;
}

const SkipSelection: React.FC<SkipSelectionProps> = ({
  selectedSkip,
  onSkipSelect,
  isCompleted,
  skips,
  loading,
}) => {
  if (loading) {
    return (
      <div className="mb-8 md:mb-16">
        <div className="flex items-center justify-center mb-6 md:mb-8">
          <h3 className="text-xl md:text-2xl font-bold">
            Choose Your Skip Size
          </h3>
        </div>
        <div className="text-center text-gray-300">
          Loading available skips...
        </div>
      </div>
    );
  }
  console.log("selection", skips);
  return (
    <div className="mb-8 md:mb-16">
      <div className="flex items-center justify-center mb-6 md:mb-8">
        <h3 className="text-xl md:text-2xl font-bold">Choose Your Skip Size</h3>
        {isCompleted && (
          <span className="text-green-500 ml-4 text-sm md:text-base">
            ✓ Selected
          </span>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        {skips.map((skip) => (
          <SkipCard
            key={skip.id}
            skip={skip}
            isSelected={selectedSkip === skip.id}
            onSelect={onSkipSelect}
          />
        ))}
      </div>

      {/* Private Land Options */}
      <div className="bg-gray-800/50 rounded-lg p-4 md:p-6 border border-gray-700">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div className="mb-4 sm:mb-0">
            <h4 className="text-lg md:text-xl font-semibold mb-2">
              Private Land Options
            </h4>
            <p className="text-gray-300 mb-4 text-sm md:text-base">
              Larger skips available for private property
              <br />
              (no permit required for private land)
            </p>
            <button className="bg-[#F5A623] hover:bg-[#E5961F] text-black px-4 md:px-6 py-2 rounded-lg font-medium transition-colors text-sm md:text-base">
              View Private Land Options
            </button>
          </div>
          <div className="text-right">
            <span className="text-[#4C6EF5] font-medium hover:underline cursor-pointer text-sm md:text-base">
              View All
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkipSelection;
