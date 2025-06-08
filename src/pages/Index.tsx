import React, { useState } from "react";
import { Check, Clock, AlertCircle, Recycle } from "lucide-react";
import NavigationTabs from "../components/NavigationTabs";
import HeroSection from "../components/HeroSection";
import WasteTypeSelector from "../components/WasteTypeSelector";
import SkipSelection from "../components/SkipSelection";
import SelectedSkipInfo from "../components/SelectedSkipInfo";
import Footer from "../components/Footer";

const Index = () => {
  const [selectedSkip, setSelectedSkip] = useState<string | null>(null);
  const [postcode, setPostcode] = useState("");
  const [selectedWasteTypes, setSelectedWasteTypes] = useState<string[]>([]);
  const [isPostcodeCompleted, setIsPostcodeCompleted] = useState(false);

  const handleSkipSelect = (skipId: string) => {
    setSelectedSkip(skipId);
  };

  const handleCheckAvailability = () => {
    if (postcode.trim()) {
      console.log("Checking availability for postcode:", postcode);
      setIsPostcodeCompleted(true);
    }
  };

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
            postcode={postcode}
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
