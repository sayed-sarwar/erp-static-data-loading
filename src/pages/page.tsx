import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/app/store";
import { fetchData } from "@/features/data/dataSlice";
import data from "../../data.json";
import SectionComponent from "@/components/layout/section-component";
interface PageProps {
  menuItem?: any;
}

const Page = ({ menuItem }: PageProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedItem } = useSelector(
    (state: RootState) => (state as any).UserData || { selectedItem: undefined }
  );

  useEffect(() => {
    // Make API call when component mounts
    dispatch(fetchData() as any);
  }, [dispatch]);

  return (
    <div>
      {/* <h2>{selectedItem?.url || "Generic Page"}</h2> */}

      {/* {menuItem?.description && (
        <p className="mb-4 text-gray-600">{menuItem.description}</p>
      )}

      {menuItem?.data && (
        <div className="mb-4">
          <h3>Page Data:</h3>
          <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto max-h-60">
            {JSON.stringify(menuItem.data, null, 2)}
          </pre>
        </div>
      )} */}

      {selectedItem && (
        <div className="mt-4">
          {/* <h3 className="font-semibold mb-2">Selected Item</h3> */}
          {/* <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
            {JSON.stringify(selectedItem, null, 2)}
          </pre> */}
          {selectedItem &&
            selectedItem.url.includes("/accounting/chart-of-accounts") &&
            data &&
            data.map &&
            data.map((item) => (
              <div className="mb-6 p-6">
                <h4 className="font-semibold">{item.name}</h4>
                <SectionComponent data={item} />
              </div>
            ))}
          {/* {selectedItem &&
            !selectedItem.url.includes("/accounting/chart-of-accounts") && (
              <SectionComponent data={data} />
            )} */}
        </div>
      )}

      {!selectedItem ? (
        <div className="mt-4 p-4 bg-blue-50 rounded">
          <p>
            This page is ready for content. Click on menu items to load their
            data.
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default Page;
