import RootRoute from "./routes/route";
import "./App.css";
// import DataComponent from "./page/data";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchData } from "./feature/data/dataSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData() as any);
  }, [dispatch]);
  return <RootRoute />;
}

export default App;
