import React, { useMemo, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/app/store";
import { useNavigate, useLocation } from "react-router-dom";

const SubNav: React.FC = (props: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const [activeId, setActiveId] = useState<string | null>(null);

  // Sync active tab with current URL
  useEffect(() => {
    if (Array.isArray(props?.data)) {
      const current = props.data.find(
        (tab: any) => tab?.url === location.pathname
      );
      if (current?.id) {
        setActiveId(current.id);
      }
    }
  }, [location.pathname, props?.data]);

  return (
    <div className="border-b border-gray-200">
      <nav className="flex space-x-8 px-6">
        {props?.data?.map((tab: any) => {
          const isActive = activeId === tab.id;
          // console.log("SubNav tab:", tab);
          return (
            <button
              key={tab.id}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                isActive
                  ? "border-[var(--color-bg)] text-[var(--color-bg)]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => {
                // setActiveId(tab.id);
                //
                // Keep both selections updated for Page/SubPage consumers
                // dispatch(updateTemplateData(tab));
                // dispatch(setSelectedItem(tab));

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

export default SubNav;
