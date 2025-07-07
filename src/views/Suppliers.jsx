import { useState, useMemo,useEffect  } from "react";
import Modal from "@/components/Modal";
import PaginationBar from "@/components/PaginationBar";


import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel  

} from "@tanstack/react-table";
import {
  MdInfo,
} from "react-icons/md";

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
  }
};


function Suppliers() {
  const [globalFilter, setGlobalFilter] = useState("");
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const datos = await apiService.getProveedores();
        setProveedores(datos);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);


  const columns = useMemo(
    () => [
      { header: "Código", accessorKey: "proveedorId",sortingFn: (rowA, rowB) => {
    const a = Number(rowA.original.proveedorId);
    const b = Number(rowB.original.proveedorId);
    return a - b;
  } },
      { header: "Nombre", accessorKey: "nombre" },
      {header:"Categoría", accessorKey:"categoria"},
      {header:"Marca", accessorKey:"empresa"},
      { header: "País", accessorKey: "pais" },
      {header:"Dirección", accessorKey:""},
      { header: "Contacto", accessorKey: "contacto" },
      { header: "Teléfono", accessorKey: "fono" },
      { header: "Correo", accessorKey: "correo" },
      {
        header: "Info",
        cell: (info) => (
          <button
            onClick={() => setSelectedProduct(info.row.original)}
            style={{
              background: "#0288d1",
              color: "white",
              border: "none",
              padding: "10px",
              borderRadius: "20px",
              cursor: "pointer",
            }}
          >
            <MdInfo size={30} />
          </button>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: proveedores,
    columns,
    state: {
      globalFilter, 
    },
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(), 
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(), 
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
      sorting: [{ id: "proveedorId", desc: false }]
    },
    globalFilterFn: "includesString"
  });
  return (
    <div style={{ height: "100vh",
      width: "100vw", display: "flex", flexDirection: "column"}}>
       <div style={{ width: "100%", padding: "20px 0", display: "flex", justifyContent: "center" }}>
        
        <PaginationBar table={table} total={proveedores.length} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
      </div>

      <div style={{ flex: 1, overflow: "auto" }}>
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
          <thead>
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
                      fontSize: "24px",
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
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                style={{
                  backgroundColor: "#F2F2F2",
                  color:"inherit",
                  fontWeight: "normal",
                  boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.15)",
                  borderRadius: "26px",
                  overflow: "hidden",
                  fontSize: "20px",
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    style={{
                      padding: "15px 20px",
                      maxWidth: "200px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
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
      <Modal
        visible={!!selectedProduct}
        title="Información"
        data={selectedProduct || {}}
        onClose={() => setSelectedProduct(null)}
      />
      
    </div>
  );
}

export default Suppliers;
