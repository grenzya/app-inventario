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
        background: "#E5E5E5", // Fondo gris claro
        paddingTop: "80px",
        transition: "left 0.3s",
        zIndex: 1000,
        boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
    >
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
              padding: "10px 20px",
              background: "#FFFFFF",
              borderRadius: "9999px",
              textDecoration: "none",
              color: "#267C33",
              boxShadow: "2px 2px 4px rgba(0,0,0,0.25)",
              fontWeight: "500",
            }}
          >
            <FaHome style={{ marginRight: "10px" }} />
            Inicio
          </NavLink>
        </li>

        <li style={{ marginBottom: "20px" }}>
          <NavLink
            to="/productos"
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px 20px",
              background: "#FFFFFF",
              borderRadius: "9999px",
              textDecoration: "none",
              color: "#267C33",
              boxShadow: "2px 2px 4px rgba(0,0,0,0.25)",
              fontWeight: "500",
            }}
          >
            <FaBoxes style={{ marginRight: "10px" }} />
            Productos
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/proveedores"
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px 20px",
              background: "#FFFFFF",
              borderRadius: "9999px",
              textDecoration: "none",
              color: "#267C33",
              boxShadow: "2px 2px 4px rgba(0,0,0,0.25)",
              fontWeight: "500",
            }}
          >
            <FaTruck style={{ marginRight: "10px" }} />
            Proveedores
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
