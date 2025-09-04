import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Apipage from "./page/apipage";

export default function RootRoute() {
  return (
    <Router>
      <Routes>
        <Route path="/api" element={<Apipage />} />
      </Routes>
    </Router>
  );
}
