import React from "react";
import Navbar from "./components/Navbar"
import About from "./sections/About";
import FAQ from "./sections/FAQ";
import Footer from "./sections/Footer";

function App() {
  return (
    <>
      <Navbar />
      <main className="relative z-10 flex min-h-screen flex-col pt-28 px-5 overflow-clip">
        <About />
        <FAQ />
        <Footer />
      </main>
    </>
  );
}

export default App;
