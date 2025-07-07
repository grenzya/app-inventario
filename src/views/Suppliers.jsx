import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

const API_BASE_URL = "http://localhost:3000";

const apiService = {
  async getProveedores() {
    try {
      const response = await fetch(`${API_BASE_URL}/proveedor/all`);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error al obtener productos:", error);
      throw error;
    }
  },

};
function Suppliers() {
  const [proveedor, setProveedor] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
      const cargarProveedor = async () => {
        try {
          setLoading(true);
          setError(null);
          
          const datos = await apiService.getProveedores();
          setProductos(datos);
          
          
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
  
      cargarProveedor();
    }, []);
  
  const columns = useMemo(
    () => [
      { header: "Código", accessorKey: "codigo" },
      { header: "Nombre", accessorKey: "nombre" },
      { header: "País", accessorKey: "pais" },
      { header: "Contacto", accessorKey: "contacto" },
      { header: "Teléfono", accessorKey: "telefono" },
      { header: "Correo", accessorKey: "correo" },
      { header: "Estado", accessorKey: "estado" },
      {
        header: "Info",
        cell: (info) => (
          <button
            onClick={() => alert(info.row.original.informacion)}
            style={{
              background: "#0288d1",
              color: "white",
              border: "none",
              padding: "5px 8px",
              borderRadius: "5px",
            }}
          >
            i
          </button>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: proveedores,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, overflow: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "#49BA70",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{
                      padding: "12px",
                      background: "#2e7d32",
                      color: "#fff",
                      textAlign: "left",
                      borderBottom: "2px solid #fff",
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
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                style={{
                  background: "#e8f5e9",
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    style={{
                      padding: "10px",
                      borderBottom: "1px solid #c8e6c9",
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Suppliers;
