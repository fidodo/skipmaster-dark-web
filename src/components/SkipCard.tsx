
import React from "react";
import { Badge } from "./ui/badge";

interface Skip {
  id: string;
  name: string;
  price: number | string;
  description: string;
  details: string;
  image: string;
  available: boolean;
  allowed_on_road?: boolean;
  allows_heavy_waste?: boolean;
  area?: string;
  created_at?: string;
  forbidden?: boolean;
  hire_period_days?: number;
  per_tonne_cost?: number | null;
  postcode?: string;
  price_before_vat?: number;
  size?: number;
  transport_cost?: number | null;
  updated_at?: string;
  vat?: number;
}

interface SkipCardProps {
  skip: Skip;
  isSelected: boolean;
  onSelect: (skipId: string) => void;
}

const SkipCard: React.FC<SkipCardProps> = ({ skip, isSelected, onSelect }) => {
  console.log("Rendering SkipCard for skip:", skip);
  return (
    <div
      className={`relative bg-gray-800/50 rounded-lg border transition-all duration-300 hover:scale-105 ${
        isSelected
          ? "border-[#4C6EF5] ring-2 ring-[#4C6EF5]/20"
          : "border-gray-700"
      } ${!skip.available ? "opacity-60" : ""}`}
    >
      {isSelected && (
        <div className="absolute -top-2 -right-2 z-20">
          <Badge variant="default" className="bg-[#4C6EF5] text-white px-2 py-1 text-xs font-semibold">
            Selected
          </Badge>
        </div>
      )}

      {!skip.available && (
        <div className="absolute inset-0 bg-red-500/20 rounded-lg flex items-center justify-center z-10">
          <span className="bg-red-500 text-white px-3 md:px-4 py-1 md:py-2 rounded-lg font-semibold transform -rotate-12 text-sm md:text-base">
            Not Available
          </span>
        </div>
      )}

      <div className="p-4 md:p-6">
        <div className="aspect-video bg-gray-700 rounded-lg mb-3 md:mb-4 overflow-hidden">
          <img
            src={skip.image}
            alt={skip.name}
            className="w-full h-full object-cover"
          />
        </div>

        <h4 className="text-lg md:text-xl font-semibold mb-2">{skip.name}</h4>
        <div className="text-xl md:text-2xl font-bold text-[#4C6EF5] mb-2 md:mb-3">
          {skip.price}
        </div>

        <div className="space-y-1 md:space-y-2 mb-4 md:mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
            <span className="text-xs md:text-sm text-gray-300">
              {skip.description}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
            <span className="text-xs md:text-sm text-gray-300">
              {skip.details}
            </span>
          </div>
          {skip.allowed_on_road && (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
              <span className="text-xs md:text-sm text-gray-300">
                Road permit available
              </span>
            </div>
          )}
          {skip.allows_heavy_waste && (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
              <span className="text-xs md:text-sm text-gray-300">
                Heavy waste accepted
              </span>
            </div>
          )}
        </div>

        <button
          onClick={() => skip.available && !isSelected && onSelect(skip.id)}
          disabled={!skip.available || isSelected}
          className={`w-full py-2 md:py-3 rounded-lg font-medium transition-colors text-sm md:text-base ${
            isSelected
              ? "bg-green-500 text-white cursor-default"
              : skip.available
              ? "bg-[#4C6EF5] hover:bg-[#3B5BDB] text-white"
              : "bg-gray-600 text-gray-400 cursor-not-allowed"
          }`}
        >
          {isSelected ? "Selected" : skip.available ? "Select This Skip" : "Not Available"}
        </button>
      </div>
    </div>
  );
};

export default SkipCard;
