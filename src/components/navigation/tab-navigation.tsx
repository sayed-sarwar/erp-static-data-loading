import React, { useMemo, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/app/store";
import { useNavigate, useLocation } from "react-router-dom";
import { setSelectedItem } from "@/features/data/dataSlice";

const TabNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const selected = useSelector(
    (state: RootState) => state.UserData.selectedTemplatedata
  );

  const tabs = useMemo(() => {
    return Array.isArray(selected) ? selected : [];
  }, [selected]);

  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    // Set active tab based on current route or default first tab
    const matchByUrl = tabs.find((t: any) => t.url === location.pathname);
    if (matchByUrl) {
      setActiveId(matchByUrl.id);
    } else if (tabs.length > 0) {
      setActiveId(tabs[0].id);
    } else {
      setActiveId(null);
    }
  }, [tabs, location.pathname]);

  return (
    <div className="border-b border-gray-200">
      <nav className="flex space-x-8 px-6">
        {tabs.map((tab: any) => {
          const isActive = activeId === tab.id;
          return (
            <button
              key={tab.id}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                isActive
                  ? "border-[#03A459] text-[#03A459]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => {
                setActiveId(tab.id);
                dispatch(setSelectedItem(tab));
                if (tab.url) {
                  navigate(tab.url);
                }
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default TabNavigation;
