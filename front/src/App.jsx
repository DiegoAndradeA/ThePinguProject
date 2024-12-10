import "./App.css";

import { Route, Routes } from "react-router";

import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import Home from "./components/Home.jsx";
import PinguNotFound from "./components/PinguNotFound.jsx";

export default function App() {
  return (
    <div>
      <Header />

      <Routes>
        <Route path="" element={<Home />} />
        <Route path="*" element={<PinguNotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}
