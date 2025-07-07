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
          backgroundColor: "black",
          padding: "30px",
          borderRadius: "40px",
          maxWidth: "400px",
          width: "100%",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        }}
      >
        <h3 style={{ marginBottom: "20px", color: "#e53935", textAlign: "center", fontSize: "24px" }}>
          ¿Actualizar estado?
        </h3>
        <p style={{ justifyContent: "center", alignSelf: "center",fontSize: "18px", color: "#FFFFFF" }}>
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
              borderRadius: "15px",
              cursor: "pointer",
              fontSize: "20px",
            }}
          >
            Cancelar
          </button>

          <button
            onClick={() => onConfirm(producto.productoId)}
            style={{
              padding: "15px 20px",
              backgroundColor: "#e53935",
              color: "white",
              border: "none",
              borderRadius: "15px",
              cursor: "pointer",
              fontSize: "20px",
            }}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default EliminarProductoModal;
