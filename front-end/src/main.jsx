import { BrowserRouter, Routes, Route } from "react-router";
import { RegisterPage } from "./pages/RegisterPage.jsx";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./contexts/AuthProvider.jsx";
import { LoginPage } from "./pages/LoginPage.jsx";
import { SearchPage } from "./pages/SearchPage.jsx";
import { UnderDevelopment } from "./pages/UnderDevelopmemnt.jsx";
import { Unautorized } from "./pages/Unautorized.jsx";
import { RequireAuth } from "./components/RequireAuth.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import "./styles/App.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/search" element={<SearchPage />} />

        <Route path="/under-development" element={<UnderDevelopment />} />
        <Route path="/unautorized" element={<Unautorized />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);
