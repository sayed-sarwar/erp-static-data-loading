import React from "react";
import { Search, Bell, User, Settings, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import { setTheme } from "@/features/theme/themeSlice";

const TopBar: React.FC = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(
    (state: RootState) => state.theme.currentTheme
  );

  const themes = ["accessible", "comfort", "compact", "default", "tight"];

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">
            XYZ Builders · Haripool Branch
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#03A459] focus:border-transparent"
            />
          </div>

          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings size={20} className="text-gray-600" />
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Palette className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Choose Theme</DropdownMenuLabel>
              {themes.map((theme) => (
                <DropdownMenuItem
                  key={theme}
                  onClick={() => dispatch(setTheme(theme))}
                  className={currentTheme === theme ? "bg-accent" : ""}
                >
                  {theme.charAt(0).toUpperCase() + theme.slice(1)}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex items-center space-x-2 pl-4 border-l border-gray-200">
            <div className="w-8 h-8 bg-[#03A459] rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">
                Henry Cooper
              </div>
              <div className="text-xs text-gray-500">Accounts Manager</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
