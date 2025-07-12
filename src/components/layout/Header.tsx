import { useState } from "react";
import { Bell, Sparkles, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TopNavBar() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", path: "", clickable: false },
    { label: "Pumps", path: "/pumps", clickable: true },
    { label: "Reports", path: "", clickable: false },
    { label: "Alerts", path: "", clickable: false }
  ];

  return (
    <div className="relative flex justify-between items-center px-6 py-3 border-b bg-white shadow-sm">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-black" />
          <span className="font-semibold text-lg">PumpMaster</span>
        </div>
        <div className="hidden md:flex gap-6">
          {navItems.map((item) =>
            item.clickable ? (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className="text-sm font-medium text-gray-800 hover:text-black"
              >
                {item.label}
              </button>
            ) : (
              <span
                key={item.label}
                className="text-sm font-medium text-gray-400 cursor-not-allowed"
              >
                {item.label}
              </span>
            )
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Search for md+ */}
        <input
          type="text"
          placeholder="Search"
          className="hidden md:block px-3 py-1.5 border rounded-lg text-sm bg-gray-100 placeholder-gray-400"
        />

        {/* Notification */}
        <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
          <Bell className="w-5 h-5 text-gray-700" />
        </div>

        {/* Profile */}
        <div className="w-9 h-9 rounded-full bg-black text-white text-xs flex items-center justify-center">
          SC
        </div>

        {/* Hamburger */}
        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-t mt-2 shadow-md md:hidden px-6 py-3">
          {navItems.map((item) =>
            item.clickable ? (
              <button
                key={item.label}
                onClick={() => {
                  navigate(item.path);
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left py-2 text-sm font-medium text-gray-800 hover:text-black"
              >
                {item.label}
              </button>
            ) : (
              <span
                key={item.label}
                className="block w-full py-2 text-sm font-medium text-gray-400 cursor-not-allowed"
              >
                {item.label}
              </span>
            )
          )}
        </div>
      )}
    </div>
  );
}
