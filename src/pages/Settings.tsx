
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Building, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  FileText, 
  Palette,
  Save
} from "lucide-react";

const Settings = () => {
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500">Manage your account and application preferences</p>
      </div>

      <Tabs defaultValue="company" className="space-y-6">
        <TabsList>
          <TabsTrigger value="company" className="flex items-center">
            <Building className="mr-2 h-4 w-4" />
            Company
          </TabsTrigger>
          <TabsTrigger value="invoice" className="flex items-center">
            <FileText className="mr-2 h-4 w-4" />
            Invoice
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center">
            <Palette className="mr-2 h-4 w-4" />
            Appearance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="company" className="space-y-6">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-medium mb-4">Company Information</h3>
              <div className="space-y-4">
                <div className="form-group">
                  <label htmlFor="company-name" className="text-sm font-medium text-gray-700">
                    Company Name
                  </label>
                  <Input id="company-name" placeholder="Your Company Name" defaultValue="InventoryPro Inc." />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label htmlFor="company-email" className="text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-gray-500">
                        <Mail className="h-4 w-4" />
                      </span>
                      <Input id="company-email" type="email" className="rounded-l-none" placeholder="contact@example.com" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="company-phone" className="text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-gray-500">
                        <Phone className="h-4 w-4" />
                      </span>
                      <Input id="company-phone" className="rounded-l-none" placeholder="(555) 123-4567" />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="company-website" className="text-sm font-medium text-gray-700">
                    Website
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-gray-500">
                      <Globe className="h-4 w-4" />
                    </span>
                    <Input id="company-website" className="rounded-l-none" placeholder="https://example.com" />
                  </div>
                </div>

                <Separator />
                
                <div className="form-group">
                  <label htmlFor="company-address" className="text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-gray-500">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <Input id="company-address" className="rounded-l-none" placeholder="123 Main St" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="form-group">
                    <label htmlFor="company-city" className="text-sm font-medium text-gray-700">
                      City
                    </label>
                    <Input id="company-city" placeholder="City" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="company-state" className="text-sm font-medium text-gray-700">
                      State/Province
                    </label>
                    <Input id="company-state" placeholder="State" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="company-zip" className="text-sm font-medium text-gray-700">
                      Postal/Zip Code
                    </label>
                    <Input id="company-zip" placeholder="Zip" />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="company-country" className="text-sm font-medium text-gray-700">
                    Country
                  </label>
                  <Input id="company-country" placeholder="Country" defaultValue="United States" />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button className="flex items-center">
                  <Save className="mr-2 h-4 w-4" /> Save Changes
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="invoice" className="space-y-6">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-medium mb-4">Invoice Settings</h3>
              <div className="space-y-4">
                <div className="form-group">
                  <label htmlFor="invoice-prefix" className="text-sm font-medium text-gray-700">
                    Invoice Number Prefix
                  </label>
                  <Input id="invoice-prefix" placeholder="INV-" defaultValue="INV-" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label htmlFor="invoice-start" className="text-sm font-medium text-gray-700">
                      Starting Number
                    </label>
                    <Input id="invoice-start" type="number" defaultValue="001" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="invoice-due" className="text-sm font-medium text-gray-700">
                      Default Due Days
                    </label>
                    <Input id="invoice-due" type="number" defaultValue="14" />
                  </div>
                </div>

                <Separator />

                <div className="form-group">
                  <label htmlFor="invoice-notes" className="text-sm font-medium text-gray-700">
                    Default Invoice Notes
                  </label>
                  <textarea 
                    id="invoice-notes" 
                    className="flex h-32 w-full resize-y rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="Thank you for your business!"
                    defaultValue="Thank you for your business! Payment is due within the number of days specified on this invoice. Please make checks payable to InventoryPro Inc."
                  ></textarea>
                </div>

                <Separator />
                
                <div className="form-group">
                  <label htmlFor="invoice-currency" className="text-sm font-medium text-gray-700">
                    Default Currency
                  </label>
                  <Input id="invoice-currency" defaultValue="USD" />
                </div>
                <div className="form-group">
                  <label htmlFor="invoice-tax" className="text-sm font-medium text-gray-700">
                    Default Tax Rate (%)
                  </label>
                  <Input id="invoice-tax" type="number" defaultValue="7.5" />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button className="flex items-center">
                  <Save className="mr-2 h-4 w-4" /> Save Changes
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-medium mb-4">Appearance Settings</h3>
              <div className="space-y-4">
                <div className="form-group">
                  <label className="text-sm font-medium text-gray-700">
                    Theme Colors
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                    <div className="flex flex-col items-center">
                      <div className="h-12 w-12 rounded-full bg-brand-700 border-2 border-white shadow-sm cursor-pointer ring-2 ring-brand-200"></div>
                      <span className="text-xs mt-1">Ocean</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="h-12 w-12 rounded-full bg-purple-700 border-2 border-white shadow-sm cursor-pointer"></div>
                      <span className="text-xs mt-1">Lavender</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="h-12 w-12 rounded-full bg-green-700 border-2 border-white shadow-sm cursor-pointer"></div>
                      <span className="text-xs mt-1">Forest</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="h-12 w-12 rounded-full bg-amber-700 border-2 border-white shadow-sm cursor-pointer"></div>
                      <span className="text-xs mt-1">Amber</span>
                    </div>
                  </div>
                </div>

                <Separator />
                
                <div className="form-group">
                  <label className="text-sm font-medium text-gray-700">
                    Logo
                  </label>
                  <div className="mt-2 flex items-center space-x-4">
                    <div className="rounded-md bg-gray-100 p-4">
                      <Package className="h-10 w-10 text-brand-700" />
                    </div>
                    <Button variant="outline">Change Logo</Button>
                  </div>
                </div>

                <Separator />
                
                <div className="form-group">
                  <label className="text-sm font-medium text-gray-700">
                    Invoice Template
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                    <div className="border rounded-md p-2 cursor-pointer bg-gray-50 ring-2 ring-brand-200">
                      <div className="h-32 bg-white border rounded-md flex flex-col p-2">
                        <div className="h-4 w-20 bg-brand-200 rounded mb-2"></div>
                        <div className="flex-grow flex flex-col space-y-1">
                          <div className="h-2 w-full bg-gray-200 rounded"></div>
                          <div className="h-2 w-3/4 bg-gray-200 rounded"></div>
                          <div className="h-2 w-1/2 bg-gray-200 rounded"></div>
                        </div>
                        <div className="h-6 w-full bg-brand-100 rounded mt-2"></div>
                      </div>
                      <div className="text-center mt-1 text-xs font-medium">Modern</div>
                    </div>
                    <div className="border rounded-md p-2 cursor-pointer">
                      <div className="h-32 bg-white border rounded-md flex flex-col p-2">
                        <div className="flex justify-between mb-2">
                          <div className="h-4 w-16 bg-gray-200 rounded"></div>
                          <div className="h-4 w-12 bg-gray-200 rounded"></div>
                        </div>
                        <div className="flex-grow flex flex-col space-y-1">
                          <div className="h-2 w-full bg-gray-200 rounded"></div>
                          <div className="h-2 w-full bg-gray-200 rounded"></div>
                          <div className="h-2 w-3/4 bg-gray-200 rounded"></div>
                        </div>
                        <div className="h-4 w-1/4 bg-gray-200 rounded mt-2 self-end"></div>
                      </div>
                      <div className="text-center mt-1 text-xs font-medium">Classic</div>
                    </div>
                    <div className="border rounded-md p-2 cursor-pointer">
                      <div className="h-32 bg-white border rounded-md flex flex-col p-2">
                        <div className="h-8 w-full bg-gray-200 rounded-sm mb-2"></div>
                        <div className="flex-grow flex flex-col space-y-1">
                          <div className="h-2 w-full bg-gray-200 rounded"></div>
                          <div className="h-2 w-5/6 bg-gray-200 rounded"></div>
                        </div>
                        <div className="h-6 w-full bg-gray-200 rounded-sm mt-2"></div>
                      </div>
                      <div className="text-center mt-1 text-xs font-medium">Minimalist</div>
                    </div>
                  </div>
                </div>

              </div>

              <div className="mt-6 flex justify-end">
                <Button className="flex items-center">
                  <Save className="mr-2 h-4 w-4" /> Save Changes
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Settings;
