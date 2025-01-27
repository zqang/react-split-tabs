"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { TabsProvider, useTabs } from "../contexts/TabContexts";
import "react-tabs/style/react-tabs.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import { ReactNode } from "react";
import Navbar from "@/components/Navbar";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TabsProvider>
          <AppLayout>{children}</AppLayout>
        </TabsProvider>
      </body>
    </html>
  );
}

const AppLayout = ({ children }: { children: ReactNode }) => {
  const { tabs, activeTabIndex, setActiveTabIndex, addTab, removeTab } =
    useTabs();
  const router = useRouter();
  const pathname = usePathname();

  // Add a tab whenever the route changes
  useEffect(() => {
    const pageTitle = pathname === "/" ? "Home" : pathname.split("/").pop();
    addTab({ title: pageTitle, path: pathname });
  }, [pathname]);

  const handleTabClick = (path: string, index: number) => {
    setActiveTabIndex(index); // Set the active tab index
    router.push(path);
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Tabs Navigation */}
      <Tabs
        selectedIndex={activeTabIndex}
        onSelect={(index) => {
          setActiveTabIndex(index);
          router.push(tabs[index]?.path); // Navigate to the selected tab
        }}
      >
        <TabList>
          {tabs.map((tab, index) => (
            <Tab key={tab.path}>
              <span
                onClick={() => handleTabClick(tab.path, index)}
                style={{ cursor: "pointer" }}
              >
                {tab.title}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeTab(tab.path);
                  router.push(tabs[0]?.path || "/"); // Navigate to the first tab or Home
                }}
                style={{ marginLeft: 10, color: "red", cursor: "pointer" }}
              >
                ✕
              </button>
            </Tab>
          ))}
        </TabList>

        {/* Tabs Content */}
        {tabs.map((tab) => (
          <TabPanel key={tab.path}>
            {tab.path === pathname && children}
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
};
