
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { 
  BarChart3, 
  Package, 
  Users, 
  FileText, 
  ArrowUpRight, 
  ArrowDownRight,
  BadgeDollarSign,
  Download
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from "recharts";
import { Button } from "@/components/ui/button";

// Sample data for charts with boiler-related data
const salesData = [
  { name: "Jan", total: 240000 },
  { name: "Feb", total: 139800 },
  { name: "Mar", total: 980000 },
  { name: "Apr", total: 390800 },
  { name: "May", total: 480000 },
  { name: "Jun", total: 380000 },
];

const inventoryData = [
  { name: "Boiler Systems", value: 30 },
  { name: "Heat Exchangers", value: 45 },
  { name: "Thermic Fluid Heaters", value: 20 },
  { name: "Hot Water Generators", value: 65 },
  { name: "Control Components", value: 15 },
];

const recentInvoices = [
  { id: "INV-001", customer: "Jindal Steel", date: "May 12, 2025", amount: 154000 },
  { id: "INV-002", customer: "Tata Industries", date: "May 11, 2025", amount: 230000 },
  { id: "INV-003", customer: "Reliance Energy", date: "May 10, 2025", amount: 410000 },
  { id: "INV-004", customer: "Adani Power", date: "May 09, 2025", amount: 78000 },
];

const lowStockProducts = [
  { id: "PRD-001", name: "Boiler System - 500kg/hr", stock: 3, threshold: 5 },
  { id: "RAW-001", name: "Stainless Steel Screws M10", stock: 2, threshold: 5 },
  { id: "RAW-003", name: "Control Valve 2\"", stock: 4, threshold: 10 },
];

const COLORS = ['#2c5282', '#3182ce', '#4299e1', '#63b3ed', '#90cdf4'];

const Dashboard = () => {
  const downloadLowStockPDF = () => {
    // In a real implementation, this would generate a PDF
    console.log("Generating low stock PDF report");
    // PDF generation would happen here
    alert("Low stock PDF report downloaded");
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Welcome to your boiler inventory control center</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="dashboard-card">
          <div className="flex justify-between items-center mb-4">
            <span className="stat-label">Total Products</span>
            <div className="bg-brand-100 p-2 rounded-full">
              <Package className="h-5 w-5 text-brand-700" />
            </div>
          </div>
          <div className="flex items-baseline">
            <span className="stat-value">168</span>
            <span className="ml-2 flex items-center text-green-500 text-sm">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              12%
            </span>
          </div>
        </Card>

        <Card className="dashboard-card">
          <div className="flex justify-between items-center mb-4">
            <span className="stat-label">Total Customers</span>
            <div className="bg-blue-100 p-2 rounded-full">
              <Users className="h-5 w-5 text-blue-700" />
            </div>
          </div>
          <div className="flex items-baseline">
            <span className="stat-value">83</span>
            <span className="ml-2 flex items-center text-green-500 text-sm">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              5%
            </span>
          </div>
        </Card>

        <Card className="dashboard-card">
          <div className="flex justify-between items-center mb-4">
            <span className="stat-label">Invoices</span>
            <div className="bg-accent2-100 p-2 rounded-full">
              <FileText className="h-5 w-5 text-accent2-700" />
            </div>
          </div>
          <div className="flex items-baseline">
            <span className="stat-value">241</span>
            <span className="ml-2 flex items-center text-green-500 text-sm">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              18%
            </span>
          </div>
        </Card>

        <Card className="dashboard-card">
          <div className="flex justify-between items-center mb-4">
            <span className="stat-label">Revenue</span>
            <div className="bg-green-100 p-2 rounded-full">
              <BadgeDollarSign className="h-5 w-5 text-green-700" />
            </div>
          </div>
          <div className="flex items-baseline">
            <span className="stat-value">₹14.8L</span>
            <span className="ml-2 flex items-center text-red-500 text-sm">
              <ArrowDownRight className="h-4 w-4 mr-1" />
              3%
            </span>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="dashboard-card">
          <h3 className="font-medium text-gray-700 mb-4 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-brand-600" />
            Monthly Sales
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={salesData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2c5282" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#2c5282" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']} />
                <Area
                  type="monotone"
                  dataKey="total"
                  stroke="#2c5282"
                  fillOpacity={1}
                  fill="url(#colorTotal)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="dashboard-card">
          <h3 className="font-medium text-gray-700 mb-4 flex items-center">
            <Package className="h-5 w-5 mr-2 text-brand-600" />
            Inventory Distribution
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={inventoryData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Bar dataKey="value" background={{ fill: "#eee" }}>
                  {inventoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="dashboard-card">
          <h3 className="font-medium text-gray-700 mb-4 flex items-center">
            <FileText className="h-5 w-5 mr-2 text-brand-600" />
            Recent Invoices
          </h3>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Invoice</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentInvoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-100">
                    <td className="font-medium text-brand-600">{invoice.id}</td>
                    <td>{invoice.customer}</td>
                    <td>{invoice.date}</td>
                    <td>₹{invoice.amount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="dashboard-card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-700 flex items-center">
              <Package className="h-5 w-5 mr-2 text-brand-600" />
              Low Stock Products
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={downloadLowStockPDF}
              className="flex items-center gap-1"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
          </div>
          
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>SKU</th>
                  <th>Product</th>
                  <th>Stock</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {lowStockProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-100">
                    <td className="font-medium">{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.stock}</td>
                    <td>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Low Stock
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
