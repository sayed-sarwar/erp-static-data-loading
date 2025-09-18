import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


const SubTabs = (props: any) => {
  console.log("SubTabs props:", props);
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        {props.data.map((item: any) => (
          <TabsTrigger key={item.id} value={item.id}>
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="account">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
  );
};
export default SubTabs;
