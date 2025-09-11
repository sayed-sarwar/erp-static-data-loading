import CardItem from "@/components/data-display/card";
import List from "@/components/data-display/list";

const SectionComponent = (props: any) => {
  console.log("SectionComponent props:", props.data.data);
  const items = Array.isArray(props.data.data) ? props.data.data : [];
  return (
    <div className="grid grid-cols-3">
      {items.length > 0 ? (
        <>
          {items.map((dataItem: any, index: number) => (
            <CardItem dataItem={dataItem} />
          ))}
        </>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default SectionComponent;
