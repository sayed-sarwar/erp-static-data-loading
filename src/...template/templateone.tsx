import DataTableDemo from "@/components/datatable";

const TemplateOne = (props: any) => {
  console.log("TemplateOne props:", props.data.data);
  return (
    <>
      <div>Template One</div>
      <DataTableDemo data={props.data.data} />
    </>
  );
};

export default TemplateOne;
