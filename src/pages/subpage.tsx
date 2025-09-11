import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/app/store";
import { fetchData } from "@/features/data/dataSlice";

interface SubPageProps {
  menuItem?: any;
}

const SubPage = ({ menuItem }: SubPageProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedTemplatedata, value, status } = useSelector(
    (state: RootState) =>
      state.UserData || { selectedTemplatedata: {}, value: [], status: "idle" }
  );

  useEffect(() => {
    // Make API call when component mounts
    dispatch(fetchData() as any);
  }, [dispatch]);

  return (
    <div>
      <h2>{menuItem?.name || "Generic SubPage"}</h2>

      {menuItem?.description && (
        <p className="mb-4 text-gray-600">{menuItem.description}</p>
      )}

      {menuItem?.data && (
        <div className="mb-4">
          <h3>SubPage Data:</h3>
          <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto max-h-60">
            {JSON.stringify(menuItem.data, null, 2)}
          </pre>
        </div>
      )}

      {/* {selectedTemplatedata && Object.keys(selectedTemplatedata).length > 0 && (
        <Componentchecker data={selectedTemplatedata} />
      )} */}

      {!selectedTemplatedata ||
      Object.keys(selectedTemplatedata).length === 0 ? (
        <div className="mt-4 p-4 bg-blue-50 rounded">
          <p>
            This Subpage is ready for content. Click on menu items to load their
            data.
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default SubPage;
