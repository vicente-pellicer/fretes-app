import { ChakraProvider } from "@chakra-ui/react";
import * as React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { Navbar } from "./components/Navbar";
import { Cargo } from "./pages/Cargo";
import { Driver } from "./pages/Driver";
import { Shipping } from "./pages/Shipping";
import { Vehicle } from "./pages/Vehicle";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/Cargo" element={<Cargo />} />
          <Route path="/Driver" element={<Driver />} />
          <Route path="/Shipping" element={<Shipping />} />
          <Route path="/Vehicle" element={<Vehicle />} />
        </Routes>
      </Router>
    </>
  );
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
