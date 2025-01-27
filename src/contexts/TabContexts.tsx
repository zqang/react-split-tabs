"use client";

import { createContext, useContext, useState } from "react";

interface Tab {
  path: string;
  title: string | undefined;
}

interface TabsContextType {
  tabs: Tab[];
  activeTabIndex: number;
  setActiveTabIndex: (index: number) => void;
  addTab: (tab: Tab) => void;
  removeTab: (path: string) => void;
}

const TabsContext = createContext<TabsContextType>({
  tabs: [],
  activeTabIndex: 0,
  setActiveTabIndex: () => {},
  addTab: () => {},
  removeTab: () => {},
});

import { ReactNode } from "react";

export const TabsProvider = ({ children }: { children: ReactNode }) => {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const addTab = (tab: Tab) => {
    // Prevent duplicate tabs
    const existingIndex = tabs.findIndex((t) => t.path === tab.path);
    if (existingIndex === -1) {
      setTabs([...tabs, tab]);
      setActiveTabIndex(tabs.length); // Focus on the new tab
    } else {
      setActiveTabIndex(existingIndex); // Focus on existing tab
    }
  };

  const removeTab = (path: string) => {
    const updatedTabs = tabs.filter((t) => t.path !== path);
    setTabs(updatedTabs);

    // Adjust active tab index if necessary
    if (tabs[activeTabIndex]?.path === path) {
      setActiveTabIndex(0); // Default to first tab or handle fallback
    }
  };

  return (
    <TabsContext.Provider
      value={{ tabs, activeTabIndex, setActiveTabIndex, addTab, removeTab }}
    >
      {children}
    </TabsContext.Provider>
  );
};

export const useTabs = () => useContext(TabsContext);
