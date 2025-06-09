
import React, { useState } from "react";
import NavigationTabs from "../components/NavigationTabs";
import HeroSection from "../components/HeroSection";
import WasteTypeSelector from "../components/WasteTypeSelector";
import SkipSelection from "../components/SkipSelection";
import ImportantInformation from "../components/ImportantInformation";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";
import { useSkipData } from "../hooks/useSkipData";

const Index = () => {
  const [selectedSkip, setSelectedSkip] = useState<string | null>(null);
  const [postcode, setPostcode] = useState("");
  const [selectedWasteTypes, setSelectedWasteTypes] = useState<string[]>([]);
  const [isPostcodeCompleted, setIsPostcodeCompleted] = useState(false);
  const [postcodeError, setPostcodeError] = useState("");

  const { skips, loading } = useSkipData(postcode);

  const handleSkipSelect = (skipId: string) => {
    setSelectedSkip(skipId);
  };

  const handleSkipDeselect = () => {
    setSelectedSkip(null);
  };

  const validatePostcode = (postcodeValue: string) => {
    // Check if postcode contains at least one number
    const hasNumber = /\d/.test(postcodeValue);
    if (!hasNumber && postcodeValue.trim()) {
      return "Incorrect address - postcode must contain numbers";
    }
    return "";
  };

  const handlePostcodeChange = (newPostcode: string) => {
    setPostcode(newPostcode);
    setIsPostcodeCompleted(false);
    setPostcodeError("");
    // Reset skip selection when postcode changes
    setSelectedSkip(null);
  };

  const handleCheckAvailability = () => {
    if (postcode.trim()) {
      const error = validatePostcode(postcode);
      if (error) {
        setPostcodeError(error);
        setIsPostcodeCompleted(false);
      } else {
        console.log("Checking availability for postcode:", postcode);
        setIsPostcodeCompleted(true);
        setPostcodeError("");
      }
    }
  };

  const handleBackToWasteType = () => {
    setSelectedSkip(null);
  };

  const isWasteTypeCompleted = selectedWasteTypes.length > 0;
  const isSkipSelected = selectedSkip !== null;
  console.log("indexi", skips);
  
  return (
    <div className="min-h-screen bg-[#1C2526] text-white">
      {/* Header */}
      <header className="bg-[#1C2526] border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {isPostcodeCompleted && !postcodeError && (
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
        isPostcodeCompleted={isPostcodeCompleted && !postcodeError}
        isWasteTypeCompleted={isWasteTypeCompleted}
        isSkipSelected={isSkipSelected}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-4 md:py-8">
        {/* Hero Section */}
        <HeroSection
          postcode={postcode}
          setPostcode={handlePostcodeChange}
          onCheckAvailability={handleCheckAvailability}
          isPostcodeCompleted={isPostcodeCompleted && !postcodeError}
          postcodeError={postcodeError}
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
            onSkipDeselect={handleSkipDeselect}
            isCompleted={isSkipSelected}
            skips={skips}
            loading={loading}
          />
        )}

        {/* Important Information */}
        <ImportantInformation />

        {/* Call to Action */}
        <CallToAction
          isPostcodeCompleted={isPostcodeCompleted && !postcodeError}
          isWasteTypeCompleted={isWasteTypeCompleted}
          isSkipSelected={isSkipSelected}
          selectedSkip={selectedSkip}
          skips={skips}
          onBackToWasteType={handleBackToWasteType}
        />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
