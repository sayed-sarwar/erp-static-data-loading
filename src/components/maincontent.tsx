import React from "react";
import TopBar from "./tobbar";
import TabNavigation from "./tabnavigation";
import Page from "@/page/page";
// import AccountsTable from "./AccountsTable";

const MainContent: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      <TopBar />
      <TabNavigation />
      <div className="flex-1 overflow-y-auto">
        <Page />
      </div>
    </div>
  );
};

export default MainContent;
