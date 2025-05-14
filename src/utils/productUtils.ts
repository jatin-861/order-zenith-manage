
import { Product } from "@/types/product";

// Sample products from inventory
export const sampleProducts: Product[] = [
  {
    id: "PRD-001",
    name: "Boiler System - 500kg/hr",
    category: "Boilers",
    price: 75000,
    stock: 12,
    status: "In Stock",
  },
  {
    id: "PRD-002",
    name: "Heat Exchanger - HX2000",
    category: "Heat Exchangers",
    price: 89000,
    stock: 8,
    status: "In Stock",
  },
  {
    id: "PRD-003",
    name: "Thermic Fluid Heater",
    category: "Heaters",
    price: 18500,
    stock: 3,
    status: "Low Stock",
  },
  {
    id: "PRD-004",
    name: "Industrial Hot Water Generator",
    category: "Water Heaters",
    price: 58000,
    stock: 0,
    status: "Out of Stock",
  },
  {
    id: "PRD-005",
    name: "Stainless Steel Screws M10",
    category: "Fasteners",
    price: 35,
    stock: 150,
    status: "In Stock",
  },
  {
    id: "PRD-006",
    name: "Copper Tubing 15mm",
    category: "Piping",
    price: 850,
    stock: 45,
    status: "In Stock",
  },
  {
    id: "PRD-007",
    name: "Control Valve 2\"",
    category: "Controls",
    price: 6500,
    stock: 7,
    status: "Low Stock",
  },
  {
    id: "PRD-008",
    name: "Pressure Gauge 0-10 Bar",
    category: "Instrumentation",
    price: 2500,
    stock: 3,
    status: "Low Stock",
  },
];
