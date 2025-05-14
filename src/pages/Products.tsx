
import React, { useState, useEffect } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Package, 
  Search, 
  MoreVertical, 
  Edit, 
  Trash, 
  Plus,
  ArrowUpDown,
  X,
  Check,
  AlertCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  type: "Product" | "Raw Material";
  image?: string;
  description?: string;
  minStockLevel?: number;
  supplierInfo?: string;
}

// Sample products imported from heatmax.in (simulated)
const sampleProducts: Product[] = [
  {
    id: "PRD-001",
    name: "Boiler System - 500kg/hr",
    category: "Boilers",
    price: 75000,
    stock: 12,
    status: "In Stock",
    type: "Product",
    image: "https://www.heatmax.in/wp-content/uploads/2018/05/Boiler-Room-Coalescer-1-New-742x1024.jpg",
    description: "Industrial boiler system with capacity of 500kg/hr steam generation, with automatic temperature control."
  },
  {
    id: "PRD-002",
    name: "Heat Exchanger - HX2000",
    category: "Heat Exchangers",
    price: 89000,
    stock: 8,
    status: "In Stock",
    type: "Product",
    image: "https://www.heatmax.in/wp-content/uploads/2018/05/Heat-Exchanger-P3-386x309.jpg",
    description: "High efficiency plate heat exchanger suitable for HVAC and industrial applications."
  },
  {
    id: "PRD-003",
    name: "Thermic Fluid Heater",
    category: "Heaters",
    price: 18500,
    stock: 3,
    status: "Low Stock",
    type: "Product",
    image: "https://www.heatmax.in/wp-content/uploads/2018/05/thermic.jpg",
    description: "Thermic fluid heater for industrial applications requiring precise temperature control."
  },
  {
    id: "PRD-004",
    name: "Industrial Hot Water Generator",
    category: "Water Heaters",
    price: 58000,
    stock: 0,
    status: "Out of Stock",
    type: "Product",
    image: "https://www.heatmax.in/wp-content/uploads/2018/05/hwg-300x150.jpg",
    description: "Hot water generator for commercial and industrial applications."
  },
  // Raw Materials
  {
    id: "RAW-001",
    name: "Stainless Steel Screws M10",
    category: "Fasteners",
    price: 35,
    stock: 150,
    status: "In Stock",
    type: "Raw Material",
    minStockLevel: 100,
    supplierInfo: "Metal Supplies Inc."
  },
  {
    id: "RAW-002",
    name: "Copper Tubing 15mm",
    category: "Piping",
    price: 850,
    stock: 45,
    status: "In Stock",
    type: "Raw Material",
    minStockLevel: 40,
    supplierInfo: "Copper Solutions Ltd."
  },
  {
    id: "RAW-003",
    name: "Control Valve 2\"",
    category: "Controls",
    price: 6500,
    stock: 7,
    status: "Low Stock",
    type: "Raw Material",
    minStockLevel: 10,
    supplierInfo: "Valve Technologies"
  },
  {
    id: "RAW-004",
    name: "Pressure Gauge 0-10 Bar",
    category: "Instrumentation",
    price: 2500,
    stock: 3,
    status: "Low Stock",
    type: "Raw Material",
    minStockLevel: 15,
    supplierInfo: "Instrument Supplies Co."
  },
  {
    id: "RAW-005",
    name: "Temperature Sensor PT100",
    category: "Instrumentation",
    price: 2900,
    stock: 2,
    status: "Low Stock",
    type: "Raw Material",
    minStockLevel: 10,
    supplierInfo: "Sensor Tech Ltd."
  },
];

const ProductForm = ({ onClose, editProduct = null }: { onClose: () => void, editProduct?: Product | null }) => {
  const [product, setProduct] = useState<Partial<Product>>(editProduct || {
    type: "Product",
    status: "In Stock"
  });
  
  const handleChange = (key: keyof Product, value: any) => {
    setProduct(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    onClose();
    // In a real app, this would save to the database
  };

  return (
    <div className="space-y-4">
      <div className="form-group">
        <label htmlFor="product-name" className="text-sm font-medium text-gray-700">
          Product Name
        </label>
        <Input 
          id="product-name" 
          placeholder="Enter product name" 
          value={product.name || ''}
          onChange={(e) => handleChange('name', e.target.value)}
        />
      </div>
      
      <div className="form-group">
        <label className="text-sm font-medium text-gray-700">Type</label>
        <div className="flex items-center space-x-4 mt-1">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input 
              type="radio" 
              checked={product.type === "Product"} 
              onChange={() => handleChange('type', 'Product')}
              className="form-radio h-4 w-4 text-blue-600"
            />
            <span>Product</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input 
              type="radio" 
              checked={product.type === "Raw Material"} 
              onChange={() => handleChange('type', 'Raw Material')}
              className="form-radio h-4 w-4 text-blue-600"
            />
            <span>Raw Material</span>
          </label>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group">
          <label htmlFor="product-category" className="text-sm font-medium text-gray-700">
            Category
          </label>
          <Input 
            id="product-category" 
            placeholder="Category" 
            value={product.category || ''}
            onChange={(e) => handleChange('category', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="product-price" className="text-sm font-medium text-gray-700">
            Price (₹)
          </label>
          <Input 
            id="product-price" 
            type="number" 
            placeholder="0.00" 
            value={product.price || ''}
            onChange={(e) => handleChange('price', parseFloat(e.target.value))}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group">
          <label htmlFor="product-stock" className="text-sm font-medium text-gray-700">
            Stock Quantity
          </label>
          <Input 
            id="product-stock" 
            type="number" 
            placeholder="0" 
            value={product.stock || ''}
            onChange={(e) => handleChange('stock', parseInt(e.target.value))}
          />
        </div>
        <div className="form-group">
          <label htmlFor="product-sku" className="text-sm font-medium text-gray-700">
            SKU
          </label>
          <Input 
            id="product-sku" 
            placeholder="PRD-001" 
            value={product.id || ''}
            onChange={(e) => handleChange('id', e.target.value)}
          />
        </div>
      </div>
      
      {product.type === "Raw Material" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label htmlFor="min-stock-level" className="text-sm font-medium text-gray-700">
              Minimum Stock Level
            </label>
            <Input 
              id="min-stock-level" 
              type="number" 
              placeholder="0" 
              value={product.minStockLevel || ''}
              onChange={(e) => handleChange('minStockLevel', parseInt(e.target.value))}
            />
          </div>
          <div className="form-group">
            <label htmlFor="supplier-info" className="text-sm font-medium text-gray-700">
              Supplier Information
            </label>
            <Input 
              id="supplier-info" 
              placeholder="Supplier name" 
              value={product.supplierInfo || ''}
              onChange={(e) => handleChange('supplierInfo', e.target.value)}
            />
          </div>
        </div>
      )}
      
      <div className="form-group">
        <label htmlFor="product-image" className="text-sm font-medium text-gray-700">
          Image URL
        </label>
        <Input 
          id="product-image" 
          placeholder="https://example.com/image.jpg" 
          value={product.image || ''}
          onChange={(e) => handleChange('image', e.target.value)}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="product-description" className="text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea 
          id="product-description" 
          className="flex h-32 w-full resize-y rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          placeholder="Product description"
          value={product.description || ''}
          onChange={(e) => handleChange('description', e.target.value)}
        ></textarea>
      </div>
      
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Save Product</Button>
      </DialogFooter>
    </div>
  );
};

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "products" | "materials" | "low-stock">("all");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { toast } = useToast();

  // Filter products based on search term and active tab
  const filteredProducts = sampleProducts.filter(product => {
    // Text search
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Tab filter
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "products") return matchesSearch && product.type === "Product";
    if (activeTab === "materials") return matchesSearch && product.type === "Raw Material";
    if (activeTab === "low-stock") {
      if (product.type === "Raw Material") {
        return matchesSearch && (product.stock <= (product.minStockLevel || 0));
      } else {
        return matchesSearch && (product.status === "Low Stock" || product.status === "Out of Stock");
      }
    }
    
    return matchesSearch;
  });

  // Count the number of low stock items
  const lowStockCount = sampleProducts.filter(product => {
    if (product.type === "Raw Material") {
      return product.stock <= (product.minStockLevel || 0);
    } else {
      return product.status === "Low Stock" || product.status === "Out of Stock";
    }
  }).length;

  // For editing a product
  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setOpenDialog(true);
  };

  // Get status badge
  const getStatusBadge = (product: Product) => {
    if (product.type === "Raw Material" && product.minStockLevel && product.stock <= product.minStockLevel) {
      return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Low Stock</Badge>;
    }
    
    switch (product.status) {
      case "In Stock":
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">In Stock</Badge>;
      case "Low Stock":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Low Stock</Badge>;
      case "Out of Stock":
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Out of Stock</Badge>;
    }
  };

  // For demo purposes - show an alert when viewing low stock items
  useEffect(() => {
    if (activeTab === "low-stock" && lowStockCount > 0) {
      toast({
        title: "Low Stock Alert",
        description: `${lowStockCount} items need to be ordered soon.`,
        variant: "destructive"
      });
    }
  }, [activeTab]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The filtering is already happening dynamically, but we could add additional logic here
    toast({
      title: "Search Results",
      description: `Found ${filteredProducts.length} product(s) matching "${searchTerm}"`,
    });
  };

  const generatePDF = () => {
    // In a real app, this would generate a PDF
    toast({
      title: "PDF Generated",
      description: "Low stock items report has been generated",
    });
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-500">Manage your product inventory</p>
        </div>
        <Dialog open={openDialog} onOpenChange={(open) => {
          setOpenDialog(open);
          if (!open) setEditingProduct(null);
        }}>
          <DialogTrigger asChild>
            <Button className="flex items-center">
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Package className="mr-2 h-5 w-5" />
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </DialogTitle>
            </DialogHeader>
            <ProductForm 
              onClose={() => setOpenDialog(false)} 
              editProduct={editingProduct}
            />
          </DialogContent>
        </Dialog>
      </div>

      {lowStockCount > 0 && activeTab !== "low-stock" && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md flex items-center">
          <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
          <span className="text-yellow-800">
            {lowStockCount} items are below minimum stock levels. 
          </span>
          <Button 
            variant="ghost" 
            size="sm" 
            className="ml-auto text-yellow-800"
            onClick={() => setActiveTab("low-stock")}
          >
            View Items
          </Button>
        </div>
      )}

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
        <div className="mb-4">
          <TabsList className="grid grid-cols-4 w-full md:w-fit">
            <TabsTrigger value="all">All Items</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="materials">Raw Materials</TabsTrigger>
            <TabsTrigger value="low-stock" className="relative">
              Low Stock
              {lowStockCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {lowStockCount}
                </span>
              )}
            </TabsTrigger>
          </TabsList>
        </div>
      
        <Card>
          <div className="p-4 border-b">
            <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
              <form onSubmit={handleSearch} className="relative w-full md:max-w-sm flex">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-8 bg-white"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
                <Button type="submit" className="ml-2">Search</Button>
              </form>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={generatePDF}>
                  Export PDF
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
                      Name
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Type</TableHead>
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
                      <TableCell>
                        <div className="flex items-center">
                          {product.image && (
                            <div className="h-10 w-10 mr-2 overflow-hidden rounded-md">
                              <AspectRatio ratio={1/1}>
                                <img src={product.image} alt={product.name} className="object-cover h-full w-full" />
                              </AspectRatio>
                            </div>
                          )}
                          <div>
                            <div>{product.name}</div>
                            {product.supplierInfo && (
                              <div className="text-xs text-gray-500">{product.supplierInfo}</div>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={
                          product.type === "Product" 
                            ? "bg-blue-100 text-blue-800 border-blue-200" 
                            : "bg-purple-100 text-purple-800 border-purple-200"
                        }>
                          {product.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">₹{product.price.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex flex-col items-end">
                          <span>{product.stock}</span>
                          {product.type === "Raw Material" && product.minStockLevel !== undefined && (
                            <span className="text-xs text-gray-500">Min: {product.minStockLevel}</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(product)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem className="flex items-center" onClick={() => handleEditProduct(product)}>
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
                    <TableCell colSpan={8} className="h-24 text-center">
                      No products found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </Tabs>
    </Layout>
  );
};

export default Products;
