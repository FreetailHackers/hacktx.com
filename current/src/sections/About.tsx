import React from "react";

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-2 py-1 text-yellow ring-1 ring-yellow text-blue rounded-full text-sm font-semibold">
      {children}
    </span>
  );
}

export default function About() {
  return (
    <section className="relative w-screen">
      <img
        src="/vectors/Landing Stars.svg"
        alt="Landing Background"
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1605px] object-fill select-none pointer-events-none"
        draggable={false}
      />

      <div className="mx-auto flex flex-row w-screen max-w-[1200px] justify-between">
        <img
          src="/images/Splash.png"
          alt="HackTX 2025 Logo"
          className="select-none"
          draggable={false}
        />

        <div className="flex flex-col justify-center items-end">
          <div className="flex gap-5 justify-center mb-8">
            <Tag>Mid-October</Tag>
            <Tag>Austin, TX</Tag>
            <Tag>24 Hours</Tag>
          </div>

          <img
            src="/images/HackTX25_title.png"
            alt="HackTX 25"
            className="max-h-[263px] select-none"
            draggable={false}
          />

          <div className="text-right text-base text-white mt-0.5">
            Applications open August 25th at 9:00 AM CDT
            <br />
            Interested in sponsoring us?{" "}
            <a
              href="mailto:corporate@freetailhackers.com"
              className="underline"
            >
              Learn More
            </a>
          </div>

          <a href="https://forms.gle/SahZJw8p7s1gb7yEA" className="group mt-6">
            <img src="/vectors/Fancy Button.svg" alt="Apply Now" className="group-hover:drop-shadow-custom transition-all ease-out"/>
            {/* <img src="/vectors/Fancy Button.svg" alt="Apply Now" className="group-hover:hidden"/>
            <img src="/vectors/Fancy Button Glow.svg" alt="Apply Now" className="hidden group-hover:block"/> */}
          </a>
        </div>
      </div>
    </section>
  );
}
