import React from "react";
import Navbar from "./components/Navbar"
import About from "./sections/About";
import Footer from "./sections/Footer";

function App() {
  return (
    <>
      <Navbar />
      <main className="relative z-10 flex min-h-screen flex-col pt-28 overflow-clip">
        <About />
        <Footer />
        <img src="/images/Nebula.png" alt="Nebula" className="absolute -z-10 -bottom-96 left-1/2 -translate-x-1/2 w-[1520px]" />
      </main>
    </>
  );
}

export default App;
