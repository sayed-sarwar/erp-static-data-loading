import AccordionList from "../components/data-display/accordion";
import CardItem from "../components/data-display/card";
// import DataTableDemo from "../components/data-display/datatable";
import Section from "../components/layout/section-component";
import SubNav from "./navigation/subnav";

const ComponentChecker = (props: any) => {
  const getContent = (viewType: string, data: any) => {
    switch (viewType) {
      case "Tab":
        return <SubNav data={data?.TabMenu} />;
      // case "Accordion":
      //   return <AccordionList item={data} />;
      // case "card":
      //   return <CardItem item={data} />;
      // case "table":
      //   return <DataTableDemo item={data} />;
      // case "section":
      //   return <Section item={data} />;

      default:
        return <div>Select a view type.</div>;
    }
  };
  console.log("ComponentChecker props:", props);
  return <div>{getContent(props.data.display, props.data)}</div>;
};

export default ComponentChecker;
