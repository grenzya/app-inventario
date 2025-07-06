function Home() {
  return (
    <div
      style={{
        color: "white",
        padding: "40px 20px",
        fontFamily: "sans-serif",
        height: "100%",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "20px", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)", }}>
          Sistema de Stock de Inventario <br /> MonteCristo
        </h1>
        <p style={{ fontSize: "22px", marginBottom: "40px", lineHeight: "1.6" }}>
          El Sistema de Inventario MonteCristo fue realizado por los estudiantes de
          Ingeniería Civil en Computación e Informática de la Universidad Católica
          del Norte con el fin de mejorar el sistema de stock del inventario de artículos
          del almacén de MonteCristo.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "40px" }}>
          {/* Misión */}
          <div style={{ flex: "1", minWidth: "280px" }}>
            <h2 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "10px", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)", }}>
              Misión
            </h2>
            <p style={{ lineHeight: "1.6", fontSize: "18px" }}>
              Estar en un proceso constante de búsqueda de soluciones y nichos de negocio,
              que permitan satisfacer los requerimientos en forma absoluta, mejorando así
              el negocio de nuestros clientes siempre apalancando el win to win, para liderar
              así, los mercados en donde participamos.
            </p>
          </div>

          {/* Visión */}
          <div style={{ flex: "1", minWidth: "280px" }}>
            <h2 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "10px", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)", }}>
              Visión
            </h2>
            <p style={{ lineHeight: "1.6", fontSize: "18px" }}>
              Ser una empresa líder entre sus pares tanto a nivel comunal como regional,
              desarrollar negocios sustentables, rentables e innovadores, que permita a
              Comercial MonteCristo ser reconocido como un partner de negocios confiable,
              con soluciones a priori, asegurando así la satisfacción de sus clientes,
              ofreciendo oportunidades de desarrollo y crecimiento a nuestros colaboradores
              con el valor agregado que amerita.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
