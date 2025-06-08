import React from "react";
import SelectedSkipInfo from "./SelectedSkipInfo";
import { Skip } from "@/hooks/useSkipData";

interface CallToActionProps {
  isPostcodeCompleted: boolean;
  isWasteTypeCompleted: boolean;
  isSkipSelected: boolean;
  selectedSkip: string | null;
  skips: Skip[];
}

const CallToAction: React.FC<CallToActionProps> = ({
  isPostcodeCompleted,
  isWasteTypeCompleted,
  isSkipSelected,
  selectedSkip,
  skips,
}) => {
  console.log("gfr", skips);
  return (
    <div className="text-center">
      <h3 className="text-xl md:text-2xl font-bold mb-4">Ready to Proceed?</h3>

      {/* Disclaimer and Product Description */}
      {isSkipSelected && (
        <div className="mb-6">
          {/* Product Description */}
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
            {/* Disclaimer */}
            <div className="bg-gray-800/30 rounded-lg p-4 mb-4 text-sm text-gray-400">
              <p>
                Please note: Imagery and information may not reflect exact
                specifications. Colors may vary and additional options or
                accessories may incur extra costs.
              </p>
            </div>
            <div className="text-center">
              <h4 className="text-lg font-semibold text-white mb-2">
                {selectedSkip === "4-yard" && "4 Yard Skip"}
                {selectedSkip === "6-yard" && "6 Yard Skip"}
                {selectedSkip === "8-yard" && "8 Yard Skip"}
                {selectedSkip === "10-yard" && "10 Yard Skip"}
                {selectedSkip === "12-yard" && "12 Yard Skip"}
              </h4>
              <div className="text-xl font-bold text-[#4C6EF5] mb-1">
                {selectedSkip === "4-yard" && "£298"}
                {selectedSkip === "6-yard" && "£282"}
                {selectedSkip === "8-yard" && "£322"}
                {selectedSkip === "10-yard" && "£330"}
                {selectedSkip === "12-yard" && "£341"}
              </div>
              <p className="text-sm text-gray-300">for a 14-day hire</p>
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
  );
};

export default CallToAction;
