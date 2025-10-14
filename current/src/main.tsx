import { StrictMode, useEffect, PropsWithChildren } from "react";
import { createRoot } from "react-dom/client";
import "./globals.css";
import App from "./App.tsx";

function HashScroller({ children }: PropsWithChildren) {
  useEffect(() => {
    function scrollToHash(retries = 10) {
      const hash = window.location.hash;
      if (!hash) return;
      const id = hash.startsWith("#") ? hash.slice(1) : hash;
      const el = document.getElementById(id);
      if (el) {
        try {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } catch (e) {
          el.scrollIntoView();
        }
      } else if (retries > 0) {
        setTimeout(() => scrollToHash(retries - 1), 100);
      }
    }

    scrollToHash();

    const onHashChange = () => scrollToHash(10);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return <>{children}</>;
}

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <HashScroller>
      <App />
    </HashScroller>
  </StrictMode>,
);
