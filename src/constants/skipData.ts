
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

export const getDefaultSkips = (): Skip[] => [
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
