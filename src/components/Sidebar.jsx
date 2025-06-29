import { NavLink } from "react-router-dom";

function Sidebar({ isOpen, onClose }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: isOpen ? 0 : "-250px",
        width: "250px",
        height: "100%",
        background: "#222",
        color: "#fff",
        paddingTop: "60px",
        transition: "left 0.3s",
        zIndex: 1000,
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          fontSize: "20px",
        }}
      >
        ✕
      </button>
      <ul style={{ listStyle: "none", padding: "20px" }}>
        <li>
          <NavLink to="/" style={{ color: "#fff", textDecoration: "none" }}>
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/productos"
            style={{ color: "#fff", textDecoration: "none" }}
          >
            Productos
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/proveedores"
            style={{ color: "#fff", textDecoration: "none" }}
          >
            Proveedores
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
