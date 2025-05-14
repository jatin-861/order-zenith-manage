
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Calendar, Package, Plus, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { formatIndianRupees } from "@/utils/invoiceUtils";
import { sampleProducts } from "@/utils/productUtils";
import { InvoiceItem } from "@/types/invoice";
import { Product } from "@/types/product";

interface InvoiceFormProps {
  onClose: () => void;
}

const InvoiceForm = ({ onClose }: InvoiceFormProps) => {
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

export default InvoiceForm;
