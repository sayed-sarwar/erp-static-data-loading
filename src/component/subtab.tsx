import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccordionList from "./accordion";

const SubTab = (props: any) => {
  return (
    <Tabs defaultValue="account" className="custom-tab ctitems-start">
      <TabsList>
        {props.data.data.subItems?.TabMenu &&
          props.data.data.subItems?.TabMenu.map((item: any, index: number) => (
            <TabsTrigger key={index} value={item.value}>
              {item.name}
            </TabsTrigger>
          ))}
      </TabsList>
      {props.data.data.subItems?.TabMenu &&
        props.data.data.subItems?.TabMenu.map((item: any, index: number) => {
          return (
            <TabsContent key={index} value={item.value}>
              <div className="ct-accordionp w-[1000px]">
                {item.sub_sub_Items?.Accordionitem &&
                  item.sub_sub_Items?.Accordionitem.map((item: any) => (
                    <AccordionList item={item}></AccordionList>
                  ))}
              </div>
            </TabsContent>
          );
        })}
    </Tabs>
  );
};
export default SubTab;
