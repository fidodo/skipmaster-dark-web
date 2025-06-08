import React, { useState } from "react";

interface NavigationTabsProps {
  isPostcodeCompleted: boolean;
  isWasteTypeCompleted: boolean;
  isSkipSelected: boolean;
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({
  isPostcodeCompleted,
  isWasteTypeCompleted,
  isSkipSelected,
}) => {
  const [activeTab, setActiveTab] = useState("Select Skip");

  const tabs = [
    { name: "Postcode", completed: isPostcodeCompleted },
    { name: "Waste Type", completed: isWasteTypeCompleted },
    { name: "Select Skip", completed: isSkipSelected },
    { name: "Permit Check", completed: false },
    { name: "Choose Date", completed: false },
    { name: "Payment", completed: false },
  ];

  const getTabStyle = (tab: { name: string; completed: boolean }) => {
    console.log(
      `Tab: ${tab.name}, Completed: ${tab.completed}, Active: ${activeTab}`,
      tab
    );
    if (tab.completed) {
      return "text-green-400 border-green-400";
    }
    if (activeTab === tab.name) {
      return "text-[#4C6EF5] border-[#4C6EF5]";
    }
    return "text-gray-300 border-transparent hover:text-white hover:border-gray-500";
  };

  return (
    <nav className="bg-gray-800/50 border-b border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex overflow-x-auto">
          {tabs.map((tab, index) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors border-b-2 flex items-center space-x-2 ${getTabStyle(
                tab
              )}`}
            >
              <span>{tab.name}</span>
              {tab.completed && <span>✓</span>}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavigationTabs;
