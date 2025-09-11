import Tab from "@/component/tab";
// import TemplateMatching from "./templates";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";

const TemplateLayout = () => {
  const { selectedTemplatedata } = useSelector(
    (state: RootState) => state.UserData || { selectedTemplatedata: {} }
  );
  console.log(selectedTemplatedata);
  return (
    <div className="custom-lay">
      <div className="content">
        <Tab tabData={selectedTemplatedata} />
      </div>
    </div>
  );
};

export default TemplateLayout;
