import { useState, useMemo, useEffect } from "react";
import EditarProductoModal from "@/components/editarProductoModal";
import EliminarProductoModal from "@/components/eliminarProductoModal";
import AgregarProductoModal from "@/components/agregarProducoModal";



import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import Modal from "@/components/Modal";



const API_BASE_URL = "http://localhost:3000";

const apiService = {
  async getProductos() {
    try {
      const response = await fetch(`${API_BASE_URL}/producto/all`);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error al obtener productos:", error);
      throw error;
    }
  },

  getSVGUrl(barCodeId) {
    return `${API_BASE_URL}/barCode/barcodeimage/${barCodeId}`;
  }
};

function BarcodeModal({ visible, onClose, barCodeId, titulo }) {
  if (!visible) return null;

  const imprimirCodigo = () => {
    const printWindow = window.open('', '_blank');
    
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>Código de barras - ${titulo}</title>
        <style>
          body {
            margin: 0;
            padding: 20px;
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          
          .print-area {
            text-align: center;
            margin: 20px 0;
          }
          
          .barcode-image {
            width: 350px;
            height: auto;
            border: 1px solid #ddd;
            padding: 10px;
            margin: 10px 0;
          }
          
          .product-info {
            font-size: 14px;
            margin: 10px 0;
            color: #333;
          }
          
          @media print {
            body * {
              visibility: hidden;
            }
            .print-area, .print-area * {
              visibility: visible;
            }
            .print-area {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
            }
            .no-print {
              display: none !important;
            }
          }
          
          .print-button {
            background-color: #4CAF50;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            margin: 10px;
          }
        </style>
      </head>
      <body>
        <div class="no-print">
          <button onclick="window.print()" class="print-button">🖨️ Imprimir</button>
          <button onclick="window.close()" class="print-button" style="background-color: #f44336;">❌ Cerrar</button>
        </div>
        
        <div class="print-area">
          <div class="product-info">
            <strong>${titulo}</strong>
          </div>
          <img 
            src="${apiService.getSVGUrl(barCodeId)}" 
            alt="Código de barras" 
            class="barcode-image"
          />
          <div class="product-info">
            Código: ${barCodeId}
          </div>
        </div>
      </body>
      </html>
    `;
    
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
      }, 500);
    };
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "10px",
          maxWidth: "90%",
          maxHeight: "90%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 style={{ margin: "0 0 20px 0", color: "#333", textAlign: "center" }}>
          {titulo}
        </h3>
        
        <div style={{ 
          border: "2px solid #ddd", 
          borderRadius: "5px", 
          padding: "15px", 
          backgroundColor: "#fafafa",
          textAlign: "center"
        }}>
          <img
            src={apiService.getSVGUrl(barCodeId)}
            alt={`Código de barras ${titulo}`}
            style={{
              width: "350px",
              height: "auto",
              maxWidth: "100%"
            }}
          />
        </div>
        
        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          <button
            onClick={imprimirCodigo}
            style={{
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            🖨️ Imprimir
          </button>
          
          <button
            onClick={onClose}
            style={{
              padding: "10px 20px",
              backgroundColor: "#2196F3",
              color: "white",
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

function Productos() {
  const [modalAgregarVisible, setModalAgregarVisible] = useState(false);
  const [editModal, setEditModal] = useState({ visible: false, producto: null });
  const [modalEliminar, setModalEliminar] = useState({
  visible: false,
  producto: null
});
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [barcodeModal, setBarcodeModal] = useState({
    visible: false,
    barCodeId: null,
    titulo: ""
  });
  const handleProductoGuardado = (productoActualizado) => {
  setProductos((prev) =>
    prev.map((p) =>
      p.productoId === productoActualizado.productoId ? productoActualizado : p
    )
  );
};
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const datos = await apiService.getProductos();
        setProductos(datos);
        
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    cargarProductos();
  }, []);

  const columns = useMemo(
    () => [
      { header: "Código", accessorKey: "productoId" },
      { header: "Nombre", accessorKey: "nombre" },
      { header: "Categoría", accessorKey: "categoria" },
      { header: "Marca", accessorKey: "marca" },
      { header: "País", accessorKey: "pais" },
      { header: "Características", accessorKey: "caracteristicas" },
      {
        header: "Precio",
        accessorKey: "precio",
        cell: (info) => `$${info.getValue().toLocaleString("es-CL")}`,
      },
      {
        header: "Stock",
        accessorKey: "stock",
        cell: (info) => (
          <span
            style={{
              color: info.getValue() < 5 ? "red" : "black",
              fontWeight: "bold",
            }}
          >
            {info.getValue()}
          </span>
        ),
      },
      {
        header: "Estado",
        accessorKey: "estado",
        cell: (info) => (
          <span style={{ 
            color: info.getValue() === 1 ? "green" : "red",
            fontWeight: "bold"
          }}>
            {info.getValue() === 1 ? "Activo" : "Inactivo"}
          </span>
        ),
      },
      {
        header: "Info",
        cell: (info) => (
          <button
            onClick={() => setSelectedProduct(info.row.original)}
            style={{
              background: "#0288d1",
              color: "white",
              border: "none",
              padding: "5px 8px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            i
          </button>
        ),
      },
      {
        header:"Acciones",
        cell:({row})=>{
          const prod =row.original;
          return(
            <div style={{display:"flex",gap:"6px"}}>
            
              <button
                onClick={() => {
                  setEditModal({ visible: true, producto: prod })
                }
              }
                style={{
                  background: "#ff9800",
                  color: "#fff",
                  border: "none",
                  padding: "6px 10px",
                  borderRadius: 4,
                  cursor: "pointer",
                  fontSize: 12,
                  }}
              >
                  ✏️
              </button>
              <button
                onClick={() =>
                  setModalEliminar({ visible: true, producto: prod })
                }
                style={{
                  background: "#e53935",
                  color: "#fff",
                  border: "none",
                  padding: "6px 10px",
                  borderRadius: 4,
                  cursor: "pointer",
                  fontSize: 12,
                }}
              >
                🗑️
              </button>
            </div>
          )
        }
      }
      ,
      {
        header: "Barcode",
        cell: (info) => (
          <button
            onClick={() => setBarcodeModal({
              visible: true,
              barCodeId: info.row.original.barCodeId,
              titulo: `${info.row.original.nombre} (${info.row.original.codigoGuardad})`
            })}
            style={{
              background: "#43a047",
              color: "black",
              border: "none",
              padding: "5px 8px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            📦
          </button>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: productos,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 15,
      },
    },
  });

  if (loading) {
    return (
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        height: "100%",
        fontSize: "18px" 
      }}>
        🔄 Cargando productos...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        height: "100%",
        flexDirection: "column",
        color: "red" 
      }}>
        <div>❌ Error al cargar productos</div>
        <div style={{ marginTop: "10px", fontSize: "14px" }}>{error}</div>
      </div>
    );
  }
    

  return (
        
    <div style={{ 
      padding: 0,
      margin: 0,
      height: "100vh",
      width: "100vw",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden"
    }}>

      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
        borderRadius: "20px",
        backgroundColor: "#2e7d32",
        flexWrap: "wrap",
        flexShrink: 0,
        minHeight: "70px",
        padding: "20px",
        margin: "0 20px",
      }}>
        
        <div style={{ color: "white", marginRight: "40px", fontSize: "14px", fontWeight: "500" }}>
          Mostrando {productos.length === 0 ? 0 : table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} - {" "}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
            productos.length
          )} de {productos.length}
        </div>

        <button
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
          style={{
            padding: "10px 18px",
            backgroundColor: table.getCanPreviousPage() ? "#4caf50" : "#999",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: table.getCanPreviousPage() ? "pointer" : "not-allowed",
            fontSize: "14px",
            fontWeight: "600",
            minWidth: "100px"
          }}
        >
          Primera
        </button>
        
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          style={{
            padding: "10px 18px",
            backgroundColor: table.getCanPreviousPage() ? "#66bb6a" : "#999",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: table.getCanPreviousPage() ? "pointer" : "not-allowed",
            fontSize: "14px",
            fontWeight: "600",
            minWidth: "100px"
          }}
        >
          Anterior
        </button>

        <div style={{
          color: "white",
          fontSize: "14px",
          fontWeight: "600",
          padding: "10px 15px",
          backgroundColor: "rgba(255,255,255,0.2)",
          borderRadius: "6px",
          minWidth: "150px",
          textAlign: "center"
        }}>
          Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
        </div>

        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          style={{
            padding: "10px 18px",
            backgroundColor: table.getCanNextPage() ? "#66bb6a" : "#999",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: table.getCanNextPage() ? "pointer" : "not-allowed",
            fontSize: "14px",
            fontWeight: "600",
            minWidth: "100px"
          }}
        >
          Siguiente
        </button>
        
        <button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
          style={{
            padding: "10px 18px",
            backgroundColor: table.getCanNextPage() ? "#4caf50" : "#999",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: table.getCanNextPage() ? "pointer" : "not-allowed",
            fontSize: "14px",
            fontWeight: "600",
            minWidth: "100px"
          }}
        >
          Última
        </button>

        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
          style={{
            padding: "10px 12px",
            borderRadius: "6px",
            border: "1px solid #ddd",
            fontSize: "14px",
            fontWeight: "600"
          }}
        >
          {[10, 15, 20, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize} por página
            </option>
          ))}
        </select>
        
        <button
        onClick={() => setModalAgregarVisible(true)}
        style={{
          backgroundColor: "#66bb6a",
          color: "white",
          padding: "10px 10px",
          border: "none",
          marginLeft: "40px",
          borderRadius: "30px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "bold"
        }}
      >
        ➕
      </button>
      </div>

      <div style={{ 
        flex: 1, 
        overflow: "auto",
        padding: "20px",
        minHeight: 0
      }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            borderColor: "#ddd",
            borderSpacing: 0,
            background: "#FFFFFF",
            borderRadius: "30px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            overflow: "hidden",
            marginTop: "20px",
            marginBottom: "100px",
          }}
        >
          <thead style={{ position: "sticky", top: 0, zIndex: 10 }}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{
                      padding: "15px 20px",
                      background: "#2e7d32",
                      color: "#fff",
                      textAlign: "left",
                      fontWeight: "bold",
                      fontSize: "20px",
                      width: "100%",
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} style={{ 
                  textAlign: "center",
                  padding: "40px",
                   }}>
                  No hay productos para mostrar
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => {
                const isInactive = row.original.estado === 0;
                return (
                  <tr
                    key={row.id}
                    style={{
                      backgroundColor: isInactive ? "#ffebee" : "#F2F2F2",
                      color: isInactive ? "#c62828" : "inherit",
                      fontWeight: isInactive ? "bold" : "normal",
                      boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.15)",
                      borderRadius: "26px",
                      overflow: "hidden",
                    }}
                  >
                    {row.getVisibleCells().map((cell, cellIndex) => (
                      <td
                        key={cell.id}
                        style={{
                          padding: "15px 20px",
                          maxWidth: "200px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          
                        }}
                        title={flexRender(cell.column.columnDef.cell, cell.getContext())}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <EliminarProductoModal
        visible={modalEliminar.visible}
        producto={modalEliminar.producto}
        onClose={() => setModalEliminar({ visible: false, producto: null })}
        onConfirm={async (productoId) => {
          try {
            const res = await fetch(`http://localhost:3000/producto/eliminar/${productoId}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
            });

            if (!res.ok) throw new Error("Error al actualizar");

            alert("✅ El Producto se actualizo correctamente");

            // Recargar productos
            const nuevosDatos = await apiService.getProductos();
            setProductos(nuevosDatos);

            setModalEliminar({ visible: false, producto: null });
          } catch (error) {
            console.error("Error al actualizar el estado:", error);
            alert("❌ Error al actualizar el estado del producto");
          }
        }}
      />

      <AgregarProductoModal
        visible={modalAgregarVisible}
        onClose={() => setModalAgregarVisible(false)}
        onAgregar={async (nuevoProducto) => {
          const actualizado = await apiService.getProductos();
          setProductos(actualizado);
          setModalAgregarVisible(false);
        }}
      />

      <EditarProductoModal
        visible={editModal.visible}
        producto={editModal.producto}
        onClose={() => setEditModal({ visible: false, producto: null })}
        onSaved={handleProductoGuardado}
      />
      <Modal
        visible={!!selectedProduct}
        title="Información"
        data={selectedProduct || {}}
        onClose={() => setSelectedProduct(null)}
      />
      
      <BarcodeModal
        visible={barcodeModal.visible}
        onClose={() => setBarcodeModal({ ...barcodeModal, visible: false })}
        barCodeId={barcodeModal.barCodeId}
        titulo={barcodeModal.titulo}
      />
    </div>
  );
}

export default Productos;