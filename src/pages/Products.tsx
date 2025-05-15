
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
  Tabs, TabsContent, TabsList, TabsTrigger
} from "@/components/ui/tabs";
import { 
  Package, 
  Search, 
  MoreVertical, 
  Edit, 
  Trash, 
  Plus,
  ArrowUpDown,
  AlertCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { rawMaterialNames } from "@/utils/productUtils";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  type: "Product" | "Raw Material";
  image?: string;
  description?: string;
  minStockLevel?: number;
  supplierInfo?: string;
}

// Currency conversion
const EXCHANGE_RATES: Record<string, number> = {
  INR: 1,
  USD: 1 / 83,
  EUR: 1 / 90,
  GBP: 1 / 105
};
const CURRENCY_SYMBOL: Record<string, string> = {
  INR: "₹",
  USD: "$",
  EUR: "€",
  GBP: "£"
};

function randomStock() { return Math.floor(Math.random() * 80) + 10; }
function randomPrice() { return Math.floor(Math.random() * 4000) + 500; }

const HEATMAX_PRODUCTS = [
  { name: "Steam Boiler" },
  { name: "Thermic Fluid Heater" },
  { name: "Heat Exchanger" },
  { name: "Hot Air Generator" },
  { name: "Hot Water Boiler" },
  { name: "Industrial Burner" },
  { name: "Furnace" },
  { name: "Oil Heater" },
  { name: "Gas Fired Heater" },
  { name: "Agro Waste Fired Boiler" },
];

function useSupabaseProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndSeed = async () => {
      setLoading(true);
      let { data: dbProducts } = await supabase.from("products").select("*");

      // If products not seeded, insert
      if (!dbProducts || dbProducts.length === 0) {
        // Seed raw materials
        const rawMaterials = rawMaterialNames.map(name => ({
          id: uuidv4(),
          name,
          price: randomPrice(),
          stock: randomStock(),
          min_stock_level: 5,
          type: "Raw Material"
        }));
        // Seed products
        const heatmaxProds = HEATMAX_PRODUCTS.map(p => ({
          id: uuidv4(),
          name: p.name,
          price: randomPrice(),
          stock: randomStock(),
          min_stock_level: 10,
          type: "Product"
        }));
        // Map to DB columns, dropping category/type for insertion (not in DB)
        const allSeed = [...rawMaterials, ...heatmaxProds].map(p => ({
          id: p.id,
          name: p.name,
          price: p.price,
          stock: p.stock,
          min_stock_level: p.min_stock_level,
        }));
        await supabase.from("products").insert(allSeed);
        dbProducts = (await supabase.from("products").select("*")).data;
      }
      // Add type based on min_stock_level/key
      setProducts((dbProducts || []).map(p => ({
        ...p,
        type: (p.min_stock_level && p.min_stock_level <= 5) ? "Raw Material" : "Product",
        status: "In Stock" // Default for UI
      })));
      setLoading(false);
    };
    fetchAndSeed();
  }, []);
  return { products, setProducts, loading };
}

const Products = () => {
  const { products, setProducts, loading } = useSupabaseProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "products" | "materials" | "low-stock">("all");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { toast } = useToast();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [currency, setCurrency] = useState("INR");
  const isAdmin = localStorage.getItem("adminSession") === "true";

  // When currency changes in settings, auto-update here (simulate)
  useEffect(() => {
    const onStorage = () => setCurrency(localStorage.getItem("currency") || "INR");
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleAddOrEditProduct = async (values: Partial<Product>) => {
    if (!values.name) {
      toast({ title: "Invalid", description: "Name required", variant: "destructive" }); return;
    }
    let result;
    if (editingProduct) {
      result = await supabase.from("products").update({
        name: values.name,
        price: values.price ?? 0,
        stock: values.stock ?? 0,
        min_stock_level: values.type === "Raw Material" ? values.minStockLevel ?? 5 : 10,
        // "type" not in db
      }).eq("id", editingProduct.id).select();
      toast({ title: "Product Updated" });
    } else {
      result = await supabase.from("products").insert([{
        id: uuidv4(),
        name: values.name,
        price: values.price ?? randomPrice(),
        stock: values.stock ?? randomStock(),
        min_stock_level: values.type === "Raw Material" ? values.minStockLevel ?? 5 : 10,
      }]).select();
      toast({ title: "Product Added" });
    }
    if (!result.error) {
      setProducts(await (await supabase.from("products").select("*")).data ?? []);
      setOpenDialog(false);
      setEditingProduct(null);
    }
  };

  const handleDeleteProduct = async (pid: string) => {
    setDeletingId(pid);
    await supabase.from("products").delete().eq("id", pid);
    setProducts((await supabase.from("products").select("*")).data || []);
    setDeletingId(null);
    toast({ title: "Product Deleted" });
  };

  // Tab filters
  const filtered = products.filter(product => {
    const matchesSearch =
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id?.toLowerCase().includes(searchTerm.toLowerCase());
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "products") return matchesSearch && product.type === "Product";
    if (activeTab === "materials") return matchesSearch && product.type === "Raw Material";
    if (activeTab === "low-stock") return matchesSearch && product.stock <= (product.minStockLevel || 10);
    return matchesSearch;
  });

  const lowStockCount = filtered.filter(product => product.stock <= (product.minStockLevel || 10)).length;

  const ProductForm = ({ onClose, editProduct = null }: { onClose: () => void, editProduct?: Product | null }) => {
    const [product, setProduct] = useState<Partial<Product>>(editProduct
      ? {
        ...editProduct,
        minStockLevel: editProduct.minStockLevel ?? (editProduct.type === "Raw Material" ? 5 : 10)
      }
      : { type: "Product", status: "In Stock" });

    const handleChange = (key: keyof Product, value: any) => {
      setProduct(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async () => {
      await handleAddOrEditProduct(product);
      onClose();
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
            <label className="text-sm font-medium text-gray-700">
              Price ({CURRENCY_SYMBOL[currency]})
            </label>
            <Input 
              type="number" 
              placeholder="0.00" 
              value={product.price || ''}
              onChange={(e) => handleChange('price', parseFloat(e.target.value))}
            />
          </div>
          <div className="form-group">
            <label className="text-sm font-medium text-gray-700">
              Stock Quantity
            </label>
            <Input 
              type="number" 
              placeholder="0" 
              value={product.stock || ''}
              onChange={(e) => handleChange('stock', parseInt(e.target.value))}
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

  if (loading) return <div className="flex justify-center p-10 text-xl text-blue-600 font-bold">Loading products...</div>;

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
              <form className="relative w-full md:max-w-sm flex" onSubmit={e => { e.preventDefault(); }}>
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
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length > 0 ? (
                  filtered.map((product) => (
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
                      <TableCell>
                        <Badge variant="outline" className={
                          product.type === "Product" 
                            ? "bg-blue-100 text-blue-800 border-blue-200" 
                            : "bg-purple-100 text-purple-800 border-purple-200"
                        }>
                          {product.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {CURRENCY_SYMBOL[currency]}{(product.price * EXCHANGE_RATES[currency]).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex flex-col items-end">
                          <span>{product.stock}</span>
                          {product.type === "Raw Material" && product.minStockLevel !== undefined && (
                            <span className="text-xs text-gray-500">Min: {product.minStockLevel}</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {product.stock <= (product.minStockLevel || 10)
                          ? <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Low Stock</Badge>
                          : <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">In Stock</Badge>
                        }
                      </TableCell>
                      <TableCell>
                        {isAdmin && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem className="flex items-center" onClick={() => { setEditingProduct(product); setOpenDialog(true); }}>
                                <Edit className="mr-2 h-4 w-4" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="flex items-center text-red-600"
                                onClick={() => handleDeleteProduct(product.id)}
                              >
                                <Trash className="mr-2 h-4 w-4" /> {deletingId === product.id ? "Deleting..." : "Delete"}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
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
      </Tabs>
    </Layout>
  );
};

export default Products;
