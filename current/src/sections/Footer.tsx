import React from "react";

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-w-max mb-8">
      <h4 className="font-bold mb-4">{title}</h4>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function Link({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="underline hover:drop-shadow-custom transition-all ease-out" target="_blank">
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="relative max-w-7xl w-full mx-auto">
      <div className="absolute w-[1680px] h-[1200px] -z-10 overflow-visible">
        <img src="/images/Footer Nebula.png" alt="Footer Nebula" draggable={false} />
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 w-[1400px] h-[970px] top-[180px] -z-10">
        <img
          src="/vectors/Footer Stars.svg"
          alt="Footer Stars"
          draggable={false}
          className="w-[1400px] h-[970px]"
        />
      </div>
      <div className="w-min lg:absolute">
        <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-2.5">
          <img src="/vectors/FH Bat.svg" alt="logo" draggable={false} className="inline" />
          Freetail hackers
        </h3>
        <div className="mb-3">
          <a href="https://freetailhackers.com" className="text-grey">
            freetailhackers.com
          </a>
          <br />
          <a href="mailto:admin@freetailhackers.com" className="text-grey">
            admin@freetailhackers.com
          </a>
        </div>
        <div className="flex flex-row gap-3">
          <a
            href="https://www.linkedin.com/company/freetail-hackers"
            className="hover:drop-shadow-custom transition-all ease-out"
          >
            <img src="/vectors/linkedin.svg" />
          </a>
          <a
            href="https://www.instagram.com/freetailhackers"
            className="hover:drop-shadow-custom transition-all ease-out"
          >
            <img src="/vectors/instagram.svg" />
          </a>
          <a
            href="https://www.facebook.com/freetailhackers/ "
            className="hover:drop-shadow-custom transition-all ease-out"
          >
            <img src="/vectors/facebook.svg" />
          </a>
          <a
            href="https://www.tiktok.com/@freetailhackers"
            className="hover:drop-shadow-custom transition-all ease-out"
          >
            <img src="/vectors/tiktok.svg" />
          </a>
          <a
            href="https://x.com/freetailhackers"
            className="hover:drop-shadow-custom transition-all ease-out"
          >
            <img src="/vectors/twitter.svg" />
          </a>
        </div>
      </div>
      <div>
        <img
          src="/images/Freetail Constellation.png"
          alt="Freetail Constellation"
          draggable={false}
          className="w-full mt-10"
        />
      </div>
      <div className="flex flex-row flex-wrap justify-between w-full my-10 text-white">
        <Column title="HackTX 2024">
          <Link href="https://hacktx.com/24/">Website</Link>
          <Link href="https://hacktx-2024.devpost.com/">Devpost</Link>
        </Column>

        <Column title="Other Resources">
          <Link href="https://uhsg.freetailhackers.com/">UHSG</Link>
        </Column>

        <Column title="Hacker Resources">
          <Link href="https://hacktx2025.devpost.com">Devpost</Link>
          <Link href="https://discord.gg/PE8bUBQMfr">Discord</Link>
          <Link href="https://mlh.io/seasons/2025/events">MLH</Link>
        </Column>

        <Column title="Other Hackathons">
          <Link href="https://th25.tamuhack.org/">TAMUHack</Link>
          <Link href="https://hackuta.org/">HackUTA</Link>
          <Link href="https://hackutd.co/">HackUTD</Link>
          <Link href="https://www.unthackathon.com/">HackUNT</Link>
          <Link href="https://rowdyhacks.org/">RowdyHacks</Link>
          <Link href="https://www.hackrice.com/">HackRice</Link>
        </Column>
      </div>
      <div className="py-6 w-full flex flex-row flex-wrap justify-between max-w-7xl mx-auto text-grey">
        <a
          href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf"
          className="underline hover:drop-shadow-custom transition-all ease-out min-w-max"
        >
          Code of Conduct
        </a>
        <div className="text-right">Copyright @ Freetail Hackers 2025</div>
      </div>
      <div className="relative h-[400px]">
        <div className="absolute left-1/2 -translate-x-1/2 w-[1287px] h-[892px] -top-[400px] -z-10 overflow-visible">
          <img src="/images/Footer Stars 2.png" alt="Footer Stars 2" draggable={false} />
        </div>
        <h2 className="font-serif text-5xl text-white mt-20">
          What's in your <br /> future?
        </h2>
      </div>
    </footer>
  );
}
