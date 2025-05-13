
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  FileText, 
  Search, 
  MoreVertical, 
  FilePlus, 
  Eye, 
  Download, 
  Send,
  Calendar,
  Printer,
  Trash,
  Plus,
  Package
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface Invoice {
  id: string;
  customer: string;
  date: string;
  dueDate: string;
  amount: number;
  status: "Paid" | "Pending" | "Overdue" | "Draft";
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
}

interface InvoiceItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  tax: number;
}

// Sample products from inventory (same as in Products.tsx)
const sampleProducts: Product[] = [
  {
    id: "PRD-001",
    name: "iPhone 16 Pro",
    category: "Electronics",
    price: 999,
    stock: 12,
    status: "In Stock",
  },
  {
    id: "PRD-002",
    name: "MacBook Air M3",
    category: "Electronics",
    price: 1299,
    stock: 8,
    status: "In Stock",
  },
  {
    id: "PRD-003",
    name: "AirPods Pro",
    category: "Electronics",
    price: 249,
    stock: 3,
    status: "Low Stock",
  },
  {
    id: "PRD-004",
    name: "iPad Pro",
    category: "Electronics",
    price: 799,
    stock: 0,
    status: "Out of Stock",
  },
  {
    id: "PRD-005",
    name: "Magic Mouse",
    category: "Accessories",
    price: 99,
    stock: 15,
    status: "In Stock",
  },
  {
    id: "PRD-006",
    name: "Magic Keyboard",
    category: "Accessories",
    price: 149,
    stock: 2,
    status: "Low Stock",
  },
  {
    id: "PRD-007",
    name: "Apple Watch Series 9",
    category: "Wearables",
    price: 399,
    stock: 7,
    status: "In Stock",
  },
  {
    id: "PRD-008",
    name: "HomePod Mini",
    category: "Smart Home",
    price: 99,
    stock: 0,
    status: "Out of Stock",
  },
];

const sampleInvoices: Invoice[] = [
  {
    id: "INV-001",
    customer: "Acme Inc.",
    date: "May 10, 2025",
    dueDate: "May 24, 2025",
    amount: 1540,
    status: "Paid",
  },
  {
    id: "INV-002",
    customer: "Globex Corp",
    date: "May 08, 2025",
    dueDate: "May 22, 2025",
    amount: 2300,
    status: "Pending",
  },
  {
    id: "INV-003",
    customer: "Wayne Enterprises",
    date: "May 05, 2025",
    dueDate: "May 19, 2025",
    amount: 4100,
    status: "Overdue",
  },
  {
    id: "INV-004",
    customer: "Stark Industries",
    date: "May 03, 2025",
    dueDate: "May 17, 2025",
    amount: 780,
    status: "Paid",
  },
  {
    id: "INV-005",
    customer: "LexCorp",
    date: "Apr 29, 2025",
    dueDate: "May 13, 2025",
    amount: 1200,
    status: "Overdue",
  },
  {
    id: "INV-006",
    customer: "Umbrella Corporation",
    date: "May 12, 2025",
    dueDate: "May 26, 2025",
    amount: 3500,
    status: "Draft",
  },
];

const InvoiceForm = ({ onClose }: { onClose: () => void }) => {
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [open, setOpen] = useState(false);
  const [productSearch, setProductSearch] = useState("");

  const availableProducts = sampleProducts.filter(
    product => product.status !== "Out of Stock"
  );

  const filteredProducts = availableProducts.filter(product =>
    product.name.toLowerCase().includes(productSearch.toLowerCase())
  );

  const addItem = (product: Product) => {
    setItems([
      ...items,
      {
        productId: product.id,
        name: product.name,
        quantity: 1,
        price: product.price,
        tax: 0,
      },
    ]);
    setOpen(false);
  };

  const removeItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const updateItemQuantity = (index: number, quantity: number) => {
    const newItems = [...items];
    newItems[index].quantity = quantity;
    setItems(newItems);
  };

  const updateItemPrice = (index: number, price: number) => {
    const newItems = [...items];
    newItems[index].price = price;
    setItems(newItems);
  };

  const updateItemTax = (index: number, tax: number) => {
    const newItems = [...items];
    newItems[index].tax = tax;
    setItems(newItems);
  };

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const taxAmount = items.reduce((sum, item) => sum + (item.price * item.quantity * item.tax / 100), 0);
  const total = subtotal + taxAmount;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group">
          <label htmlFor="invoice-customer" className="text-sm font-medium text-gray-700">
            Customer
          </label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select customer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="acme">Acme Inc.</SelectItem>
              <SelectItem value="globex">Globex Corp</SelectItem>
              <SelectItem value="wayne">Wayne Enterprises</SelectItem>
              <SelectItem value="stark">Stark Industries</SelectItem>
              <SelectItem value="lexcorp">LexCorp</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="form-group">
          <label htmlFor="invoice-number" className="text-sm font-medium text-gray-700">
            Invoice Number
          </label>
          <Input id="invoice-number" defaultValue="INV-007" readOnly className="bg-gray-50" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group">
          <label htmlFor="invoice-date" className="text-sm font-medium text-gray-700">
            Invoice Date
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-gray-500">
              <Calendar className="h-4 w-4" />
            </span>
            <Input id="invoice-date" type="date" className="rounded-l-none" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="invoice-due" className="text-sm font-medium text-gray-700">
            Due Date
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-gray-500">
              <Calendar className="h-4 w-4" />
            </span>
            <Input id="invoice-due" type="date" className="rounded-l-none" />
          </div>
        </div>
      </div>
      <div className="border rounded-md">
        <div className="bg-gray-50 p-3 border-b">
          <h4 className="text-sm font-medium text-gray-700">Items</h4>
        </div>
        <div className="p-3">
          <div className="space-y-3">
            {items.map((item, index) => (
              <div key={index} className="grid grid-cols-12 gap-2">
                <div className="col-span-5">
                  <Input value={item.name} readOnly />
                </div>
                <div className="col-span-2">
                  <Input 
                    type="number" 
                    value={item.quantity} 
                    onChange={(e) => updateItemQuantity(index, parseInt(e.target.value) || 0)}
                    min="1"
                  />
                </div>
                <div className="col-span-2">
                  <Input 
                    type="number" 
                    value={item.price} 
                    onChange={(e) => updateItemPrice(index, parseFloat(e.target.value) || 0)}
                    min="0"
                  />
                </div>
                <div className="col-span-2">
                  <Input 
                    type="number" 
                    value={item.tax} 
                    onChange={(e) => updateItemTax(index, parseFloat(e.target.value) || 0)}
                    min="0"
                  />
                </div>
                <div className="col-span-1 flex items-center justify-center">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => removeItem(index)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="mt-3">
                <Plus className="mr-1 h-4 w-4" /> Add Item
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="start">
              <Command>
                <CommandInput 
                  placeholder="Search products..." 
                  value={productSearch}
                  onValueChange={setProductSearch}
                />
                <CommandEmpty>No products found.</CommandEmpty>
                <CommandGroup>
                  {filteredProducts.map((product) => (
                    <CommandItem
                      key={product.id}
                      onSelect={() => addItem(product)}
                      className="flex justify-between"
                    >
                      <div>{product.name}</div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">${product.price}</span>
                        <Badge variant="outline" className={cn(
                          "text-xs",
                          product.status === "In Stock" ? "bg-green-100 text-green-800" :
                          "bg-yellow-100 text-yellow-800"
                        )}>
                          {product.stock} in stock
                        </Badge>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className="p-3 border-t bg-gray-50">
          <div className="flex justify-end space-y-1 text-sm">
            <div className="w-48 space-y-1">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span className="font-medium">${taxAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-bold">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="invoice-notes" className="text-sm font-medium text-gray-700">
          Notes
        </label>
        <textarea 
          id="invoice-notes" 
          className="flex h-20 w-full resize-y rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          placeholder="Additional notes for the customer"
        ></textarea>
      </div>
      <DialogFooter>
        <div className="flex flex-wrap gap-2 justify-end">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="outline">Save as Draft</Button>
          <Button>Create Invoice</Button>
        </div>
      </DialogFooter>
    </div>
  );
};

const Invoices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const filteredInvoices = sampleInvoices.filter(invoice => 
    invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: Invoice["status"]) => {
    switch (status) {
      case "Paid":
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Paid</Badge>;
      case "Pending":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Pending</Badge>;
      case "Overdue":
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Overdue</Badge>;
      case "Draft":
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">Draft</Badge>;
    }
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
          <p className="text-gray-500">Create and manage customer invoices</p>
        </div>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button className="flex items-center">
              <FilePlus className="mr-2 h-4 w-4" /> Create Invoice
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Create New Invoice
              </DialogTitle>
            </DialogHeader>
            <InvoiceForm onClose={() => setOpenDialog(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <div className="p-4 border-b">
          <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
            <div className="relative w-full md:max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search invoices..."
                className="pl-8 bg-white"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex space-x-2">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Invoices" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Invoices</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Printer className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="table-container">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.length > 0 ? (
                filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>{invoice.customer}</TableCell>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell>{invoice.dueDate}</TableCell>
                    <TableCell className="text-right">${invoice.amount.toLocaleString()}</TableCell>
                    <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem className="flex items-center">
                            <Eye className="mr-2 h-4 w-4" /> View
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center">
                            <Download className="mr-2 h-4 w-4" /> Download
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center">
                            <Send className="mr-2 h-4 w-4" /> Send Email
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No invoices found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </Layout>
  );
};

export default Invoices;
