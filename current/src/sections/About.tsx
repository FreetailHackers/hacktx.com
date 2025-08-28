import React from "react";

export default function About() {
  return (
    <section className="relative my-40" id="about">
      <img src="/vectors/About Stars.svg" alt="About stars" className="absolute top-20 left-1/2 -translate-x-1/2 w-[1605px] overflow-visible select-none pointer-events-none" />
      <div className="mx-auto flex flex-row items-center w-full max-w-[1200px] lg:justify-between">
        <div className="max-w-[45%]">
          <img src="/images/HackTX25_title.png" alt="HackTX image" className="w-[87%]" draggable={false}/>
          <p className="text-white text-2xl font-light mt-10">
            HackTX is a 36 hour event where tech enthusiasts can come together
            to create something amazing together!
          </p>
        </div>
        <div className="relative max-w-[45%] mt-12 mb-40">
          <p className="text-white">
            With the best and the brightest of hackers from across the country
            coming to Austin, teams work together to find new tech solutions to
            important issues.
            <br /> <br/>
            Join us for HackTX 2025, and be part of an innovative tech
            tradition, where we’ve hosted over 5000+ participants and $100K+ in
            prizes across over a decades worth of HackTXs, with much more to
            come this year!
          </p>
          <span className="absolute right-2 -bottom-32 text-white text-center">
            <h2 className="font-serif text-5xl tracking-widest">5000+</h2>
            <p>participants</p>
          </span>
          <span className="absolute -left-4 -bottom-48 text-white text-center">
            <h2 className="font-serif text-5xl tracking-widest">$100K</h2>
            <p>in prizes</p>
          </span>
        </div>
      </div>
    </section>
  );
}
