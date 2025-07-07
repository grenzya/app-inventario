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
          backgroundColor: "black",
          padding: "30px",
          borderRadius: "40px",
          maxWidth: "400px",
          width: "100%",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        }}
      >
        <h3 style={{ marginBottom: "20px", color: "#FFFFFF", textAlign: "center", fontSize: "24px" }}>
          Editar Producto
        </h3>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ fontWeight: "bold", color: "#2e7d32", fontSize: "18px" }}>Nombre:</label>
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ fontWeight: "bold", color: "#2e7d32", fontSize: "18px" }}>Stock:</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            min = "0"
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
<label style={{ fontWeight: "bold", color: "#2e7d32", fontSize: "18px" }}>Precio:</label>
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

        <div style={{ display: "flex", justifyContent: "center", gap: "60px", marginTop: "20px" }}>
          <button style={cancelButtonStyle} onClick={onClose}>
            Cancelar
          </button>
          <button style={saveButtonStyle} onClick={guardarCambios}>
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "15px 20px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  marginTop: "4px",
  fontSize: "16px",
  boxSizing: "border-box",
};

const cancelButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#9e9e9e",
  color: "white",
  border: "none",
  borderRadius: "15px",
  cursor: "pointer",
  fontSize: "20px",
};

const saveButtonStyle = {
  padding: "15px 20px",
  backgroundColor: "#4caf50",
  color: "white",
  border: "none",
  borderRadius: "15px",
  cursor: "pointer",
  fontSize: "20px",
};
