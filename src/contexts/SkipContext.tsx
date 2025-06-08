
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Skip, getDefaultSkips } from '../constants/skipData';

interface SkipContextType {
  skips: Skip[];
  loading: boolean;
  error: string | null;
  fetchSkips: (postcode: string) => Promise<void>;
  selectedSkip: string | null;
  setSelectedSkip: (skipId: string | null) => void;
}

const SkipContext = createContext<SkipContextType | undefined>(undefined);

export const useSkipContext = () => {
  const context = useContext(SkipContext);
  if (context === undefined) {
    throw new Error('useSkipContext must be used within a SkipProvider');
  }
  return context;
};

interface SkipProviderProps {
  children: ReactNode;
}

export const SkipProvider: React.FC<SkipProviderProps> = ({ children }) => {
  const [skips, setSkips] = useState<Skip[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSkip, setSelectedSkip] = useState<string | null>(null);

  const fetchSkips = async (postcode: string) => {
    if (!postcode) {
      setSkips(getDefaultSkips());
      return;
    }
    
    console.log("Fetching skips for postcode:", postcode);
    setLoading(true);
    setError(null);
    
    try {
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
        setSkips(getDefaultSkips());
      }
    } catch (error) {
      console.error("Error fetching skips:", error);
      setError("Failed to fetch skip data");
      setSkips(getDefaultSkips());
    } finally {
      setLoading(false);
    }
  };

  const value = {
    skips,
    loading,
    error,
    fetchSkips,
    selectedSkip,
    setSelectedSkip,
  };

  return (
    <SkipContext.Provider value={value}>
      {children}
    </SkipContext.Provider>
  );
};
