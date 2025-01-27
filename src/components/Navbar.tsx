"use client";

import { useTabs } from "@/contexts/PaneContexts";
import "react-tabs/style/react-tabs.css";

const Navbar = () => {
  const { activePane, addTab, routes } = useTabs();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex space-x-4">
        {Object.values(routes).map((route) => (
          <button
            key={route.path}
            className="text-white hover:bg-gray-700 px-3 py-2 rounded"
            onClick={() => addTab(activePane, route.path)}
          >
            {route.title}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
