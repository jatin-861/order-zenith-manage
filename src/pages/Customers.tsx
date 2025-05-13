
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
  Users, 
  Search, 
  MoreVertical, 
  Edit, 
  Trash, 
  Plus,
  UserPlus,
  Mail,
  Phone,
  MapPin
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  dateAdded: string;
  totalOrders: number;
  totalSpent: number;
}

const sampleCustomers: Customer[] = [
  {
    id: "CUS-001",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "555-123-4567",
    address: "123 Main St, New York, NY",
    dateAdded: "May 10, 2025",
    totalOrders: 8,
    totalSpent: 4350,
  },
  {
    id: "CUS-002",
    name: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "555-987-6543",
    address: "456 Elm St, Boston, MA",
    dateAdded: "Apr 22, 2025",
    totalOrders: 5,
    totalSpent: 2800,
  },
  {
    id: "CUS-003",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    phone: "555-456-7890",
    address: "789 Oak St, Chicago, IL",
    dateAdded: "May 05, 2025",
    totalOrders: 12,
    totalSpent: 7200,
  },
  {
    id: "CUS-004",
    name: "Emily Wilson",
    email: "emily.wilson@example.com",
    phone: "555-234-5678",
    address: "321 Pine St, San Francisco, CA",
    dateAdded: "May 02, 2025",
    totalOrders: 3,
    totalSpent: 1200,
  },
  {
    id: "CUS-005",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "555-876-5432",
    address: "654 Maple St, Austin, TX",
    dateAdded: "Apr 25, 2025",
    totalOrders: 7,
    totalSpent: 4800,
  },
  {
    id: "CUS-006",
    name: "Sarah Davis",
    email: "sarah.davis@example.com",
    phone: "555-345-6789",
    address: "987 Birch St, Seattle, WA",
    dateAdded: "May 08, 2025",
    totalOrders: 4,
    totalSpent: 2100,
  },
];

const CustomerForm = ({ onClose }: { onClose: () => void }) => (
  <div className="space-y-4">
    <div className="form-group">
      <label htmlFor="customer-name" className="text-sm font-medium text-gray-700">
        Customer Name
      </label>
      <Input id="customer-name" placeholder="Full name" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="form-group">
        <label htmlFor="customer-email" className="text-sm font-medium text-gray-700">
          Email Address
        </label>
        <Input id="customer-email" type="email" placeholder="email@example.com" />
      </div>
      <div className="form-group">
        <label htmlFor="customer-phone" className="text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <Input id="customer-phone" placeholder="(555) 123-4567" />
      </div>
    </div>
    <div className="form-group">
      <label htmlFor="customer-address" className="text-sm font-medium text-gray-700">
        Address
      </label>
      <Input id="customer-address" placeholder="123 Main St" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="form-group">
        <label htmlFor="customer-city" className="text-sm font-medium text-gray-700">
          City
        </label>
        <Input id="customer-city" placeholder="City" />
      </div>
      <div className="form-group">
        <label htmlFor="customer-state" className="text-sm font-medium text-gray-700">
          State
        </label>
        <Input id="customer-state" placeholder="State" />
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="form-group">
        <label htmlFor="customer-zip" className="text-sm font-medium text-gray-700">
          Zip Code
        </label>
        <Input id="customer-zip" placeholder="Zip" />
      </div>
      <div className="form-group">
        <label htmlFor="customer-country" className="text-sm font-medium text-gray-700">
          Country
        </label>
        <Input id="customer-country" placeholder="Country" defaultValue="United States" />
      </div>
    </div>
    <DialogFooter>
      <Button variant="outline" onClick={onClose}>
        Cancel
      </Button>
      <Button>Save Customer</Button>
    </DialogFooter>
  </div>
);

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const filteredCustomers = sampleCustomers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part.charAt(0))
      .join("")
      .toUpperCase();
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-500">Manage your customer database</p>
        </div>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button className="flex items-center">
              <UserPlus className="mr-2 h-4 w-4" /> Add Customer
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Add New Customer
              </DialogTitle>
            </DialogHeader>
            <CustomerForm onClose={() => setOpenDialog(false)} />
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
                placeholder="Search customers..."
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
                Import
              </Button>
            </div>
          </div>
        </div>

        <div className="table-container">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Customer</TableHead>
                <TableHead>Contact Info</TableHead>
                <TableHead>Date Added</TableHead>
                <TableHead className="text-right">Total Orders</TableHead>
                <TableHead className="text-right">Total Spent</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback className="bg-brand-100 text-brand-700">
                            {getInitials(customer.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{customer.name}</div>
                          <div className="text-xs text-muted-foreground">{customer.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Mail className="mr-2 h-3 w-3 text-gray-500" />
                          {customer.email}
                        </div>
                        <div className="flex items-center text-sm">
                          <Phone className="mr-2 h-3 w-3 text-gray-500" />
                          {customer.phone}
                        </div>
                        <div className="flex items-center text-sm">
                          <MapPin className="mr-2 h-3 w-3 text-gray-500" />
                          {customer.address}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{customer.dateAdded}</TableCell>
                    <TableCell className="text-right">{customer.totalOrders}</TableCell>
                    <TableCell className="text-right">${customer.totalSpent.toLocaleString()}</TableCell>
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
                  <TableCell colSpan={6} className="h-24 text-center">
                    No customers found.
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

export default Customers;
