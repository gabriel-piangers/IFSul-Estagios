import { BrowserRouter, Routes, Route } from "react-router";
import { RegisterPage } from "./pages/RegisterPage.jsx";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./contexts/AuthProvider.jsx";
import { LoginPage } from "./pages/LoginPage.jsx";
import { SearchPage } from "./pages/SearchPage.jsx";
import { UnderDevelopment } from "./pages/UnderDevelopmemnt.jsx";
import "./App.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route index path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/under-development" element={<UnderDevelopment />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);
