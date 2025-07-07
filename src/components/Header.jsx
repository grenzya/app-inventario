function Header({ onToggleSidebar, title = "Inicio" }) {
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
        background: "#FFFFFF",
        color: "#000000",
        boxSizing: "border-box",
        borderBottom: "4px solid #4CAF50", // Línea verde
      }}
    >
      <button
        onClick={onToggleSidebar}
        style={{
          marginRight: "15px",
          fontSize: "26px",
          background: "transparent",
          border: "none",
          color: "#000000",
        }}
      >
        ☰
      </button>

      {/* Logo */}
      <img
        src="src/assets/logo2.png"
        alt="Logo"
        style={{
          height: "45px",
          marginRight: "20px",
        }}
      />

      {/* Separador vertical */}
      <div
        style={{
          height: "100%",
          borderLeft: "1px solid #CCCCCC",
          marginRight: "20px",
        }}
      ></div>

      {/* Título */}
      <h1
        style={{
          margin: 0,
          fontSize: "32px",
          fontWeight: "500",
        }}
      >
        {title}
      </h1>
    </header>
  );
}

export default Header;
