export interface Tab {
  path: string;
  title: string | undefined;
}

export interface TabsContextType {
  tabs: Tab[];
  activeTabIndex: number;
  setActiveTabIndex: (index: number) => void;
  addTab: (tab: Tab) => void;
  removeTab: (path: string) => void;
}
