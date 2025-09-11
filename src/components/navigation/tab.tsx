import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import TemplateMatching from "@/template/templates";

const Tab = (props: any) => {
  const handleChange = (value: string) => {
    console.log("Selected Tab:", value);
    // Just log the tab change, don't navigate
  };
  // Get the first tab's value as default
  const defaultValue =
    props.tabData.item && props.tabData.item.length > 0
      ? props.tabData.item[0].value
      : "default";

  return (
    <Tabs
      defaultValue={defaultValue}
      className="w-[100%] custom-tab"
      onValueChange={handleChange}
    >
      <TabsList>
        {props.tabData.item &&
          props.tabData.item.map((item: any, index: number) => (
            <TabsTrigger
              key={index}
              value={item.value}
              // onChange={() => handleChange(item)}
            >
              {item.name}
            </TabsTrigger>
          ))}
      </TabsList>
      {props.tabData.item &&
        props.tabData.item.map((item: any, index: number) => (
          <TabsContent key={index} value={item.value}>
            {/* <TemplateMatching template={item.template} data={item} /> */}
          </TabsContent>
        ))}
    </Tabs>
  );
};

export default Tab;
