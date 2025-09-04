import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
const DataComponent = () => {
  const { value, status } = useSelector(
    (state: RootState) => state.UserData || { value: [], status: "idle" }
  );

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error loading data</p>;
  if (status === "succeeded")
    return (
      <div>
        {/* Data Component */}
        {/* {value && value.map((item: any) => (
      <div key={item.id}>
        <h2>{item.body}</h2>
        <p>{item.title}</p>
      </div>
    ))} */}
      </div>
    );
};

export default DataComponent;
