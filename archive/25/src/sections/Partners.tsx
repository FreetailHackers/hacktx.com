import React from "react";
import "./Partners.css";

export default function Partners() {
  return (
    <section className="relative my-20 max-w-5xl mx-auto" id="partners">
      <div className="absolute w-[1287px] h-[892px] -top-[600px] -z-10">
        <img src="./images/Sponsor Stars.png" alt="Sponsor Stars" />
      </div>
      <div className="absolute w-[1287px] h-[892px] -bottom-[200px] -z-10">
        <img src="./images/Sponsors To Footer Stars.png" alt="Sponsor Stars" />
      </div>
      <div className="absolute w-[1680px] h-[1200px] -z-10 overflow-visible">
        <img src="./images/Footer Nebula.png" alt="Footer Nebula" draggable={false} />
      </div>

      <div className="text-white mb-16">
        <h2 className="font-serif text-lg md:text-4xl font-bold text-center mb-2">a big thank you to our</h2>
        <h2 className="font-serif text-2xl md:text-5xl font-semibold text-center mb-4">amazing partners</h2>
        <p className="text-center text-sm md:text-lg">Want to join our constellation of partners?</p>
        <p className="text-center text-sm md:text-base">
          Contact us at{" "}
          <a href="mailto:corporate@freetailhackers.com" target="_blank" className="hover:drop-shadow-custom">
            corporate@freetailhackers.com
          </a>
        </p>
      </div>
      <div>
        <div className="flex flex-wrap gap-8 justify-center">
          <a href="https://northmarkstrategies.com/" target="_blank" className="partners corporate">
            <img
              src="./partners/Northmark.png"
              alt="Northmark Cloud & Compute"
              className="w-[120px] lg:w-[180px]"
            />
          </a>
          <a href="https://www.toyotafinancial.com/" target="_blank" className="partners corporate">
            <img
              src="./partners/Toyota.png"
              alt="Toyota Fiancial Services"
              className="w-[200px] lg:w-[300px]"
            />
          </a>
          <a href="https://usa.visa.com/" target="_blank" className="partners corporate">
            <img src="./partners/Visa.png" alt="Visa" className="w-[120px] lg:w-[200px]" />
          </a>
          <a href="https://www.deshaw.com/" target="_blank" className="partners corporate">
            <img src="./partners/DE Shaw.png" alt="D.E. Shaw & Co." className="w-[200px] lg:w-[300px]" />
          </a>
          <a href="https://www.capitalone.com/" target="_blank" className="partners corporate">
            <img src="./partners/Capital One.png" alt="Capital One" className="w-[140px] lg:w-[240px]" />
          </a>

          <a href="https://mastra.ai/" target="_blank" rel="nofollow" className="partners corporate">
            <img src="./partners/Mastra.png" alt="Mastra" className="w-[140px] lg:w-[240px]" />
          </a>
          <a
            href="https://itbridge-outreach.com/"
            target="_blank"
            rel="nofollow"
            className="partners corporate"
          >
            <img src="./partners/IT Bridge.png" alt="IT Bridge Outreach" className="w-[140px] lg:w-[240px]" />
          </a>

          <a
            href="https://nordvpn.com/hackathons"
            target="_blank"
            rel="nofollow"
            className="partners corporate"
          >
            <img src="./partners/NordVPN.png" alt="NordVPN" className="w-[140px] lg:w-[240px]" />
          </a>
          <a href="https://incogni.com/" target="_blank" rel="nofollow" className="partners corporate">
            <img src="./partners/Incogni.png" alt="Incogni" className="w-[140px] lg:w-[240px]" />
          </a>
          <a href="https://nordpass.com/" target="_blank" rel="nofollow" className="partners corporate">
            <img src="./partners/Nordpass.png" alt="Nordpass" className="w-[140px] lg:w-[240px]" />
          </a>
          <a href="https://saily.com/" target="_blank" rel="nofollow" className="partners corporate">
            <img src="./partners/Saily.png" alt="Saily" className="w-[140px] lg:w-[240px]" />
          </a>
          <a href="https://nordprotect.com/" target="_blank" rel="nofollow" className="partners corporate">
            <img src="./partners/Nord Protect.png" alt="Nord Protect" className="w-[140px] lg:w-[240px]" />
          </a>
          <a href="https://nexos.ai/" target="_blank" rel="nofollow" className="partners corporate">
            <img src="./partners/Nexos.png" alt="Nexos" className="w-[140px] lg:w-[240px]" />
          </a>

          <a href="https://cns.utexas.edu/" target="_blank" className="partners school">
            <img
              src="./partners/CNS.png"
              alt="College of Natural Sciences"
              className="w-[240px] lg:w-[420px]"
            />
          </a>
          <a
            href="https://cns.utexas.edu/academics/departments/computer-science"
            target="_blank"
            className="partners school"
          >
            <img
              src="./partners/CNS CS.png"
              alt="Department of Computer Science"
              className="w-[220px] lg:w-[320px]"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
