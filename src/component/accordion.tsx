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
  console.log("AccordionList props:", props);
  return (
    <>
      <Accordion
        type="single"
        collapsible
        className="w-[950px] custom-accordion"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>{props?.item?.name}</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-3 ">
              {props.item?.data &&
                props.item?.data?.map((d: any) => <CardItem data={d} />)}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default AccordionList;
