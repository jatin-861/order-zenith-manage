
import React from "react";
import { NavLink } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  FileText, 
  Settings, 
  ChevronRight, 
  Menu 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface SidebarLink {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const links: SidebarLink[] = [
  {
    icon: <LayoutDashboard className="h-5 w-5" />,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: <Package className="h-5 w-5" />,
    label: "Products",
    href: "/products",
  },
  {
    icon: <Users className="h-5 w-5" />,
    label: "Customers",
    href: "/customers",
  },
  {
    icon: <FileText className="h-5 w-5" />,
    label: "Invoices",
    href: "/invoices",
  },
  {
    icon: <Settings className="h-5 w-5" />,
    label: "Settings",
    href: "/settings",
  },
];

const SidebarContent = ({ className }: { className?: string }) => {
  return (
    <div className={cn("py-4 flex flex-col h-full", className)}>
      <div className="px-3 py-2">
        <h2 className="text-lg font-bold text-brand-700 flex items-center">
          <Package className="mr-2 h-6 w-6" />
          InventoryPro
        </h2>
      </div>
      <nav className="space-y-1 px-3 mt-6 flex-1">
        {links.map((link) => (
          <NavLink
            key={link.href}
            to={link.href}
            className={({ isActive }) =>
              cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                isActive
                  ? "bg-brand-100 text-brand-700"
                  : "text-gray-600 hover:bg-brand-50 hover:text-brand-700"
              )
            }
          >
            {link.icon}
            <span className="ml-3">{link.label}</span>
            <ChevronRight className="ml-auto h-4 w-4 opacity-50" />
          </NavLink>
        ))}
      </nav>
      <div className="px-3 py-4">
        <div className="px-3 py-3 rounded-md bg-brand-50">
          <p className="text-xs text-brand-700 font-medium">
            InventoryPro v1.0
          </p>
        </div>
      </div>
    </div>
  );
};

export function Sidebar() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="fixed top-4 left-4 z-40">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-white border-r border-gray-200">
      <SidebarContent />
    </div>
  );
}
