
import { useState, useEffect } from 'react';

export interface Skip {
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

export const useSkipData = (postcode: string) => {
  const [skips, setSkips] = useState<Skip[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSkips = async () => {
      if (!postcode) return;
      console.log("Fetching skips for postcode:", postcode);
      setLoading(true);
      try {
        const postcodeArea = postcode.split(" ")[0] || postcode.substring(0, 4);
        const response = await fetch(
          `https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft`
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Fetched skips:", data);
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
        setSkips(getDefaultSkips());
      } finally {
        setLoading(false);
      }
    };

    fetchSkips();
  }, [postcode]);

  return { skips, loading };
};
