const CardItem = (props: any) => {
  return (
    <ul className="list-i  border-b border-gray-300 gap-custom">
      <li className="f-one">{props.data.name}</li>
      <li className="f-two">{props.data.active}</li>
    </ul>
  );
};

export default CardItem;
