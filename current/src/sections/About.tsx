import React from "react";
import LandingStars from "../components/LandingStars";

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-2 py-1 text-white lg:text-yellow ring-1 ring-white lg:ring-yellow rounded-full max-sm:text-xs">
      {children}
    </span>
  );
}

export default function About() {
  return (
    <section className="relative w-full">
      <LandingStars />

      <div className="mx-auto flex flex-col-reverse lg:flex-row items-center w-full max-w-[1200px] lg:justify-between">
        {/* Left Side */}
        <img
          src="/images/Splash.png"
          alt="HackTX 2025 Logo"
          className="select-none"
          draggable={false}
        />

        {/* Right Side */}
        <div className="mt-24 mb-8 flex flex-col justify-center items-center lg:items-end text-center lg:text-right">
          <div className="flex gap-5 justify-center mb-8">
            <Tag>Oct 18-19</Tag>
            <Tag>Austin, TX</Tag>
            <Tag>24 Hours</Tag>
          </div>

          <img
            src="/images/HackTX25_title.png"
            alt="HackTX 25"
            className="max-h-[263px] select-none"
            draggable={false}
          />

          <div className="text-white mt-0.5">
            <span className="text-xl">
              Applications close September 20th at 11:59PM CDT
            </span>
            <br />
            Want to volunteer, judge, or mentor?{" "}
            <a
              href="https://rodeo.freetailhackers.com/"
              className="underline whitespace-nowrap"
            >
              Apply here
            </a>
            <br />
            Interested in sponsoring us?{" "}
            <a
              href="mailto:corporate@freetailhackers.com"
              className="underline whitespace-nowrap"
            >
              Learn more
            </a>
          </div>
          <a
            href="https://rodeo.freetailhackers.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6"
          >
            <img
              src="/vectors/Fancy Button.svg"
              alt="Apply Now"
              className="group-hover:drop-shadow-custom transition-all ease-out"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
