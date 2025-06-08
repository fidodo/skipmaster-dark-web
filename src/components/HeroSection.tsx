
import React from 'react';
import PostcodeInput from './PostcodeInput';

interface HeroSectionProps {
  postcode: string;
  setPostcode: (postcode: string) => void;
  onCheckAvailability: () => void;
  isPostcodeCompleted: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  postcode, 
  setPostcode, 
  onCheckAvailability, 
  isPostcodeCompleted 
}) => {
  return (
    <div className="text-center mb-12">
      <h2 className="text-4xl md:text-5xl font-bold mb-4">
        Choose Your <span className="text-[#4C6EF5]">Perfect Skip</span>
      </h2>
      <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
        Select the right size for your waste disposal needs with our transparent pricing and reliable service
      </p>
      
      <PostcodeInput
        postcode={postcode}
        setPostcode={setPostcode}
        onCheckAvailability={onCheckAvailability}
        isCompleted={isPostcodeCompleted}
      />
    </div>
  );
};

export default HeroSection;
