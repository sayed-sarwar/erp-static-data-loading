import TemplateChecker from "./atomictemplate";

interface TemplateCustomProps {
  viewType: string;
}

const TemplateCustom: React.FC<TemplateCustomProps> = (props: any) => {
  console.log("TemplateCustom props:", props.data.subItems.Accordionitem);
  return (
    <div>
      {props.data && props.data.description ? (
        <h2>{props.data.description}</h2>
      ) : null}

      {props.data?.subItems &&
        props.data?.subItems?.map((item: any) => (
          <TemplateChecker data={item} />
        ))}
    </div>
  );
};

export default TemplateCustom;
