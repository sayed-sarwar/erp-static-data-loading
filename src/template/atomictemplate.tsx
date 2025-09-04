import AccordionList from "@/componentdynamic/accordion";
import CardItem from "@/component/card";
import DataTableDemo from "@/components/datatable";
import { Section } from "@/componentdynamic/section";

const TemplateChecker = (props: any) => {
  const getContent = (viewType: string, data: any) => {
    switch (viewType) {
      case "Accordion":
        return <AccordionList item={data} />;
      case "card":
        return <CardItem item={data} />;
      case "table":
        return <DataTableDemo item={data} />;
      case "section":
        return <Section item={data} />;
      default:
        return <div>Select a view type.</div>;
    }
  };

  return <div>{getContent(props.data.display, props.data)}</div>;
};

export default TemplateChecker;
