import React from "react";

import Button from "./Button";

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

export default function Navbar() {
  return (
    <nav className="fixed z-50 top-0 left-0 right-0">
      <div className="relative max-w-7xl h-[76px] mt-6 mx-auto px-3 flex justify-between items-center bg-[#000C4446]">
        <a href="https://freetailhackers.com/" target="_blank">
          <img
            className="h-[72px] sm:h-auto hover:drop-shadow-custom transition-all duration-300 ease-out"
            src="/images/HackTX25_logo.png"
            alt="Freetail Hackers Logo"
          />
        </a>

        <div className="flex gap-8">
          <NavbarLink href="#about">About</NavbarLink>
          <NavbarLink href="#schedule">Schedule</NavbarLink>
          <NavbarLink href="#tracks">Tracks</NavbarLink>
          <NavbarLink href="#faq">FAQ</NavbarLink>

          <Button href="https://forms.gle/SahZJw8p7s1gb7yEA">Apply</Button>
        </div>

        <a href="https://mlh.io/" target="_blank">
          <img
            className="absolute h-[144px] sm:h-auto xl:right-6 top-3"
            src="/mlh_badge.svg"
          />
        </a>
      </div>
    </nav>
  );
}
