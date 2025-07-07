import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  MdInfo,
} from "react-icons/md";
function Suppliers() {
  const [proveedores] = useState([
    {
      codigo: "SUP001",
      nombre: "Ferretería Industrial",
      pais: "Chile",
      contacto: "Juan Pérez",
      telefono: "+56 9 1234 5678",
      correo: "juan@ferreteria.cl",
      estado: "Activo",
      informacion: "Proveedor de herramientas industriales",
    },
    {
      codigo: "SUP002",
      nombre: "Seguridad Max",
      pais: "Perú",
      contacto: "María López",
      telefono: "+51 987 654 321",
      correo: "maria@seguridadmax.pe",
      estado: "Activo",
      informacion: "Distribuidor de implementos de seguridad personal",
    },
  ]);

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
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div style={{ height: "100vh",
      width: "100vw", display: "flex", flexDirection: "column" }}>
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
    </div>
  );
}

export default Suppliers;
