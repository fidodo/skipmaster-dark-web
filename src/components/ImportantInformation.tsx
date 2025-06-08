
import React from "react";
import { Check, Clock, AlertCircle, Recycle } from "lucide-react";

const ImportantInformation: React.FC = () => {
  return (
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
  );
};

export default ImportantInformation;
