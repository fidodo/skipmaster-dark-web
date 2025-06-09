
import React from "react";
import PostcodeInput from "./PostcodeInput";

interface HeroSectionProps {
  postcode: string;
  setPostcode: (postcode: string) => void;
  onCheckAvailability: () => void;
  isPostcodeCompleted: boolean;
  postcodeError?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  postcode,
  setPostcode,
  onCheckAvailability,
  isPostcodeCompleted,
  postcodeError,
}) => {
  return (
    <div className="text-center mb-8 md:mb-16">
      <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
        Skip Hire Made Simple
      </h1>
      <p className="text-gray-300 mb-6 md:mb-8 text-base md:text-lg max-w-2xl mx-auto">
        Fast, reliable skip hire service. Check availability in your area and
        book online in minutes.
      </p>

      <PostcodeInput
        postcode={postcode}
        setPostcode={setPostcode}
        onCheckAvailability={onCheckAvailability}
        isCompleted={isPostcodeCompleted}
        postcodeError={postcodeError}
      />
    </div>
  );
};

export default HeroSection;
