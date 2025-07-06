import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Inicio from "@/views/Home";
import Productos from "@/views/Products";
import Proveedores from "@/views/Suppliers";

function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const getTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Inicio";
      case "/productos":
        return "Productos";
      case "/proveedores":
        return "Proveedores";
      default:
        return "App Inventario";
    }
  };

  return (
    <>
      <Header onToggleSidebar={() => setSidebarOpen(true)} title={getTitle()} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div style={{ padding: "20px", marginTop: "60px" }}>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/proveedores" element={<Proveedores />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
