import React from "react";
import {
  FileText,
  Calculator,
  TrendingUp,
  BarChart3,
  PieChart,
  Settings,
  Home,
  GitBranch,
  ShoppingCart,
  CreditCard,
  Banknote,
  Receipt,
  DollarSign,
  ArrowLeftRight,
  MoreHorizontal,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/app/store";
import { useNavigate } from "react-router-dom";
import { setSelectedItem } from "@/features/data/dataSlice";

interface submenuProps {
  isVisible: boolean;
  position: { x: number; y: number };
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const iconMap: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
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
  Settings,
  BarChart3,
  TrendingUp,
  PieChart,
};

const Submenu: React.FC<submenuProps> = ({
  isVisible,
  position,
  onMouseEnter,
  onMouseLeave,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const selected = useSelector(
    (state: RootState) => state.UserData.selectedTemplatedata
  );
  const submenuItems: any[] = Array.isArray(selected) ? selected : [];
  console.log("Submenu Items:", submenuItems);
  if (!isVisible) return null;
  return (
    <div
      className="fixed bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50 min-w-48"
      style={{
        left: position.x,
        top: position.y,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {submenuItems.map((item: any) => {
        const IconComp =
          item.icon && iconMap[item.icon] ? iconMap[item.icon] : FileText;
        return (
          <div
            key={item.id}
            className="px-4 py-2 hover:bg-green-50 hover:text-[#03A459] cursor-pointer transition-colors flex items-center space-x-3"
            onClick={() => {
              // Only set selected item; keep tabs array intact
              dispatch(setSelectedItem(item));
              if (item.url) {
                navigate(item.url);
              }
            }}
          >
            <IconComp size={16} className="text-gray-400" />
            <span className="text-sm font-medium">{item.label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Submenu;
