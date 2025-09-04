import DBJSON from "../../../db.json";

const Apipage = () => {
  return <pre>{JSON.stringify(DBJSON, null, 2)}</pre>;
};

export default Apipage;
