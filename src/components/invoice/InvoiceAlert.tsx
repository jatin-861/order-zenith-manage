
import React from "react";
import { AlertCircle } from "lucide-react";
import { Invoice } from "@/types/invoice";

interface InvoiceAlertProps {
  invoices: Invoice[];
}

const InvoiceAlert = ({ invoices }: InvoiceAlertProps) => {
  const overdueInvoices = invoices.filter(inv => inv.status === "Overdue");
  
  if (overdueInvoices.length === 0) {
    return null;
  }
  
  return (
    <div className="mb-6 p-3 bg-amber-50 border border-amber-200 rounded-md flex items-center">
      <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
      <span className="text-amber-800">
        There are {overdueInvoices.length} overdue invoices that require your attention.
      </span>
    </div>
  );
};

export default InvoiceAlert;
