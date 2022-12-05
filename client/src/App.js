import { Route, Routes } from "react-router-dom";
import "./App.css";
import AllRoutes from "../src/components/AllRoutes";
import LandingPage from "./components/LandingPage/LandingPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/*" element={<AllRoutes />} />
      </Routes>
    </>
  );
}
export default App;