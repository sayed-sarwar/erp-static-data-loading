import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/app/store";
import { fetchData } from "@/features/data/dataSlice";
import SubNav from "@/components/navigation/subnav";
import DataRenderer from "@/components/data-display/data-renderer";
import Sub from "../../sub.json";

interface PageProps {
  menuItem?: any;
}

const Page = ({ menuItem }: PageProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedItem } = useSelector(
    (state: RootState) => (state as any).UserData || { selectedItem: undefined }
  );

  useEffect(() => {
    dispatch(fetchData() as any);
  }, [dispatch]);

  return (
    <div>
      {selectedItem && (
        <div className="mt-4">
          {/* Special handling for journal entry with sub-navigation */}
          {selectedItem &&
            selectedItem.url.includes("/accounting/journal-entry") && (
              <div>
                <SubNav data={Sub?.TabMenu} />
                <div className="px-6 py-4">
                  <DataRenderer selectedItem={selectedItem} />
                </div>
              </div>
            )}

          {/* Default data rendering for all other pages */}
          {selectedItem &&
            !selectedItem.url.includes("/accounting/journal-entry") && (
              <div className="px-6 py-4">
                <DataRenderer selectedItem={selectedItem} />
              </div>
            )}
        </div>
      )}

      {!selectedItem ? (
        <div className="mt-4 p-6 bg-blue-50 rounded-lg">
          <p>
            Welcome to the ERP System. Click on menu items in the sidebar to load their data and functionality.
          </p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded shadow">
              <h3 className="font-semibold">Accounting</h3>
              <p className="text-sm text-gray-600">Manage your financial data</p>
            </div>
            <div className="p-4 bg-white rounded shadow">
              <h3 className="font-semibold">HR</h3>
              <p className="text-sm text-gray-600">Employee management</p>
            </div>
            <div className="p-4 bg-white rounded shadow">
              <h3 className="font-semibold">CRM</h3>
              <p className="text-sm text-gray-600">Customer relationship management</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Page;
