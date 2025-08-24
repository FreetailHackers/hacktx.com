import React from "react";
import Navbar from "./components/Navbar"
import About from "./sections/About";
import Footer from "./sections/Footer";

function App() {
  return (
    <>
      <Navbar />
      <main className="relative z-10 flex min-h-screen flex-col px-5 pt-32">
        <About />
        <Footer />
      </main>
    </>
  );
}

export default App;
