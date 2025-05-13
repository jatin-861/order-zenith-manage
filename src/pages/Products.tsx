
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
  Package, 
  Search, 
  MoreVertical, 
  Edit, 
  Trash, 
  Plus,
  ArrowUpDown,
  X,
  Check
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
}

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

const ProductForm = ({ onClose }: { onClose: () => void }) => (
  <div className="space-y-4">
    <div className="form-group">
      <label htmlFor="product-name" className="text-sm font-medium text-gray-700">
        Product Name
      </label>
      <Input id="product-name" placeholder="Enter product name" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="form-group">
        <label htmlFor="product-category" className="text-sm font-medium text-gray-700">
          Category
        </label>
        <Input id="product-category" placeholder="Category" />
      </div>
      <div className="form-group">
        <label htmlFor="product-price" className="text-sm font-medium text-gray-700">
          Price
        </label>
        <Input id="product-price" type="number" placeholder="0.00" />
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="form-group">
        <label htmlFor="product-stock" className="text-sm font-medium text-gray-700">
          Stock Quantity
        </label>
        <Input id="product-stock" type="number" placeholder="0" />
      </div>
      <div className="form-group">
        <label htmlFor="product-sku" className="text-sm font-medium text-gray-700">
          SKU
        </label>
        <Input id="product-sku" placeholder="PRD-001" />
      </div>
    </div>
    <div className="form-group">
      <label htmlFor="product-description" className="text-sm font-medium text-gray-700">
        Description
      </label>
      <textarea 
        id="product-description" 
        className="flex h-32 w-full resize-y rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        placeholder="Product description"
      ></textarea>
    </div>
    <DialogFooter>
      <Button variant="outline" onClick={onClose}>
        Cancel
      </Button>
      <Button>Save Product</Button>
    </DialogFooter>
  </div>
);

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const filteredProducts = sampleProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: Product["status"]) => {
    switch (status) {
      case "In Stock":
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">In Stock</Badge>;
      case "Low Stock":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Low Stock</Badge>;
      case "Out of Stock":
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Out of Stock</Badge>;
    }
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-500">Manage your product inventory</p>
        </div>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button className="flex items-center">
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Package className="mr-2 h-5 w-5" />
                Add New Product
              </DialogTitle>
            </DialogHeader>
            <ProductForm onClose={() => setOpenDialog(false)} />
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
                placeholder="Search products..."
                className="pl-8 bg-white"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                Export
              </Button>
              <Button variant="outline" size="sm">
                Print
              </Button>
            </div>
          </div>
        </div>

        <div className="table-container">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">SKU</TableHead>
                <TableHead>
                  <div className="flex items-center">
                    Product Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell className="text-right">${product.price}</TableCell>
                    <TableCell className="text-right">{product.stock}</TableCell>
                    <TableCell>{getStatusBadge(product.status)}</TableCell>
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
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center text-red-600">
                            <Trash className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No products found.
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

export default Products;
