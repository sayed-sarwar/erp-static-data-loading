export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  isActive?: boolean;
  children?: NavigationItem[];
  isExpanded?: boolean;
  url?: string;
  page?: Array<{
    id: string;
    label: string;
    icon?: string;
    isActive?: boolean;
    url?: string;
  }>;
}

export interface TabItem {
  id: string;
  label: string;
  isActive?: boolean;
}
