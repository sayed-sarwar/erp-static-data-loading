import RootRoute from "../src/route";
import "./App.css";
import DataComponent from "./page/data";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchData } from "./feature/data/dataSlice";
import TemplateLayout from "./template/templatelayout";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData() as any);
  }, [dispatch]);
  return (
    <>
      <DataComponent />
      <RootRoute />
      <TemplateLayout />
    </>
  );
}

export default App;
