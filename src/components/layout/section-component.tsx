import CardItem from "@/components/data-display/card";

const SectionComponent = (props: any) => {
  const items = Array.isArray(props.data?.data) ? props.data.data : 
                Array.isArray(props.data) ? props.data : [];
                
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.length > 0 ? (
        <>
          {items.map((dataItem: any, index: number) => (
            <CardItem key={index} dataItem={dataItem} />
          ))}
        </>
      ) : (
        <div className="col-span-full p-6 text-center text-gray-500 bg-gray-50 rounded-lg">
          <p>No data available for this section</p>
        </div>
      )}
    </div>
  );
};

export default SectionComponent;
