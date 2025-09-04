import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TemplateMatching from "@/template/templates";

const Tab = (props: any) => {
  console.log(props.tabData.item);
  return (
    <Tabs defaultValue="account" className="w-[100%] custom-tab">
      <TabsList>
        {props.tabData.item &&
          props.tabData.item.map((item: any, index: number) => (
            <TabsTrigger key={index} value={item.value}>
              {item.name}
            </TabsTrigger>
          ))}
      </TabsList>
      {props.tabData.item &&
        props.tabData.item.map((item: any, index: number) => (
          <TabsContent key={index} value={item.value}>
            <TemplateMatching template={item.template} data={item} />
          </TabsContent>
        ))}
    </Tabs>
  );
};
export default Tab;
