import { Routes, Route } from "react-router-dom";

import type { Key } from "react";
import { generateRoutes } from "./generatesRoutes";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import data from "../../data.json";

export default function RootRoute() {
  const { selectedTemplatedata } = useSelector(
    (state: RootState) => state.UserData || { selectedTemplatedata: {} }
  );
  console.log("RootRoute - selectedTemplatedata:", selectedTemplatedata);
  const dynamicRoutes = generateRoutes(data);
  console.log("RootRoute - dynamicRoutes:", dynamicRoutes);

  return (
    <Routes>
      {dynamicRoutes.map(
        (
          route: { component: any; path: string | undefined; menuItem?: any },
          i: Key | null | undefined
        ) => {
          const Component = route.component;
          console.log(`Route ${i}:`, route.path, route.component?.name, route.menuItem);
          return (
            <Route
              key={i}
              path={route.path}
              element={<Component menuItem={route.menuItem} />}
            />
          );
        }
      )}
    </Routes>
  );
}
