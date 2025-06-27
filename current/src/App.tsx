import React from "react";

function App() {
  return (
    <>
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-5">
        <div className="relative flex w-full justify-between">
          <a href="https://freetailhackers.com/" target="_blank">
            <img
              className="relative top-3 left-3 size-9"
              src="/freetail_logo.png"
            />
          </a>

          <a href="https://mlh.io/" target="_blank">
            <img
              className="relative h-[144px] sm:h-auto xl:right-20"
              src="/mlh_badge.svg"
            />
          </a>
        </div>
        <div className="relative flex w-full flex-1 flex-col items-center justify-center gap-y-5 sm:bottom-4 sm:gap-y-12 xl:bottom-12">
          <p className="text-2xl uppercase sm:text-3xl">COMING SOON</p>

          <div>
            <img
              className="w-full max-w-[56.25rem] min-w-[22.5rem]"
              src="/heading.svg"
            />
          </div>

          <p className="mb-5 text-2xl uppercase sm:text-3xl">MID OCTOBER</p>
        
          <a href="https://forms.gle/SahZJw8p7s1gb7yEA" target="_blank">
            <button className="transition-shadow hover:cursor-pointer hover:shadow-[0px_0px_14px] hover:shadow-[#DDB945]">
              <img src="/interest_form.svg"/>
            </button>
          </a>
        </div>

        <footer className="mt-auto flex w-full flex-col items-center justify-between gap-3 pb-6 sm:flex-row xl:px-20 xl:pb-20">
          <a
            className="uppercase underline"
            href="https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md"
            target="_blank"
          >
            CODE OF CONDUCT
          </a>

          <p className="uppercase">COPYRIGHT @ FREETAIL HACKERS 2025</p>
        </footer>
      </main>

      <img
        src="/stars_bg.svg"
        className="absolute inset-0 size-full object-cover"
        alt="Background Stars"
      />
    </>
  );
}

export default App;
