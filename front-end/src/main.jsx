import { BrowserRouter, Routes, Route } from "react-router";
import { RegisterPage } from "./pages/RegisterPage.jsx";
import { createRoot } from "react-dom/client";
import { LoginPage } from "./pages/LoginPage.jsx";
import "./App.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route index path="/" element={<LoginPage/>} />
      <Route  path="/register" element={<RegisterPage/>} />
    </Routes>
  </BrowserRouter>
);
