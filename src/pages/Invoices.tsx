
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
  Package,
  AlertCircle
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
import { useToast } from "@/hooks/use-toast";

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

const sampleInvoices: Invoice[] = [
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

const formatIndianRupees = (amount: number): string => {
  // Format with commas for Indian numbering system (lakhs, crores)
  const formattedAmount = amount.toLocaleString('en-IN');
  return `₹${formattedAmount}`;
};

const InvoiceForm = ({ onClose }: { onClose: () => void }) => {
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [open, setOpen] = useState(false);
  const [productSearch, setProductSearch] = useState("");
  const { toast } = useToast();

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
    
    // Show notification when item is added
    toast({
      title: "Item Added",
      description: `${product.name} has been added to the invoice`,
    });
  };

  const removeItem = (index: number) => {
    const newItems = [...items];
    const removedItem = newItems[index];
    newItems.splice(index, 1);
    setItems(newItems);
    
    toast({
      title: "Item Removed",
      description: `${removedItem.name} has been removed from the invoice`,
      variant: "destructive"
    });
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

  const handleCreateInvoice = () => {
    if (items.length === 0) {
      toast({
        title: "No Items Added",
        description: "Please add at least one item to create an invoice",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Invoice Created",
      description: `New invoice with ${items.length} items totaling ${formatIndianRupees(total)} has been created`,
    });
    
    onClose();
  };

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
              <SelectItem value="reliance">Reliance Industries</SelectItem>
              <SelectItem value="tata">Tata Steel</SelectItem>
              <SelectItem value="hul">Hindustan Unilever</SelectItem>
              <SelectItem value="bhel">BHEL</SelectItem>
              <SelectItem value="ongc">ONGC</SelectItem>
              <SelectItem value="ioc">Indian Oil</SelectItem>
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
          {items.length === 0 ? (
            <div className="text-center py-6 text-gray-500">
              <Package className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2">No items added to invoice yet</p>
              <p className="text-sm">Click 'Add Item' to add products</p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="grid grid-cols-12 gap-2 text-sm font-medium text-gray-700 mb-2">
                <div className="col-span-5">Product</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-center">Price (₹)</div>
                <div className="col-span-2 text-center">GST (%)</div>
                <div className="col-span-1"></div>
              </div>
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
          )}
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
                        <span className="text-sm text-muted-foreground">₹{product.price.toLocaleString('en-IN')}</span>
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
                <span className="font-medium">{formatIndianRupees(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span className="font-medium">{formatIndianRupees(taxAmount)}</span>
              </div>
              <div className="flex justify-between text-base font-bold">
                <span>Total:</span>
                <span>{formatIndianRupees(total)}</span>
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
          <Button onClick={handleCreateInvoice}>Create Invoice</Button>
        </div>
      </DialogFooter>
    </div>
  );
};

const Invoices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const { toast } = useToast();

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

  const handleSearch = () => {
    toast({
      title: "Search Results",
      description: `Found ${filteredInvoices.length} invoice(s) matching your search`,
    });
  };

  const handleDownloadInvoice = (id: string) => {
    toast({
      title: "Invoice Downloaded",
      description: `Invoice ${id} has been downloaded as PDF`,
    });
  };

  const handleSendInvoice = (id: string) => {
    toast({
      title: "Invoice Sent",
      description: `Invoice ${id} has been sent to the customer`,
    });
  };

  const handleViewInvoice = (id: string) => {
    toast({
      title: "Invoice Details",
      description: `Viewing details for invoice ${id}`,
    });
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

      {/* Alert for overdue invoices */}
      {sampleInvoices.some(invoice => invoice.status === "Overdue") && (
        <div className="mb-6 p-3 bg-amber-50 border border-amber-200 rounded-md flex items-center">
          <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
          <span className="text-amber-800">
            There are {sampleInvoices.filter(inv => inv.status === "Overdue").length} overdue invoices that require your attention.
          </span>
        </div>
      )}

      <Card>
        <div className="p-4 border-b">
          <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
            <div className="relative w-full md:max-w-sm flex">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search invoices..."
                className="pl-8 bg-white"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <Button className="ml-2" onClick={handleSearch}>Search</Button>
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
              <Button variant="outline" size="icon" onClick={() => toast({ title: "Printing Invoices", description: "Preparing invoices for printing..." })}>
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
                    <TableCell className="text-right">{formatIndianRupees(invoice.amount)}</TableCell>
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
                          <DropdownMenuItem className="flex items-center" onClick={() => handleViewInvoice(invoice.id)}>
                            <Eye className="mr-2 h-4 w-4" /> View
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center" onClick={() => handleDownloadInvoice(invoice.id)}>
                            <Download className="mr-2 h-4 w-4" /> Download
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center" onClick={() => handleSendInvoice(invoice.id)}>
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
