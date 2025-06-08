import React, { useState, useEffect } from "react";
import { Check, Clock, AlertCircle, Recycle } from "lucide-react";
import NavigationTabs from "../components/NavigationTabs";
import HeroSection from "../components/HeroSection";
import WasteTypeSelector from "../components/WasteTypeSelector";
import SkipSelection from "../components/SkipSelection";
import SelectedSkipInfo from "../components/SelectedSkipInfo";
import Footer from "../components/Footer";

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

const Index = () => {
  const [selectedSkip, setSelectedSkip] = useState<string | null>(null);
  const [postcode, setPostcode] = useState("");
  const [selectedWasteTypes, setSelectedWasteTypes] = useState<string[]>([]);
  const [isPostcodeCompleted, setIsPostcodeCompleted] = useState(false);
  const [skips, setSkips] = useState<Skip[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSkipSelect = (skipId: string) => {
    setSelectedSkip(skipId);
  };

  const handleCheckAvailability = () => {
    if (postcode.trim()) {
      console.log("Checking availability for postcode:", postcode);
      setIsPostcodeCompleted(true);
    }
  };

  const getDefaultSkips = (): Skip[] => [
    {
      id: "4-yard",
      name: "4 Yard Skip",
      price: "£298",
      description: "Small projects (20-40 bin bags)",
      details: "14-day hire period",
      image: "/lovable-uploads/42ca4871-a851-4dcd-8117-88f5faf25402.png",
      available: true,
      allowed_on_road: true,
      allows_heavy_waste: true,
      hire_period_days: 14,
      size: 4,
      price_before_vat: 278,
      vat: 20,
    },
    {
      id: "6-yard",
      name: "6 Yard Skip",
      price: "£282",
      description: "Medium projects (40-60 bin bags)",
      details: "14-day hire period",
      image: "/lovable-uploads/42ca4871-a851-4dcd-8117-88f5faf25402.png",
      available: true,
      allowed_on_road: true,
      allows_heavy_waste: true,
      hire_period_days: 14,
      size: 6,
      price_before_vat: 235,
      vat: 20,
    },
    {
      id: "8-yard",
      name: "8 Yard Skip",
      price: "£322",
      description: "Large projects (60-80 bin bags)",
      details: "14-day hire period",
      image: "/lovable-uploads/42ca4871-a851-4dcd-8117-88f5faf25402.png",
      available: true,
      allowed_on_road: true,
      allows_heavy_waste: true,
      hire_period_days: 14,
      size: 8,
      price_before_vat: 268,
      vat: 20,
    },
    {
      id: "10-yard",
      name: "10 Yard Skip",
      price: "£330",
      description: "Extra large projects (80-100 bin bags)",
      details: "14-day hire period",
      image: "/public/images/10yards.jpeg",
      available: false,
      allowed_on_road: false,
      allows_heavy_waste: true,
      hire_period_days: 14,
      size: 10,
      price_before_vat: 275,
      vat: 20,
    },
    {
      id: "12-yard",
      name: "12 Yard Skip",
      price: "£341",
      description: "Major projects (100+ bin bags)",
      details: "14-day hire period",
      image: "/lovable-uploads/42ca4871-a851-4dcd-8117-88f5faf25402.png",
      available: false,
      allowed_on_road: false,
      allows_heavy_waste: true,
      hire_period_days: 14,
      size: 12,
      price_before_vat: 284,
      vat: 20,
    },
  ];

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

  const isWasteTypeCompleted = selectedWasteTypes.length > 0;
  const isSkipSelected = selectedSkip !== null;

  return (
    <div className="min-h-screen bg-[#1C2526] text-white">
      {/* Header */}
      <header className="bg-[#1C2526] border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {isPostcodeCompleted && (
              <div className="hidden md:flex items-center space-x-4 text-sm">
                <span className="text-gray-300">Postcode verified</span>
                <span className="text-green-400">✓ Available for delivery</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <NavigationTabs
        isPostcodeCompleted={isPostcodeCompleted}
        isWasteTypeCompleted={isWasteTypeCompleted}
        isSkipSelected={isSkipSelected}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-4 md:py-8">
        {/* Hero Section */}
        <HeroSection
          postcode={postcode}
          setPostcode={setPostcode}
          onCheckAvailability={handleCheckAvailability}
          isPostcodeCompleted={isPostcodeCompleted}
        />

        {/* Waste Type Selection */}
        <div className="mb-8 md:mb-12">
          <WasteTypeSelector
            selectedWasteTypes={selectedWasteTypes}
            setSelectedWasteTypes={setSelectedWasteTypes}
            isCompleted={isWasteTypeCompleted}
          />
        </div>

        {/* Skip Size Selection - Only show if waste types are selected */}
        {isWasteTypeCompleted && (
          <SkipSelection
            selectedSkip={selectedSkip}
            onSkipSelect={handleSkipSelect}
            isCompleted={isSkipSelected}
            skips={skips}
            loading={loading}
          />
        )}

        {/* Important Information */}
        <div className="bg-[#2D3748] rounded-lg p-4 md:p-8 mb-8 md:mb-16">
          <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-center">
            Important Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-start space-x-3 md:space-x-4">
                <div className="bg-[#4C6EF5] rounded-full p-2 flex-shrink-0">
                  <Clock className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-sm md:text-base">
                    Delivery & Collection
                  </h4>
                  <p className="text-gray-300 text-xs md:text-sm">
                    We charge your skip hire after delivery and collect it
                    within 3 days of your chosen end date and contact us to
                    arrange collection.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 md:space-x-4">
                <div className="bg-[#4C6EF5] rounded-full p-2 flex-shrink-0">
                  <Check className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-sm md:text-base">
                    Road Permits
                  </h4>
                  <p className="text-gray-300 text-xs md:text-sm">
                    If placing the skip on a public road, a permit is required.
                    We handle the application process for you.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 md:space-y-6">
              <div className="flex items-start space-x-3 md:space-x-4">
                <div className="bg-[#4C6EF5] rounded-full p-2 flex-shrink-0">
                  <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-sm md:text-base">
                    Restricted Items
                  </h4>
                  <p className="text-gray-300 text-xs md:text-sm">
                    Certain items cannot be disposed of in skips, including
                    hazardous waste, electronics, and gas bottles.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 md:space-x-4">
                <div className="bg-[#4C6EF5] rounded-full p-2 flex-shrink-0">
                  <Recycle className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-sm md:text-base">
                    Extended Hire
                  </h4>
                  <p className="text-gray-300 text-xs md:text-sm">
                    Need your skip for longer than 14 days? Extended hire is
                    available at £20 per day. Contact us to arrange.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h3 className="text-xl md:text-2xl font-bold mb-4">
            Ready to Proceed?
          </h3>
          
          {/* Disclaimer and Product Description */}
          {isSkipSelected && (
            <div className="mb-6">
              {/* Disclaimer */}
              <div className="bg-gray-800/30 rounded-lg p-4 mb-4 text-sm text-gray-400">
                <p>
                  Please note: Imagery and information may not reflect exact specifications. 
                  Colors may vary and additional options or accessories may incur extra costs.
                </p>
              </div>
              
              {/* Product Description */}
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {selectedSkip === '4-yard' && '4 Yard Skip'}
                    {selectedSkip === '6-yard' && '6 Yard Skip'}
                    {selectedSkip === '8-yard' && '8 Yard Skip'}
                    {selectedSkip === '10-yard' && '10 Yard Skip'}
                    {selectedSkip === '12-yard' && '12 Yard Skip'}
                  </h4>
                  <div className="text-xl font-bold text-[#4C6EF5] mb-1">
                    {selectedSkip === '4-yard' && '£298'}
                    {selectedSkip === '6-yard' && '£282'}
                    {selectedSkip === '8-yard' && '£322'}
                    {selectedSkip === '10-yard' && '£330'}
                    {selectedSkip === '12-yard' && '£341'}
                  </div>
                  <p className="text-sm text-gray-300">
                    for a 14-day hire
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <p className="text-gray-300 mb-4 text-sm md:text-base">
            Complete all steps above to continue with your booking
          </p>

          {/* Selected Skip Information */}
          {isSkipSelected && <SelectedSkipInfo selectedSkip={selectedSkip} />}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 md:mt-8">
            <button className="w-full sm:w-auto bg-gray-600 hover:bg-gray-500 text-white px-6 md:px-8 py-3 rounded-lg font-medium transition-colors text-sm md:text-base">
              ← Back to Waste Type
            </button>
            <button
              className={`w-full sm:w-auto px-6 md:px-8 py-3 rounded-lg font-medium transition-colors text-sm md:text-base ${
                isPostcodeCompleted && isWasteTypeCompleted && isSkipSelected
                  ? "bg-[#4C6EF5] hover:bg-[#3B5BDB] text-white"
                  : "bg-gray-600 text-gray-400 cursor-not-allowed"
              }`}
              disabled={
                !isPostcodeCompleted || !isWasteTypeCompleted || !isSkipSelected
              }
            >
              Continue to Permit Check →
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
