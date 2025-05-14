
export interface Invoice {
  id: string;
  customer: string;
  date: string;
  dueDate: string;
  amount: number;
  status: "Paid" | "Pending" | "Overdue" | "Draft";
}

export interface InvoiceItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  tax: number;
}
