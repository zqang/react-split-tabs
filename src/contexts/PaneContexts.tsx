"use client";
import AboutPage from "@/app/about/page";
import ContactPage from "@/app/contact/page";
import App from "@/app/page";
import { RouteConfig, Tab, TabPane, TabsContextType } from "@/types";
import { createContext, useContext, useState } from "react";

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export const TabsProvider = ({ children }: { children: React.ReactNode }) => {
  // Create a route configuration
  const routesConfig: Record<string, RouteConfig> = {
    home: {
      path: "/",
      title: "Home",
      component: App,
    },
    about: {
      path: "/about",
      title: "About",
      component: AboutPage,
    },
    settings: {
      path: "/settings",
      title: "Settings",
      component: ContactPage,
    },
  };
  const [openTabs, setOpenTabs] = useState<Record<TabPane, Tab[]>>({
    left: [],
    right: [],
  });
  const [activeTabs, setActiveTabs] = useState<Record<TabPane, string | null>>({
    left: null,
    right: null,
  });
  const [activePane, setActivePane] = useState<TabPane>("left");

  const addTab = (pane: TabPane, path: string) => {
    const route = Object.values(routesConfig).find((r) => r.path === path);
    if (!route) return;

    setOpenTabs((prev) => {
      const exists = prev[pane].some((t) => t.path === path);
      if (exists) return prev;

      return {
        ...prev,
        [pane]: [...prev[pane], { path, title: route.title }],
      };
    });

    setActiveTabs((prev) => ({
      ...prev,
      [pane]: path,
    }));
  };

  const removeTab = (pane: TabPane, path: string) => {
    setOpenTabs((prev) => ({
      ...prev,
      [pane]: prev[pane].filter((p) => p.path !== path),
    }));

    setActiveTabs((prev) => {
      if (prev[pane] === path) {
        // Find new active path if removing current active
        const remaining = openTabs[pane].filter((p) => p.path !== path);
        return {
          ...prev,
          [pane]: remaining.length > 0 ? remaining[0] : null,
        };
      }
      return prev;
    });
  };

  const setActiveTab = (pane: TabPane, path: string) => {
    setActiveTabs((prev) => ({
      ...prev,
      [pane]: path,
    }));
  };

  return (
    <TabsContext.Provider
      value={{
        openTabs,
        activeTabs,
        activePane,
        routes: routesConfig,
        setActivePane,
        setActiveTab,
        addTab,
        removeTab,
      }}
    >
      {children}
    </TabsContext.Provider>
  );
};

export const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("useTabs must be used within a LayoutProvider");
  }
  return context;
};
