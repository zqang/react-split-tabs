"use client";

import { TabsProvider, useTabs } from "../contexts/PaneContexts";
import "react-tabs/style/react-tabs.css";
import Navbar from "@/components/Navbar";
import Split from "react-split";
import "./globals.css";

export default function RootLayout() {
  return (
    <html lang="en">
      <body>
        <TabsProvider>
          <AppLayout />
        </TabsProvider>
      </body>
    </html>
  );
}

export const AppLayout = () => {
  const {
    openTabs,
    activeTabs,
    activePane,
    setActivePane,
    setActiveTab,
    removeTab,
    routes,
  } = useTabs();

  const getComponentForPath = (path: string) => {
    const route = Object.values(routes).find((r) => r.path === path);
    return route ? <route.component /> : <div>404 - Not Found</div>;
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-1 overflow-hidden">
        <Split className=" split bg-yellow-600" gutterSize={10}>
          {/* Left Pane */}
          <div
            className="h-full overflow-hidden w-[50%] bg-red-800"
            onClick={() => setActivePane("left")}
          >
            <div
              className={`h-full flex flex-col border-2 ${
                activePane === "left" ? "border-blue-500" : "border-transparent"
              }`}
            >
              <div className="flex gap-2 mb-4">
                {openTabs.left.map((tab) => (
                  <div
                    key={tab.path}
                    className={`p-2 cursor-pointer ${
                      activeTabs.left === tab.path
                        ? "bg-blue-500 text-white"
                        : "bg-white text-slate-600 "
                    }`}
                    onClick={() => setActiveTab("left", tab.path)}
                  >
                    {tab.title}
                    <button
                      className="ml-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeTab("left", tab.path);
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <div className="bg-white p-4 text-slate-800">
                {activeTabs.left && getComponentForPath(activeTabs.left)}
              </div>
            </div>
          </div>

          {/* Right Pane */}
          <div
            className="h-full overflow-hidden"
            onClick={() => setActivePane("right")}
          >
            <div
              className={`h-full flex flex-col border-2 ${
                activePane === "right"
                  ? "border-blue-500"
                  : "border-transparent"
              }`}
            >
              <div className="flex gap-2 mb-4">
                {openTabs.right.map((tab) => (
                  <div
                    key={tab.path}
                    className={`p-2 cursor-pointer ${
                      activeTabs.right === tab.path
                        ? "bg-blue-500 text-white"
                        : "bg-white text-slate-600 "
                    }`}
                    onClick={() => setActiveTab("right", tab.path)}
                  >
                    {tab.title}
                    <button
                      className="ml-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeTab("right", tab.path);
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <div className="bg-white p-4 text-slate-800">
                {activeTabs.right && getComponentForPath(activeTabs.right)}
              </div>
            </div>
          </div>
        </Split>
      </div>
    </div>
  );
};
