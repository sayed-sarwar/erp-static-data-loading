import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger as BaseAccordionTrigger,
} from "@/components/ui/accordion";
import CardItem from "./card";

const AccordionTrigger = ({ children }: { children: React.ReactNode }) => {
  return (
    <BaseAccordionTrigger className="flex items-center justify-between">
      <span>{children}</span>
    </BaseAccordionTrigger>
  );
};

const AccordionList = (props: any) => {
  const accordionItems = props.item?.Accordionitem || props.data || [];
  
  return (
    <div className="w-full space-y-4">
      {accordionItems.length > 0 ? (
        accordionItems.map((item: any, index: number) => (
          <Accordion
            key={index}
            type="single"
            collapsible
            className="w-full custom-accordion"
          >
            <AccordionItem value={`item-${index}`}>
              <AccordionTrigger>{item.name || `Section ${index + 1}`}</AccordionTrigger>
              <AccordionContent>
                <div className="ct-accordionp">
                  {item.data && item.data.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {item.data.map((dataItem: any, dataIndex: number) => (
                        <CardItem key={dataIndex} dataItem={dataItem} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No data available</p>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))
      ) : (
        <div className="p-6 text-center text-gray-500">
          No accordion items available
        </div>
      )}
    </div>
  );
};

export default AccordionList;
