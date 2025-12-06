import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import LeftSidebar from "../sidebar/LeftSidebar";
import { Menu, X } from "lucide-react";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // prevent body scroll when sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [sidebarOpen]);

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar for desktop */}
      <aside className="hidden md:flex md:flex-col w-64 bg-white border-r border-gray-200">
        <LeftSidebar />
      </aside>

      {/* Mobile sidebar (slide-in) */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        aria-hidden={!sidebarOpen}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setSidebarOpen(false)}
        />

        {/* Slide-in panel */}
        <div
          className={`absolute left-0 top-0 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <h2 className="text-lg font-semibold">Menu</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
              className="p-2 text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <LeftSidebar />
        </div>
      </div>

      {/* Main content wrapper */}
      <div className="flex flex-1 flex-col">

        {/* Topbar mobile */}
        <header className="md:hidden flex items-center p-4 bg-white border-b border-gray-200 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
            className="text-gray-700"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="ml-4 text-lg font-bold">Dashboard</h1>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
