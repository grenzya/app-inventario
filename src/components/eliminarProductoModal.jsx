// src/components/EliminarProductoModal.jsx
import React from "react";


function EliminarProductoModal({ visible, producto, onClose, onConfirm }) {
  if (!visible || !producto) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "10px",
          maxWidth: "90%",
          maxHeight: "90%",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          textAlign: "center",
        }}
      >
        <h3 style={{ marginBottom: "20px", color: "#e53935" }}>
          ¿Actualizar estado?
        </h3>
        <p style={{ fontSize: "16px", color: "#333" }}>
          Estás a punto de actualizar el estado de <strong>{producto.nombre}</strong>.
        </p>
        

        <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "20px" }}>
          <button
            onClick={onClose}
            style={{
              padding: "10px 20px",
              backgroundColor: "#9e9e9e",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            ❌ Cancelar
          </button>

          <button
            onClick={() => onConfirm(producto.productoId)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#e53935",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            🗑️ Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default EliminarProductoModal;
