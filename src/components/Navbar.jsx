import React from "react";
import { useTheme } from "../context/useTheme.js";

/**
 * Navbar with theme toggle (uses useContext)
 */
const Navbar = () => {
  const { theme, toggle } = useTheme();

  return (
    <nav className="bg-white dark:bg-gray-900 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-3">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              PLP Task Manager
            </div>
            <div className="hidden sm:block text-sm text-gray-600 dark:text-gray-300">
              Build: Tasks · API · Tailwind
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggle}
              className="px-3 py-2 rounded bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
