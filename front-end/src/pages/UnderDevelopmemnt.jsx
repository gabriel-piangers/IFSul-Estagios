import underDev from "../assets/under-development.jpg";

export function UnderDevelopment() {
  return (
    <main>
      <div
        style={{
          width: "100%",
          height: "100vh",
          position: "relative",

        }}
      >
        <img src={underDev} alt="Page under development" style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "fill"
                }}/>
      </div>
      <div
        style={{
          position: "absolute",
          top: "3rem",
          left: "2rem",
          fontSize: "3vw",
        }}
      >
        <h2>Page still under development</h2>
        <h3>Come back later</h3>
      </div>
    </main>
  );
}
