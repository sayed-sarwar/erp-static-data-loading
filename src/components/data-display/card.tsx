const CardItem = (props: any) => {
  return (
    <ul className="list-i  border-b border-gray-300 gap-custom">
      <li className="f-one">{props.dataItem.name}</li>
      <li className="f-two">{props.dataItem.active}</li>
    </ul>
  );
};

export default CardItem;
