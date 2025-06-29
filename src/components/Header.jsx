function Header({ onToggleSidebar }) {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "60px",
        display: "flex",
        alignItems: "center",
        padding: "10px 20px",
        background: "#FFFFFF",
        color: "#000000", // Cambiado a negro
        zIndex: 1000,
        boxSizing: "border-box",
      }}
    >
      <button
        onClick={onToggleSidebar}
        style={{
          marginRight: "10px",
          fontSize: "22px",
          background: "transparent",
          border: "none",
          color: "#000000",
          cursor: "pointer",
        }}
      >
        ☰
      </button>
      <h1 style={{ margin: 0, fontSize: "20px", color: "#000000" }}>
        App Inventario
      </h1>
    </header>
  );
}

export default Header;
