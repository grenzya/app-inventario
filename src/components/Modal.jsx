function Modal({ visible, title, data, onClose }) {
  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2000,
      }}
    >
      <div
        style={{
          background: "#000000",
          padding: "30px",
          borderRadius: "10px",
          width: "400px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
        }}
      >
        <h2
          style={{
            marginTop: 0,
            textAlign: "center",
            fontSize: "30px",
            color: "#FFFFFF",
          }}
        >
          {title}
        </h2>
        <ul style={{ listStyle: "none", padding: 0, color: "#FFFFFF" }}>
          {Object.entries(data).map(([key, value]) => (
            <li key={key} style={{ marginBottom: "10px" }}>
              <strong>{key}:</strong> {value}
            </li>
          ))}
        </ul>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <button
            onClick={onClose}
            style={{
              background: "#FFFFFF",
              color: "#000000",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
