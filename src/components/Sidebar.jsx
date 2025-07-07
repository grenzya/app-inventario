import { NavLink } from "react-router-dom";
import { FaHome, FaBoxes, FaTruck } from "react-icons/fa";

function Sidebar({ isOpen, onClose }) {
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
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px 20px",
              background: "#75D797",
              borderRadius: "9999px",
              textDecoration: "none",
              color: "#000000",
              boxShadow: "2px 2px 4px rgba(0,0,0,0.25)",
              fontWeight: "500",
              fontSize: "24px",
            }}
          >
            <FaHome style={{ marginRight: "10px", flexShrink: 0 }} />
            Inicio
          </NavLink>
        </li>

        <li style={{ marginBottom: "20px" }}>
          <NavLink
            to="/productos"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px 20px",
              background: "#75D797",
              borderRadius: "9999px",
              textDecoration: "none",
              color: "#000000",
              boxShadow: "2px 2px 4px rgba(0,0,0,0.25)",
              fontWeight: "500",
              fontSize: "24px",
            }}
          >
            <FaBoxes style={{ marginRight: "10px", flexShrink: 0 }} />
            Productos
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/proveedores"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px 20px",
              background: "#75D797",
              borderRadius: "9999px",
              textDecoration: "none",
              color: "#000000",
              boxShadow: "2px 2px 4px rgba(0,0,0,0.25)",
              fontWeight: "500",
              fontSize: "24px",
              overflow: "hidden",         
              whiteSpace: "nowrap",        
              textOverflow: "ellipsis",
            }}
          >
            <FaTruck style={{ marginRight: "10px", flexShrink: 0 }} />
            Proveedores
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
