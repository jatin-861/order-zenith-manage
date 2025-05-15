import React, { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileText, FilePlus, Printer, Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import InvoiceForm from "@/components/invoice/InvoiceForm";
import InvoiceList from "@/components/invoice/InvoiceList";
import InvoiceAlert from "@/components/invoice/InvoiceAlert";
import { sampleInvoices } from "@/utils/invoiceUtils";
import FuturisticLoader from "@/components/Loader";
import { supabase } from "@/integrations/supabase/client";

const Invoices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const { toast } = useToast();
  const [productOptions, setProductOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load products for invoice selection
    async function fetchProducts() {
      setLoading(true);
      const { data: products } = await supabase.from("products").select("*");
      setProductOptions(products || []);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  if (loading) return <FuturisticLoader />;

  const filteredInvoices = sampleInvoices.filter(invoice => 
    invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = () => {
    toast({
      title: "Search Results",
      description: `Found ${filteredInvoices.length} invoice(s) matching your search`,
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
            <InvoiceForm onClose={() => setOpenDialog(false)} products={productOptions} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Alert for overdue invoices */}
      <InvoiceAlert invoices={sampleInvoices} />

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

        <InvoiceList invoices={filteredInvoices} />
      </Card>
    </Layout>
  );
};

export default Invoices;
