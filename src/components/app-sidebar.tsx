import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuAction,
} from "@/components/ui/sidebar";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Adjust the path as needed
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../app/store";
import { updateTemplateData } from "../feature/data/dataSlice";
import { MoreHorizontal } from "lucide-react";

// Define the type for menu items
interface MenuItem {
  submenu: MenuItem[] | undefined;
  name: string;
  path?: string;
  iconLink?: string;
  icon?: boolean;
  hasChildren?: boolean;
  children?: MenuItem[];
  item?: MenuItem[];
}

// Arrow icon component
const ArrowIcon = ({ isExpanded }: { isExpanded: boolean }) => (
  <svg
    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
      isExpanded ? "rotate-180" : ""
    }`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

export function AppSidebar() {
  const dispatch = useDispatch<AppDispatch>();
  const { jsonData } = useSelector(
    (state: RootState) => state.UserData || { jsonData: {} }
  );
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [activeItem, setActiveItem] = useState<string | null>(null); // Track the active item

  // Toggle expanded state for an item
  const toggleExpanded = (itemName: string, item: MenuItem) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemName)) {
      newExpanded.delete(itemName);
    } else {
      newExpanded.add(itemName);
    }
    console.log("Toggled item:", newExpanded);
    setExpandedItems(newExpanded);
  };

  const handleclickitem = (item: MenuItem) => {
    setActiveItem(item.name); // Set the clicked item as active
    dispatch(updateTemplateData(item));
  };

  // Render main app items with collapsible functionality
  const renderAppItem = (item: MenuItem) => {
    const isExpanded = expandedItems.has(item.name);
    // Support both children and submenu arrays
    const hasChildren =
      (item.children && item.children.length > 0) ||
      (item.submenu && item.submenu.length > 0);

    // Get submenu or children
    const subItems = item.children ?? item.submenu;

    return (
      <div key={item.name} className="mb-1">
        <div
          className={`flex ct-padding items-center justify-between rounded cursor-pointer transition-colors duration-150 ${
            activeItem === item.name ? "bg-gray-200" : ""
          }`}
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(item.name, item);
            } else {
              handleclickitem(item);
            }
          }}
        >
          <div className="flex items-center f-size">
            {item.icon && <i className={`${item.iconLink} text-gray-600`}></i>}
            <span className="text-sm font-medium text-gray-700">
              {item.name}
            </span>
          </div>
          {hasChildren && <ArrowIcon isExpanded={isExpanded} />}
        </div>

        {/* Recursive collapse for children/submenu */}
        {isExpanded && hasChildren && (
          <div className="custom-cl-menu">
            {subItems!.map((child: MenuItem) => renderAppItem(child))}
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction>
                  <MoreHorizontal />
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right" align="start">
                <DropdownMenuItem>
                  <span>Edit Project</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Delete Project</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
          </div>
        )}
      </div>
    );
  };

  // Type guard to check if jsonData has the expected structure
  const hasValidStructure = (data: any): data is { children: MenuItem[] } => {
    return data && typeof data === "object" && Array.isArray(data.children);
  };

  return (
    <Sidebar className="fixed bottom-0">
      <SidebarHeader>
        <h1 className="text-xl font-bold text-gray-800">Mukut</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {hasValidStructure(jsonData) ? (
            <div>
              {jsonData.children.map((item: MenuItem) => renderAppItem(item))}
            </div>
          ) : (
            <div className="py-4 px-3 text-gray-500 text-sm">
              No menu items available
            </div>
          )}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
