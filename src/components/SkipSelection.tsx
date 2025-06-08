
import React, { useState, useEffect } from "react";
import SkipCard from "./SkipCard";

interface SkipSelectionProps {
  selectedSkip: string | null;
  onSkipSelect: (skipId: string) => void;
  isCompleted: boolean;
  postcode: string;
}

interface Skip {
  id: string;
  name: string;
  price_before_vat: number | string;
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
  size?: number;
  transport_cost?: number | null;
  updated_at?: string;
  vat?: number;
}

const SkipSelection: React.FC<SkipSelectionProps> = ({
  selectedSkip,
  onSkipSelect,
  isCompleted,
  postcode,
}) => {
  const [skips, setSkips] = useState<Skip[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSkips = async () => {
      if (!postcode) return;
      console.log("Fetching skips for postcode:", postcode);
      setLoading(true);
      try {
        // Extract postcode area (first part before space or first 3-4 chars)
        const postcodeArea = postcode.split(" ")[0] || postcode.substring(0, 4);
        const response = await fetch(
          `https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft`
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Fetched skips:", data);
          // Transform API data to our skip format
          const transformedSkips = data.map((skip: any, index: number) => ({
            id: skip.id ? skip.id.toString() : `skip-${index}`,
            name: skip.name || `${skip.size || "4"} Yard Skip`,
            price: skip.price_before_vat && skip.vat
              ? `£${skip.price_before_vat + (skip.price_before_vat * (skip.vat / 100))}`
              : skip.price_before_vat 
                ? `£${skip.price_before_vat}`
                : "£211",
            description: skip.description || `Perfect for projects (${skip.size || 4} yard capacity)`,
            details: `${skip.hire_period_days || 14}-day hire period`,
            image: skip.image || "/lovable-uploads/42ca4871-a851-4dcd-8117-88f5faf25402.png",
            available: skip.available !== false && !skip.forbidden,
            // Include all the new fields
            allowed_on_road: skip.allowed_on_road,
            allows_heavy_waste: skip.allows_heavy_waste,
            area: skip.area,
            created_at: skip.created_at,
            forbidden: skip.forbidden,
            hire_period_days: skip.hire_period_days,
            per_tonne_cost: skip.per_tonne_cost,
            postcode: skip.postcode,
            price_before_vat: skip.price_before_vat,
            size: skip.size,
            transport_cost: skip.transport_cost,
            updated_at: skip.updated_at,
            vat: skip.vat,
          }));
          setSkips(transformedSkips);
        } else {
          // Fallback to default skips if API fails
          setSkips(getDefaultSkips());
        }
      } catch (error) {
        console.error("Error fetching skips:", error);
        // Fallback to default skips
        setSkips(getDefaultSkips());
      } finally {
        setLoading(false);
      }
    };

    fetchSkips();
  }, [postcode]);

  const getDefaultSkips = (): Skip[] => [
    {
      id: "4-yard",
      name: "4 Yard Skip",
      price_before_vat: 278,
      description: "Small projects (20-40 bin bags)",
      details: "14-day hire period",
      image: "/lovable-uploads/42ca4871-a851-4dcd-8117-88f5faf25402.png",
      available: true,
      allowed_on_road: true,
      allows_heavy_waste: true,
      hire_period_days: 14,
      size: 4,
      vat: 20,
    },
    {
      id: "6-yard",
      name: "6 Yard Skip",
      price_before_vat: 235,
      description: "Medium projects (40-60 bin bags)",
      details: "14-day hire period",
      image: "/lovable-uploads/42ca4871-a851-4dcd-8117-88f5faf25402.png",
      available: true,
      allowed_on_road: true,
      allows_heavy_waste: true,
      hire_period_days: 14,
      size: 6,
      vat: 20,
    },
    {
      id: "8-yard",
      name: "8 Yard Skip",
      price_before_vat: 268,
      description: "Large projects (60-80 bin bags)",
      details: "14-day hire period",
      image: "/lovable-uploads/42ca4871-a851-4dcd-8117-88f5faf25402.png",
      available: true,
      allowed_on_road: true,
      allows_heavy_waste: true,
      hire_period_days: 14,
      size: 8,
      vat: 20,
    },
    {
      id: "10-yard",
      name: "10 Yard Skip",
      price_before_vat: 275,
      description: "Extra large projects (80-100 bin bags)",
      details: "14-day hire period",
      image: "/public/images/10yards.jpeg",
      available: false,
      allowed_on_road: false,
      allows_heavy_waste: true,
      hire_period_days: 14,
      size: 10,
      vat: 20,
    },
    {
      id: "12-yard",
      name: "12 Yard Skip",
      price_before_vat: 284,
      description: "Major projects (100+ bin bags)",
      details: "14-day hire period",
      image: "/lovable-uploads/42ca4871-a851-4dcd-8117-88f5faf25402.png",
      available: false,
      allowed_on_road: false,
      allows_heavy_waste: true,
      hire_period_days: 14,
      size: 12,
      vat: 20,
    },
  ];

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
