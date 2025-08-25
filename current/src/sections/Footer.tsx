import React from "react";

function Column({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-max mb-8">
      <h4 className="font-bold mb-4">{title}</h4>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function Link({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="underline hover:drop-shadow-custom transition-all ease-out"
    >
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    <footer>
      <div className="flex flex-row flex-wrap justify-between max-w-7xl mx-auto w-full my-10 text-white">
        <Column title="HackTX 2024">
          <Link href="https://hacktx.com/24/">Website</Link>
          <Link href="https://hacktx-2024.devpost.com/">Devpost</Link>
        </Column>

        <Column title="Other Resources">
          <Link href="https://uhsg.freetailhackers.com/">UHSG</Link>
        </Column>

        <Column title="Hacker Resources">
          <Link href="#">Devpost</Link>
          <Link href="#">Discord</Link>
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
        <a href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf" className="underline hover:drop-shadow-custom transition-all ease-out min-w-max" >
          Code of Conduct
        </a>
        <div className="text-right">Copyright @ Freetail Hackers 2025</div>
      </div>
    </footer>
  );
}
