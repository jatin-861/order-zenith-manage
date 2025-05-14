
import { Invoice } from "@/types/invoice";

// Format currency in Indian Rupees
export const formatIndianRupees = (amount: number): string => {
  // Format with commas for Indian numbering system (lakhs, crores)
  const formattedAmount = amount.toLocaleString('en-IN');
  return `₹${formattedAmount}`;
};

// Sample invoices data
export const sampleInvoices: Invoice[] = [
  {
    id: "INV-001",
    customer: "Reliance Industries",
    date: "May 10, 2025",
    dueDate: "May 24, 2025",
    amount: 154000,
    status: "Paid",
  },
  {
    id: "INV-002",
    customer: "Tata Steel",
    date: "May 08, 2025",
    dueDate: "May 22, 2025",
    amount: 230000,
    status: "Pending",
  },
  {
    id: "INV-003",
    customer: "Hindustan Unilever",
    date: "May 05, 2025",
    dueDate: "May 19, 2025",
    amount: 410000,
    status: "Overdue",
  },
  {
    id: "INV-004",
    customer: "BHEL",
    date: "May 03, 2025",
    dueDate: "May 17, 2025",
    amount: 78000,
    status: "Paid",
  },
  {
    id: "INV-005",
    customer: "ONGC",
    date: "Apr 29, 2025",
    dueDate: "May 13, 2025",
    amount: 120000,
    status: "Overdue",
  },
  {
    id: "INV-006",
    customer: "Indian Oil",
    date: "May 12, 2025",
    dueDate: "May 26, 2025",
    amount: 350000,
    status: "Draft",
  },
];

// Get badge for invoice status
export const getStatusBadge = (status: Invoice["status"]) => {
  switch (status) {
    case "Paid":
      return "bg-green-100 text-green-800 border-green-200";
    case "Pending":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "Overdue":
      return "bg-red-100 text-red-800 border-red-200";
    case "Draft":
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};
