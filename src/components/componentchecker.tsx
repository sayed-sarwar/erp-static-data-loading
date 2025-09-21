import AccordionList from "../components/data-display/accordion";
import SectionComponent from "../components/layout/section-component";
import SubNav from "./navigation/subnav";

const ComponentChecker = (props: any) => {
  const getContent = (viewType: string, data: any) => {
    switch (viewType) {
      case "Tab":
        return <SubNav data={data?.TabMenu} />;
      case "Accordion":
        return <AccordionList item={data} />;
      case "section":
        return <SectionComponent data={data} />;
      default:
        return (
          <div className="p-6 bg-gray-50 rounded-lg">
            <p className="text-gray-500">Unknown view type: {viewType}</p>
            <p className="text-sm text-gray-400 mt-2">Available types: Tab, Accordion, section</p>
          </div>
        );
    }
  };
  
  return <div>{getContent(props.data.display, props.data)}</div>;
};

export default ComponentChecker;
