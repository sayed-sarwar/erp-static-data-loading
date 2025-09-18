import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/app/store";
import { fetchData } from "@/features/data/dataSlice";
// import { TabNavigation } from "@/components";

const SubPage = (props: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedTemplatedata, value, status } = useSelector(
    (state: RootState) =>
      state.UserData || { selectedTemplatedata: {}, value: [], status: "idle" }
  );

  useEffect(() => {
    // Make API call when component mounts
    dispatch(fetchData() as any);
  }, [dispatch]);
  console.log("SubPage props:", props);
  console.log("SubPage selectedTemplatedata:", selectedTemplatedata);
  return (
    <div>
      {/* <TabNavigation /> */}
      <h2>
        {"Sub Page"}|| {JSON.stringify(selectedTemplatedata)}
      </h2>
    </div>
  );
};

export default SubPage;
