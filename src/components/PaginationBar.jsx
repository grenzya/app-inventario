import React from "react";
import {
  MdFirstPage,
  MdLastPage,
  MdArrowBack,
  MdArrowForward,
} from "react-icons/md";

const baseButtonStyle = (enabled, color) => ({
  backgroundColor: enabled ? color : "#ccc",
  color: "white",
  border: "none",
  padding: "10px",
  borderRadius: "50%",
  cursor: enabled ? "pointer" : "not-allowed",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "45px",
  height: "45px",
  boxShadow: enabled ? "0 2px 8px rgba(0,0,0,0.2)" : "none",
  transition: "all 0.3s ease-in-out",
});

const PaginationBar = ({ table, globalFilter, setGlobalFilter }) => {
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#4caf50",
        padding: "20px",
        borderBottomLeftRadius: "20px",
        borderBottomRightRadius: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
        flexWrap: "wrap",
        position: "relative", // ya no fixed
        top: 0,
        zIndex: 10,
      }}
    >
            {/* Input de búsqueda */}
    <input
        type="text"
        placeholder="Buscar proveedor..."
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        style={{
        padding: "12px 20px",
        fontSize: "18px",
        borderRadius: "20px",
        border: "none",
        outline: "none",
        backgroundColor: "#fff",
        color: "#333",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
        minWidth: "260px",
        }}
    />
      <button
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
        style={baseButtonStyle(table.getCanPreviousPage(), "#388e3c")}
      >
        <MdFirstPage size={24} />
      </button>

      <button
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
        style={baseButtonStyle(table.getCanPreviousPage(), "#43a047")}
      >
        <MdArrowBack size={24} />
      </button>

      <div
        style={{
          fontSize: "18px",
          fontWeight: "bold",
          padding: "10px 20px",
          borderRadius: "15px",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          color: "#fff",
          minWidth: "160px",
          textAlign: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        }}
      >
        Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
      </div>

      <button
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
        style={baseButtonStyle(table.getCanNextPage(), "#43a047")}
      >
        <MdArrowForward size={24} />
      </button>

      <button
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        disabled={!table.getCanNextPage()}
        style={baseButtonStyle(table.getCanNextPage(), "#388e3c")}
      >
        <MdLastPage size={24} />
      </button>

      <select
        value={table.getState().pagination.pageSize}
        onChange={(e) => table.setPageSize(Number(e.target.value))}
        style={{
          padding: "20px 25px",
          borderRadius: "30px",
          border: "1px solid #ddd",
          fontSize: "18px",
          fontWeight: "500",
          backgroundColor: "#f1f8e9",
          color: "#2e7d32",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          cursor: "pointer",
        }}
      >
        {[10, 15, 20, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            {pageSize} por página
          </option>
        ))}
      </select>
    </div>
  );
};

export default PaginationBar;
