import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/app/store";
import { fetchData } from "@/features/data/dataSlice";
import data from "../../data.json";
import Sub from "../../sub.json";
import SectionComponent from "@/components/layout/section-component";
import SubPage from "./subpage";
import ComponentChecker from "@/components/componentchecker";
import SubNav from "@/components/navigation/subnav";
import SubTabs from "@/components/navigation/subtab";
import Navdata from "@/components/navdata";

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

          {selectedItem &&
            selectedItem.url.includes("/accounting/journal-entry") && (
              <div>
                <SubNav data={Sub?.TabMenu} />
                <Navdata />
                {/* <div className="px-6 py-4">{<SubPage />}</div> */}
              </div>
            )}

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
