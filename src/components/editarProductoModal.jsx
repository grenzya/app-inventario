import { useState, useEffect } from "react";

export default function EditarProductoModal({ visible, producto, onClose, onSaved }) {
  const [nombre, setNombre] = useState("");
  const [stock, setStock] = useState(0);
  const [precio, setPrecio] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (producto) {
      setNombre(producto.nombre);
      setStock(producto.stock);
      setPrecio(producto.precio);
    }
  }, [producto]);

  if (!visible || !producto) return null;

  const guardarCambios = async () => {
    if (!nombre.trim()) {
      setError("El nombre no puede estar vacío.");
      return;
    }
    if(Number(precio)< 0){
        setError("El precio debe de ser mayor a 0");
        return
    }
    if(Number(stock)<0){
        setError("El stock debe de ser mayor a 0");
        return
    }
    console.log(nombre, precio, stock)
    try {
      const response = await fetch("http://localhost:3000/producto/actualizar", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productoId: producto.productoId,
          nombre: nombre,
          stock: Number(stock),
          price: Number(precio),
        }),
      });

      if (!response.ok) {
        throw new Error("Error al guardar");
      }

      const actualizado = await response.json();
      onSaved(actualizado);
      onClose();
    } catch (err) {
      setError("Hubo un problema al actualizar el producto." + err.message);
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
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
          backgroundColor: "#e8f5e9",
          padding: "30px",
          borderRadius: "10px",
          width: "400px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        }}
      >
        <h2 style={{ marginTop: 0, color: "#2e7d32", textAlign: "center" }}>
          ✏️ Editar Producto
        </h2>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ fontWeight: 600, color: "#2e7d32" }}>Nombre:</label>
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ fontWeight: 600, color: "#2e7d32" }}>Stock:</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            min = "0"
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ fontWeight: 600, color: "#2e7d32" }}>Precio:</label>
          <input
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            min="0"
            style={inputStyle}
          />
        </div>

        {error && (
          <div style={{ color: "red", marginBottom: "10px", fontSize: "14px" }}>
            {error}
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button style={cancelButtonStyle} onClick={onClose}>
            ❌ Cancelar
          </button>
          <button style={saveButtonStyle} onClick={guardarCambios}>
            💾 Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "8px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  marginTop: "4px",
  fontSize: "14px",
};

const cancelButtonStyle = {
  backgroundColor: "#b71c1c",
  color: "white",
  border: "none",
  padding: "10px 18px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "14px",
};

const saveButtonStyle = {
  backgroundColor: "#2e7d32",
  color: "white",
  border: "none",
  padding: "10px 18px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "14px",
};
