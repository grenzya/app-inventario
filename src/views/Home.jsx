function Home() {
  return (
    <div
      style={{
      height: "100vh",
      width: "100vw",
        backgroundColor: "#49BA70",
        color: "white",
        padding: "40px 20px",
        fontFamily: "sans-serif",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(24px, 4vw, 40px)", // Escala entre 24px y 40px
            fontWeight: "bold",
            marginBottom: "20px",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)",
          }}
        >
          Sistema de Stock de Inventario <br /> MonteCristo
        </h1>

        <p
          style={{
            fontSize: "clamp(16px, 2vw, 20px)",
            marginBottom: "40px",
            lineHeight: "1.6",
            textAlign: "justify",
          }}
        >
          El Sistema de Inventario MonteCristo fue realizado por los estudiantes de
          Ingeniería Civil en Computación e Informática de la Universidad Católica
          del Norte con el fin de mejorar el sistema de stock del inventario de artículos
          del almacén de MonteCristo.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "40px",
            justifyContent: "center",
          }}
        >
          {/* Misión */}
          <div style={{ flex: "1 1 300px", maxWidth: "600px" }}>
            <h2
              style={{
                fontSize: "clamp(20px, 3vw, 28px)",
                fontWeight: "bold",
                marginBottom: "10px",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)",
              }}
            >
              Misión
            </h2>
            <p
              style={{
                fontSize: "clamp(14px, 1.8vw, 18px)",
                lineHeight: "1.6",
                textAlign: "justify",
              }}
            >
              Estar en un proceso constante de búsqueda de soluciones y nichos de negocio,
              que permitan satisfacer los requerimientos en forma absoluta, mejorando así
              el negocio de nuestros clientes siempre apalancando el win to win, para liderar
              así, los mercados en donde participamos.
            </p>
          </div>

          {/* Visión */}
          <div style={{ flex: "1 1 300px", maxWidth: "600px" }}>
            <h2
              style={{
                fontSize: "clamp(20px, 3vw, 28px)",
                fontWeight: "bold",
                marginBottom: "10px",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)",
              }}
            >
              Visión
            </h2>
            <p
              style={{
                fontSize: "clamp(14px, 1.8vw, 18px)",
                lineHeight: "1.6",
                textAlign: "justify",
              }}
            >
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