export interface Tab {
  path: string;
  title: string | undefined;
}

export interface PaneType {
  id: string;
  tabs: Tab[];
  activeTabIndex: number;
  setActiveTabIndex: (index: number) => void;
}

export type LayoutType = "single" | "two" | "four";
export type TabPane = "left" | "right";

export interface RouteConfig {
  path: string;
  title: string;
  component: React.ComponentType;
}

export type TabsContextType = {
  openTabs: Record<TabPane, Tab[]>;
  activeTabs: Record<TabPane, string | null>;
  activePane: TabPane;
  routes: Record<string, RouteConfig>;
  setActivePane: (pane: TabPane) => void;
  setActiveTab: (pane: TabPane, path: string) => void;
  addTab: (pane: TabPane, path: string) => void;
  removeTab: (pane: TabPane, path: string) => void;
};
