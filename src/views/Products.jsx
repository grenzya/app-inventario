import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import Modal from "@/components/Modal";

function Productos() {
  const [productos] = useState([
    {
      codigo: "PRD001",
      nombre: "Casco de Seguridad",
      categoria: "Protección Personal",
      marca: "3M",
      pais: "EE.UU",
      distribuidor: "Ferretería Industrial",
      precio: 25000,
      stock: 8,
      estado: "Descontinuado",
      informacion: "Casco dieléctrico alta resistencia",
      barcode: "123456789012",
    },
    {
      codigo: "PRD002",
      nombre: "Guantes Protección",
      categoria: "Protección Personal",
      marca: "Ansell",
      pais: "Malasia",
      distribuidor: "Seguridad Max",
      precio: 45000,
      stock: 20,
      estado: "Activo",
      informacion: "Guantes resistentes al corte",
      barcode: "987654321098",
    },
  ]);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const columns = useMemo(
    () => [
      { header: "Código", accessorKey: "codigo" },
      { header: "Nombre", accessorKey: "nombre" },
      { header: "Categoría", accessorKey: "categoria" },
      { header: "Marca", accessorKey: "marca" },
      { header: "País", accessorKey: "pais" },
      { header: "Distribuidor", accessorKey: "distribuidor" },
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
              color: info.getValue() < 10 ? "red" : "black",
              fontWeight: "bold",
            }}
          >
            {info.getValue()}
          </span>
        ),
      },
      { header: "Estado", accessorKey: "estado" },
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
        header: "Barcode",
        cell: (info) => (
          <button
            onClick={() =>
              alert(`Código de barra: ${info.row.original.barcode}`)
            }
            style={{
              background: "#43a047",
              color: "white",
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
              <tr key={row.id} style={{ background: "#e8f5e9" }}>
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

      {/* Modal */}
      <Modal
        visible={!!selectedProduct}
        title="Información"
        data={selectedProduct || {}}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}

export default Productos;
