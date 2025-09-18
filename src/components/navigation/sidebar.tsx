import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  GitBranch,
  ShoppingCart,
  FileText,
  CreditCard,
  Banknote,
  Calculator,
  Receipt,
  DollarSign,
  ArrowLeftRight,
  MoreHorizontal,
  ChevronDown,
  ChevronRight,
  Menu,
} from "lucide-react";
import type { NavigationItem } from "../../types";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/app/store";
import { updateTemplateData } from "@/features/data/dataSlice";
import { setSelectedItem } from "@/features/data/dataSlice";
import data from "../../../data1.json";
import { useRef } from "react";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  onChartAccountsHover: (
    show: boolean,
    position?: { x: number; y: number }
  ) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggle,
  onChartAccountsHover,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const { jsonData } = useSelector(
    (state: RootState) => state.UserData || { jsonData: {} }
  );
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([]);
  const hoverTimeoutRef = useRef<number | null>(null);
  const hoverPositionRef = useRef<{ x: number; y: number } | null>(null);

  // Helper to create stable IDs based on available fields
  const createStableId = (item: any, prefix: string = "nav"): string => {
    const base = `${item.id || item.label || item.name || "item"}-${
      item.url || item.path || "nou"
    }`
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-_]/g, "");
    return `${prefix}-${base}`;
  };

  const applyStableIds = (items: any[]): NavigationItem[] => {
    const mapItem = (item: any): NavigationItem => {
      const withId: NavigationItem = {
        id: item.id || createStableId(item),
        label: item.label || item.name,
        icon: item.icon,
        isActive: item.isActive || false,
        isExpanded: item.isExpanded || false,
        url: item.url,
        children: item.children
          ? item.children.map((c: any) => mapItem(c))
          : undefined,
        page: item.page,
      };
      return withId;
    };
    return items.map(mapItem);
  };

  // Function to find and expand menus based on current route
  const expandMenusForCurrentRoute = (
    items: NavigationItem[]
  ): NavigationItem[] => {
    const currentPath = location.pathname;
    console.log("Current path:", currentPath);

    const expandItem = (item: NavigationItem): NavigationItem => {
      let shouldExpand = false;
      let isItemActive = false;

      // Check if current item matches the route
      if (item.url === currentPath) {
        isItemActive = true;
      }

      // Check children recursively
      let updatedChildren: NavigationItem[] = [];
      if (item.children) {
        updatedChildren = item.children.map((child) => {
          const updatedChild = expandItem(child);
          if (updatedChild.isActive || updatedChild.isExpanded) {
            shouldExpand = true;
          }
          return updatedChild;
        });
      }

      return {
        ...item,
        isActive: isItemActive,
        isExpanded: shouldExpand || item.isExpanded,
        children: updatedChildren.length > 0 ? updatedChildren : item.children,
      };
    };

    return items.map(expandItem);
  };

  // Update navigation items when jsonData changes
  useEffect(() => {
    // console.log("Sidebar jsonData:", jsonData);
    let rawItems: NavigationItem[] = [];

    if (jsonData && (jsonData as any).navigation) {
      // console.log("Setting navigation items:", (jsonData as any).navigation);
      rawItems = applyStableIds((jsonData as any).navigation);
    } else if (jsonData && (jsonData as any).children) {
      // Fallback for old data structure
      console.log("Using children fallback:", (jsonData as any).children);
      rawItems = applyStableIds((jsonData as any).children);
    } else if (data && data.navigation) {
      // Direct fallback to imported data - transform to match NavigationItem interface
      console.log("Using direct data fallback:", data.navigation);

      // Recursive function to transform nested data
      const transformItem = (item: any): NavigationItem => ({
        id: item.id || createStableId(item),
        label: item.label || item.name,
        icon: item.icon,
        isActive: item.isActive || false,
        isExpanded: item.isExpanded || false,
        url: item.url,
        children: item.children?.map((child: any) => transformItem(child)),
        page: item.page,
      });

      // Handle the "All Apps" wrapper structure - extract children from navigation
      rawItems = data.navigation.flatMap((navItem: any) =>
        navItem.children
          ? navItem.children.map((child: any) => transformItem(child))
          : []
      );
    }

    // Apply route-based expansion
    const expandedItems = expandMenusForCurrentRoute(rawItems);
    setNavigationItems(expandedItems);
  }, [jsonData, location.pathname]);

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: React.ReactElement } = {
      Home: <Home size={20} />,
      GitBranch: <GitBranch size={20} />,
      ShoppingCart: <ShoppingCart size={20} />,
      FileText: <FileText size={20} />,
      CreditCard: <CreditCard size={20} />,
      Banknote: <Banknote size={20} />,
      Calculator: <Calculator size={20} />,
      Receipt: <Receipt size={20} />,
      DollarSign: <DollarSign size={20} />,
      ArrowLeftRight: <ArrowLeftRight size={20} />,
      MoreHorizontal: <MoreHorizontal size={20} />,
    };
    return icons[iconName] || <Home size={20} />;
  };

  const toggleExpanded = (itemId: string) => {
    const toggleItem = (items: NavigationItem[]): NavigationItem[] => {
      return items.map((item) => {
        if (item.id === itemId) {
          return { ...item, isExpanded: !item.isExpanded };
        }
        if (item.children) {
          return { ...item, children: toggleItem(item.children) };
        }
        return item;
      });
    };

    setNavigationItems((items) => toggleItem(items));
  };

  const setActive = (itemId: string, itemData?: any) => {
    const setActiveItem = (items: NavigationItem[]): NavigationItem[] => {
      return items.map((item) => {
        if (item.id === itemId) {
          return { ...item, isActive: true };
        }
        if (item.children) {
          return {
            ...item,
            isActive: false,
            children: setActiveItem(item.children),
          };
        }
        return { ...item, isActive: false };
      });
    };

    setNavigationItems((items) => setActiveItem(items));

    // Update Redux state and navigate
    if (itemData) {
      dispatch(updateTemplateData(itemData));

      // Try to find URL from the item data
      const url = itemData.url || itemData.path;
      if (url) {
        navigate(url);
      }
    }
  };

  const handleChartAccountsHover = (event: React.MouseEvent, show: boolean) => {
    if (show) {
      const rect = event.currentTarget.getBoundingClientRect();
      onChartAccountsHover(true, { x: rect.right + 10, y: rect.top });
    } else {
      onChartAccountsHover(false);
    }
  };

  // Recursive function to render nested menu items
  const renderMenuItem = (
    item: NavigationItem,
    level: number = 0
  ): React.ReactNode => {
    const hasTreeChildren = item.children && item.children.length > 0;
    const hasPageChildren = Array.isArray(item.page) && item.page.length > 0;
    const hasChildren = hasTreeChildren || hasPageChildren;
    const paddingLeft = level * 24; // 24px indentation per level

    return (
      <div key={item.id}>
        <div
          className={`mx-2 mb-1 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 flex items-center justify-between group ${
            item.isActive
              ? "bg-green-50 text-[var(--color-bg)] border border-[var(--color-bg)]"
              : "hover:bg-gray-100 text-gray-700"
          }`}
          style={{ paddingLeft: `${12 + paddingLeft}px` }}
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(item.id);
              if (hasPageChildren) {
                // dispatch page array to redux for submenu consumption
                if (Array.isArray(item.page)) {
                  dispatch(
                    updateTemplateData(
                      item.page.map((p: any) => ({
                        ...p,
                        url:
                          typeof p.url === "string" &&
                          !p.url.startsWith("/") &&
                          item.url
                            ? `${item.url.replace(/\/$/, "")}/${p.url.replace(
                                /^\//,
                                ""
                              )}`
                            : p.url,
                      }))
                    )
                  );
                }
                // clear selected item until a submenu/tab is chosen
                dispatch(setSelectedItem(undefined));
              }
            } else {
              setActive(item.id, item);
              dispatch(setSelectedItem(item));
            }
          }}
          onMouseEnter={(e) => {
            if (hasPageChildren) {
              // schedule delayed submenu show
              const rect = (
                e.currentTarget as HTMLElement
              ).getBoundingClientRect();
              hoverPositionRef.current = { x: rect.right + 10, y: rect.top };
              if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current);
              }
              hoverTimeoutRef.current = window.setTimeout(() => {
                dispatch(updateTemplateData(item.page));
                dispatch(setSelectedItem(undefined));
                if (hoverPositionRef.current) {
                  onChartAccountsHover(true, hoverPositionRef.current);
                }
              }, 300);
            }
          }}
          onMouseLeave={(e) => {
            if (hasPageChildren) {
              if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current);
                hoverTimeoutRef.current = null;
              }
              onChartAccountsHover(false);
            }
          }}
        >
          <div className="flex items-center space-x-3">
            <div
              className={`${
                item.isActive ? "text-[var(color-bg)]" : "text-gray-500"
              }`}
            >
              {getIcon(item.icon)}
            </div>
            {!isCollapsed && <span className="font-medium">{item.label}</span>}
          </div>

          {!isCollapsed && hasChildren && (
            <div>
              {item.isExpanded ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </div>
          )}
        </div>

        {!isCollapsed && hasTreeChildren && item.isExpanded && (
          <div className="mt-1 mb-2">
            {item.children!.map((child: NavigationItem) =>
              renderMenuItem(child, level + 1)
            )}
          </div>
        )}
      </div>
    );
  };
  return (
    <div
      className={`bg-white border-r border-gray-200 transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      } flex flex-col h-full`}
    >
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[var(--color-bg)] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="font-semibold text-gray-900">Mukut</span>
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-2 hover:[var(color-bg)] rounded-lg transition-colors"
        >
          <Menu size={18} />
        </button>
      </div>

      <nav className="flex-1 py-4">
        {navigationItems.map((item) => (
          <React.Fragment key={item.id}>{renderMenuItem(item)}</React.Fragment>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
