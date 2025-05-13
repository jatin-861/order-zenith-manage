
import React from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className={`${isMobile ? '' : 'md:pl-64'}`}>
        <Header />
        <main className="p-4 md:p-8 animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
}
