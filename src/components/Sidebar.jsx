import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaHome, FaBoxes, FaTruck } from "react-icons/fa";

function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [location.pathname]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: isOpen ? 0 : "-250px",
        width: "250px",
        height: "100%",
        background: "#E5E5E5",
        paddingTop: "80px",
        transition: "left 0.35s",
        zIndex: 1000,
        boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
    >
      {/* Botón de Cerrar */}
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          fontSize: "20px",
          background: "transparent",
          border: "none",
          color: "#333",
          cursor: "pointer",
        }}
      >
        ✕
      </button>

      <ul style={{ listStyle: "none", padding: "0 20px" }}>
        <li style={{ marginBottom: "20px" }}>
          <NavLink
            to="/"
            style={navLinkStyle}
          >
            <FaHome style={{ marginRight: "10px" }} />
            Inicio
          </NavLink>
        </li>

        <li style={{ marginBottom: "20px" }}>
          <NavLink
            to="/productos"
            style={navLinkStyle}
          >
            <FaBoxes style={{ marginRight: "10px" }} />
            Productos
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/proveedores"
            style={navLinkStyle}
          >
            <FaTruck style={{ marginRight: "10px" }} />
            Proveedores
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

const navLinkStyle = {
  display: "flex",
  alignItems: "center",
  padding: "10px 20px",
  background: "#75D797",
  borderRadius: "9999px",
  textDecoration: "none",
  color: "#000000",
  boxShadow: "2px 2px 4px rgba(0,0,0,0.25)",
  fontWeight: "500",
};

export default Sidebar;
