import SubTab from "@/component/subtab";

const Templatetwo = (props: any) => {
  return (
    <>
      <p className="itemdes">{props.data?.description}</p>
      <SubTab data={props} />
    </>
  );
};

export default Templatetwo;
