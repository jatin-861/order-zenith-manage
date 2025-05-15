import React from "react";
import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Settings as SettingsIcon, 
  User, 
  Building, 
  Bell, 
  FileText,
  Package
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";

const Settings = () => {
  // Theme logic
  useEffect(() => {
    // Read from local storage
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(storedTheme);
    }
  }, []);

  const handleThemeChange = (selected: string) => {
    const set = selected.toLowerCase();
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(set);
    localStorage.setItem("theme", set);
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    localStorage.setItem("currency", e.target.value);
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500">Manage your inventory system preferences</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid grid-cols-5 w-full mb-6">
          <TabsTrigger value="general" className="flex items-center gap-1">
            <SettingsIcon className="h-4 w-4" /> General
          </TabsTrigger>
          <TabsTrigger value="company" className="flex items-center gap-1">
            <Building className="h-4 w-4" /> Company
          </TabsTrigger>
          <TabsTrigger value="inventory" className="flex items-center gap-1">
            <Package className="h-4 w-4" /> Inventory
          </TabsTrigger>
          <TabsTrigger value="invoices" className="flex items-center gap-1">
            <FileText className="h-4 w-4" /> Invoices
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-1">
            <Bell className="h-4 w-4" /> Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="p-6">
            <h2 className="text-lg font-medium mb-4">General Settings</h2>
            <Separator className="my-4" />
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Language</h3>
                    <div className="flex items-center space-x-2 rounded-md border p-2">
                      <div className="flex-1">
                        <select className="w-full bg-transparent border-0 outline-none focus:ring-0">
                          <option>English</option>
                          <option>Hindi</option>
                          <option>Gujarati</option>
                          <option>Tamil</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Currency</h3>
                    <div className="flex items-center space-x-2 rounded-md border p-2">
                      <div className="flex-1">
                        <select
                          className="w-full bg-transparent border-0 outline-none focus:ring-0"
                          value={localStorage.getItem("currency") || "INR"}
                          onChange={handleCurrencyChange}
                        >
                          <option value="INR">₹ - Indian Rupee (INR)</option>
                          <option value="USD">$ - US Dollar (USD)</option>
                          <option value="EUR">€ - Euro (EUR)</option>
                          <option value="GBP">£ - British Pound (GBP)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Date Format</h3>
                    <div className="flex items-center space-x-2 rounded-md border p-2">
                      <div className="flex-1">
                        <select className="w-full bg-transparent border-0 outline-none focus:ring-0">
                          <option>DD-MM-YYYY</option>
                          <option>MM-DD-YYYY</option>
                          <option>YYYY-MM-DD</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Theme</h3>
                    <div className="flex items-center space-x-2 rounded-md border p-2">
                      <div className="flex-1">
                        <select
                          className="w-full bg-transparent border-0 outline-none focus:ring-0"
                          defaultValue={localStorage.getItem("theme") || "light"}
                          onChange={e => handleThemeChange(e.target.value)}
                        >
                          <option value="light">Light</option>
                          <option value="dark">Dark</option>
                          <option value="system">System</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium mb-2">System Preferences</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="autosave">Auto-save inventory changes</Label>
                    <Switch id="autosave" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="reminders">Show low stock reminders</Label>
                    <Switch id="reminders" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="analytics">Enable analytics tracking</Label>
                    <Switch id="analytics" defaultChecked />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="company">
          <Card className="p-6">
            <h2 className="text-lg font-medium mb-4">Company Information</h2>
            <Separator className="my-4" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input id="company-name" defaultValue="HeatMax Boiler Systems" />
                </div>
                <div>
                  <Label htmlFor="address-1">Address Line 1</Label>
                  <Input id="address-1" />
                </div>
                <div>
                  <Label htmlFor="address-2">Address Line 2</Label>
                  <Input id="address-2" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input id="state" />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="gst">GST Number</Label>
                  <Input id="gst" placeholder="22AAAAA0000A1Z5" />
                </div>
                <div>
                  <Label htmlFor="pan">PAN Number</Label>
                  <Input id="pan" placeholder="AAAAA0000A" />
                </div>
                <div>
                  <Label htmlFor="contact-phone">Contact Phone</Label>
                  <Input id="contact-phone" />
                </div>
                <div>
                  <Label htmlFor="contact-email">Contact Email</Label>
                  <Input id="contact-email" type="email" />
                </div>
              </div>
            </div>
            <div className="mt-6 text-right">
              <Button variant="outline" className="mr-2">Cancel</Button>
              <Button>Save Changes</Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="inventory">
          <Card className="p-6">
            <h2 className="text-lg font-medium mb-4">Inventory Settings</h2>
            <Separator className="my-4" />
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="default-min-stock">Default Minimum Stock Level</Label>
                  <Input id="default-min-stock" type="number" defaultValue="5" />
                </div>
                <div>
                  <Label htmlFor="default-reorder-qty">Default Reorder Quantity</Label>
                  <Input id="default-reorder-qty" type="number" defaultValue="10" />
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium mb-2">Inventory Alerts</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="low-stock-alert">Low stock alerts</Label>
                    <Switch id="low-stock-alert" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="expiry-alert">Expiry alerts</Label>
                    <Switch id="expiry-alert" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="weekly-report">Weekly inventory reports</Label>
                    <Switch id="weekly-report" />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 text-right">
              <Button variant="outline" className="mr-2">Cancel</Button>
              <Button>Save Changes</Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="invoices">
          <Card className="p-6">
            <h2 className="text-lg font-medium mb-4">Invoice Settings</h2>
            <Separator className="my-4" />
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="invoice-prefix">Invoice Number Prefix</Label>
                  <Input id="invoice-prefix" defaultValue="INV-" />
                </div>
                <div>
                  <Label htmlFor="next-invoice-number">Next Invoice Number</Label>
                  <Input id="next-invoice-number" type="number" defaultValue="007" />
                </div>
                <div>
                  <Label htmlFor="default-tax-rate">Default Tax Rate (%)</Label>
                  <Input id="default-tax-rate" type="number" defaultValue="18" />
                </div>
                <div>
                  <Label htmlFor="payment-terms">Default Payment Terms (days)</Label>
                  <Input id="payment-terms" type="number" defaultValue="30" />
                </div>
              </div>

              <div>
                <Label htmlFor="invoice-notes">Default Invoice Notes</Label>
                <textarea 
                  id="invoice-notes" 
                  className="flex h-20 w-full resize-y rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  defaultValue="Thank you for your business!"
                ></textarea>
              </div>
            </div>
            <div className="mt-6 text-right">
              <Button variant="outline" className="mr-2">Cancel</Button>
              <Button>Save Changes</Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="p-6">
            <h2 className="text-lg font-medium mb-4">Notification Settings</h2>
            <Separator className="my-4" />
            
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Email Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-low-stock">Low stock alerts</Label>
                    <Switch id="notify-low-stock" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-order">Order confirmations</Label>
                    <Switch id="notify-order" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-invoice">Invoice generated</Label>
                    <Switch id="notify-invoice" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-payment">Payment received</Label>
                    <Switch id="notify-payment" defaultChecked />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium mb-2">App Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="app-low-stock">Low stock alerts</Label>
                    <Switch id="app-low-stock" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="app-system">System updates</Label>
                    <Switch id="app-system" />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 text-right">
              <Button variant="outline" className="mr-2">Reset to Default</Button>
              <Button>Save Changes</Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Settings;
