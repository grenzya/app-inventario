import { useState } from "react";

function AgregarProductoModal({ visible, onClose, onAgregar }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [country, setCountry] = useState("");
  const [characteristics, setCharacteristics] = useState("");
  const [url, setUrl] = useState(null);
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
  const limpiarFormulario = () => {
    setName("");
    setCategory("");
    setBrand("");
    setCountry("");
    setCharacteristics("");
    setStock(0);
    setPrice(0);
  };

  const handleSubmit = async () => {
    if (!name.trim() || stock < 0 || price < 0) {
      alert("❌ Datos inválidos");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/producto/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          category,
          brand,
          country,
          characteristics,
          price: Number(price),
          stock: Number(stock),
          url:null
        }),
      });

      if (!response.ok) {
        throw new Error("Error al guardar");
      }

      const nuevoProducto = await response.json();
      onAgregar(nuevoProducto);
      limpiarFormulario();
      onClose();
    } catch (err) {
      setError("Hubo un problema al actualizar el producto." + err.message);
    }
  };

  if (!visible) return null;

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
        <h3 style={{ marginBottom: "20px", color: "#FFFFFF", textAlign: "center", fontSize: "24px" }}>
        Agregar Producto
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ boxSizing: "border-box",padding: "15px 20px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "16px" }}
          />
          <input
            type="text"
            placeholder="Categoria"
            value={category}
            onChange={(e)=> setCategory(e.target.value)}
            style={{ boxSizing: "border-box",padding: "15px 20px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "16px" }}
          />
          <input
            type="text"
            placeholder="Empresa"
            value={brand}
            onChange={(e)=> setBrand(e.target.value)}
            style={{ boxSizing: "border-box", padding: "15px 20px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "16px" }}
          />
          <input
            type="text"
            placeholder="Pais"
            value={country}
            onChange={(e)=> setCountry(e.target.value)}
style={{  boxSizing: "border-box",padding: "15px 20px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "16px" }}
          />
          <input
            type="text"
            placeholder="Caracteristicas"
            value={characteristics}
            onChange={(e)=> setCharacteristics(e.target.value)}
style={{ boxSizing: "border-box", padding: "15px 20px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "16px" }}
          />
          <input
            type="number"
            placeholder="Stock"
            value={stock}
            min={0}
            onChange={(e) => setStock(e.target.value)}
style={{ boxSizing: "border-box", padding: "15px 20px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "16px" }}
          />
          <input
            type="number"
            placeholder="Precio"
            value={price}
            min={0}
            onChange={(e) => setPrice(e.target.value)}
style={{ boxSizing: "border-box", padding: "15px 20px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "16px" }}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "60px", marginTop: "20px" }}>
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
            onClick={handleSubmit}
            style={{
              padding: "15px 20px",
              backgroundColor: "#4caf50",
              color: "white",
              border: "none",
              borderRadius: "15px",
              cursor: "pointer",
              fontSize: "20px",
            }}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

export default AgregarProductoModal;
