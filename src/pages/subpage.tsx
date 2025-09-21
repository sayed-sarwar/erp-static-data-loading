import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/app/store";
import { fetchData } from "@/features/data/dataSlice";
import DataRenderer from "@/components/data-display/data-renderer";

const SubPage = (props: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedTemplatedata, selectedItem, value, status } = useSelector(
    (state: RootState) =>
      state.UserData || { selectedTemplatedata: {}, selectedItem: undefined, value: [], status: "idle" }
  );

  useEffect(() => {
    dispatch(fetchData() as any);
  }, [dispatch]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {selectedItem?.label || "Sub Page"}
        </h2>
        {selectedItem?.description && (
          <p className="text-gray-600 mt-2">{selectedItem.description}</p>
        )}
      </div>
      
      <DataRenderer selectedItem={selectedItem} />
      
      {status === 'loading' && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-bg)]"></div>
        </div>
      )}
      
      {status === 'failed' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">Failed to load data. Please try again.</p>
        </div>
      )}
    </div>
  );
};

export default SubPage;
