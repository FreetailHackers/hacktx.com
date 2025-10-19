import React from "react";
import Navbar from "./components/Navbar"
import About from "./sections/About";
import Schedule from "./sections/Schedule";
import FAQ from "./sections/FAQ";
import Partners from "./sections/Partners";
import Footer from "./sections/Footer";

function App() {
  return (
    <>
      <Navbar />
      <main className="relative z-10 flex min-h-screen flex-col pt-28 px-5 overflow-clip">
        <About />
        <Schedule />
        <img src="/images/HackTX25 Saturday Menu.png" alt="HackTX25 Saturday menu" className="mx-auto my-10 w-full max-w-4xl rounded-lg shadow-lg" />
        <img src="/images/HackTX25 Sunday Menu.png" alt="HackTX25 Saturday menu" className="mx-auto my-10 w-full max-w-4xl rounded-lg shadow-lg" />
        <FAQ />
        <Partners />
        <Footer />
      </main>
    </>
  );
}

export default App;
