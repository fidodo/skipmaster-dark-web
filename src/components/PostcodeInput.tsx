
import React from 'react';
import { MapPin } from 'lucide-react';

interface PostcodeInputProps {
  postcode: string;
  setPostcode: (postcode: string) => void;
  onCheckAvailability: () => void;
  isCompleted: boolean;
}

const PostcodeInput: React.FC<PostcodeInputProps> = ({ 
  postcode, 
  setPostcode, 
  onCheckAvailability, 
  isCompleted 
}) => {
  const isValidPostcode = postcode.trim().length > 0;

  return (
    <div className="flex items-center justify-center gap-4 max-w-md mx-auto">
      <div className={`flex items-center bg-gray-800 rounded-lg px-4 py-3 flex-1 border-2 transition-colors ${
        isCompleted ? 'border-green-500' : 'border-gray-700'
      }`}>
        <MapPin className="w-5 h-5 text-gray-400 mr-2" />
        <input
          type="text"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          placeholder="Enter postcode (required)"
          className="bg-transparent text-white outline-none flex-1"
          required
        />
        {isCompleted && (
          <span className="text-green-500 ml-2">✓</span>
        )}
      </div>
      <button
        onClick={onCheckAvailability}
        disabled={!isValidPostcode}
        className={`px-6 py-3 rounded-lg font-medium transition-colors ${
          isValidPostcode
            ? 'bg-[#4C6EF5] hover:bg-[#3B5BDB] text-white'
            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
        }`}
      >
        Check Availability
      </button>
    </div>
  );
};

export default PostcodeInput;
