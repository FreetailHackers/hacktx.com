import React from "react";

function NavbarLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} className="text-lg hover:drop-shadow-custom transition-all ease-out">
      {children}
    </a>
  );
}

function Button({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <button className="px-2.5 pb-0.5 bg-yellow text-blue rounded-full hover:cursor-pointer hover:shadow-[0px_0px_6px] hover:shadow-[#DDB945] transition-shadow">
        {children}
      </button>
    </a>
  );
}

export default function Navbar() {
  return (
    <nav className="fixed z-50 top-0 left-0 right-0">
      <div className="relative max-w-6xl h-[76px] mt-6 mx-auto flex justify-between items-center lg:bg-[#000C44B2]">
        <a href="https://freetailhackers.com/" target="_blank">
          <img
            className="h-auto mx-6 hover:drop-shadow-custom transition-all duration-300 ease-out"
            src="/images/HackTX25_logo.png"
            alt="Freetail Hackers Logo"
          />
        </a>

        <div className="flex gap-8 max-lg:hidden">
          <NavbarLink href="#about">About</NavbarLink>

          <Button href="https://forms.gle/SahZJw8p7s1gb7yEA">Apply</Button>
        </div>

        <a href="https://mlh.io/" target="_blank">
          <img
            className="absolute h-[144px] sm:h-auto right-6 top-2"
            src="/mlh_badge.svg"
          />
        </a>
      </div>
    </nav>
  );
}
