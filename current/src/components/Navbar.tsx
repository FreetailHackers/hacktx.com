import { useEffect, useRef, useState, useSyncExternalStore, type MouseEvent } from "react";
import signSvg from "../assets/navbar/sign.svg";
import signSource from "../assets/navbar/sign.svg?raw";
import dropdownSvg from "../assets/navbar/dropdown.svg";
import dropdownSource from "../assets/navbar/dropdown.svg?raw";

const motionQuery = "(prefers-reduced-motion: reduce)";

function subscribeToMotion(onChange: () => void) {
  const media = window.matchMedia(motionQuery);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [settled, setSettled] = useState(false);
  const [lettering] = useState(() => {
    const parser = new DOMParser();
    const signPaths = parser.parseFromString(signSource, "image/svg+xml").querySelectorAll("path");
    const dropdownPaths = parser.parseFromString(dropdownSource, "image/svg+xml").querySelectorAll("path");
    return {
      sign: signPaths[signPaths.length - 1].getAttribute("d") ?? "",
      schedule: dropdownPaths[dropdownPaths.length - 3].getAttribute("d") ?? "",
      faq: dropdownPaths[dropdownPaths.length - 1].getAttribute("d") ?? "",
    };
  });
  const navRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const entranceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reducedMotion = useSyncExternalStore(
    subscribeToMotion,
    () => window.matchMedia(motionQuery).matches,
    () => false,
  );
  const interactive = open && (settled || reducedMotion);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav || reducedMotion) return;
    const desktop = window.matchMedia("(min-width: 768px)");
    const readPosition = () => window.scrollY + document.body.scrollTop;
    let frame = 0;
    let angle = 0;
    let angularVelocity = 0;
    let targetAngle = 0;
    let previousPosition = readPosition();
    let previousScrollTime = performance.now();
    let previousFrameTime = previousScrollTime;
    let lastScrollTime = previousScrollTime;

    function reset() {
      cancelAnimationFrame(frame);
      frame = 0;
      angle = 0;
      angularVelocity = 0;
      targetAngle = 0;
      previousPosition = readPosition();
      previousScrollTime = performance.now();
      nav!.style.setProperty("--navbar-sway", "0deg");
    }

    function animate(now: number) {
      const elapsed = Math.min((now - previousFrameTime) / 1000, 0.032);
      previousFrameTime = now;
      if (now - lastScrollTime > 100) targetAngle = 0;
      angularVelocity += (targetAngle - angle) * 80 * elapsed;
      angularVelocity *= Math.exp(-9 * elapsed);
      angle = Math.max(-2.5, Math.min(2.5, angle + angularVelocity * elapsed));
      if (Math.abs(angle) === 2.5 && Math.sign(angularVelocity) === Math.sign(angle)) {
        angularVelocity = 0;
      }
      if (targetAngle === 0 && Math.abs(angle) < 0.005 && Math.abs(angularVelocity) < 0.03) {
        reset();
        return;
      }
      nav!.style.setProperty("--navbar-sway", `${angle.toFixed(3)}deg`);
      frame = requestAnimationFrame(animate);
    }

    function onScroll(event: Event) {
      if (!desktop.matches) return;
      const target = event.target;
      if (target !== window && target !== document && target !== document.body && target !== document.documentElement) return;
      const now = performance.now();
      const position = readPosition();
      const speed = (position - previousPosition) / Math.max(now - previousScrollTime, 16);
      previousPosition = position;
      previousScrollTime = now;
      lastScrollTime = now;
      targetAngle = Math.max(-2.5, Math.min(2.5, speed * 0.5));
      if (!frame) {
        previousFrameTime = now;
        frame = requestAnimationFrame(animate);
      }
    }

    window.addEventListener("scroll", onScroll, { capture: true, passive: true });
    desktop.addEventListener("change", reset);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      desktop.removeEventListener("change", reset);
      reset();
    };
  }, [reducedMotion]);

  useEffect(() => {
    entranceTimer.current = setTimeout(() => {
      setOpen(true);
      entranceTimer.current = null;
    }, window.matchMedia(motionQuery).matches ? 0 : 280);
    return () => {
      if (entranceTimer.current !== null) clearTimeout(entranceTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!open || !reducedMotion) return;
    setSettled(true);
  }, [open, reducedMotion]);

  useEffect(() => {
    function dismiss() {
      if (entranceTimer.current !== null) {
        clearTimeout(entranceTimer.current);
        entranceTimer.current = null;
      }
      if (panelRef.current?.contains(document.activeElement)) {
        buttonRef.current?.focus({ preventScroll: true });
      }
      setOpen(false);
      setSettled(false);
    }

    function onPointerDown(event: PointerEvent) {
      if (event.target instanceof Node && !navRef.current?.contains(event.target)) dismiss();
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && open) {
        dismiss();
        buttonRef.current?.focus({ preventScroll: true });
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function toggle() {
    if (entranceTimer.current !== null) {
      clearTimeout(entranceTimer.current);
      entranceTimer.current = null;
    }
    setSettled(false);
    setOpen(previous => !previous);
  }

  function navigate(event: MouseEvent<HTMLAnchorElement>, destination: string) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const section = document.getElementById(destination);
    if (!section) return;
    event.preventDefault();
    if (window.location.hash !== `#${destination}`) {
      window.history.pushState(null, "", `#${destination}`);
    }
    section.focus({ preventScroll: true });
    section.scrollIntoView({ behavior: reducedMotion ? "instant" : "smooth", block: "start" });
  }

  return (
    <nav ref={navRef} className="storybook-nav" aria-label="Main navigation" data-open={open}>
      <svg className="storybook-nav-sign" viewBox="0 45 262 172" aria-hidden="true">
        <image href={signSvg} width="262" height="217" />
        <path className="storybook-nav-lettering storybook-nav-sign-lettering" d={lettering.sign} />
      </svg>
      <button
        ref={buttonRef}
        type="button"
        className="storybook-nav-toggle"
        aria-label={open ? "Close navigation" : "Open navigation"}
        title={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="storybook-navigation-links"
        onClick={toggle}
      />
      <div
        className="storybook-nav-dropdown"
        onTransitionEnd={event => {
          if (event.target === event.currentTarget && event.propertyName === "--navbar-reveal") {
            setSettled(open);
          }
        }}
      >
        <div className="storybook-nav-sheet">
          <svg viewBox="0 0 261 153" className="storybook-nav-art" aria-hidden="true">
            <svg x="0" y="0" width="261" height="84" viewBox="0 0 261 84" overflow="hidden">
              <image href={dropdownSvg} width="261" height="185" />
            </svg>
            <svg x="0" y="84" width="261" height="69" viewBox="0 116 261 69" overflow="hidden">
              <image href={dropdownSvg} width="261" height="185" />
            </svg>
          </svg>
          <svg viewBox="0 0 261 153" className="storybook-nav-lettering-overlay" aria-hidden="true">
            <path className="storybook-nav-lettering storybook-nav-schedule-lettering" d={lettering.schedule} />
            <path className="storybook-nav-lettering storybook-nav-faq-lettering" d={lettering.faq} transform="translate(0 -32)" />
          </svg>
          <div ref={panelRef} id="storybook-navigation-links" inert={!interactive}>
            <a className="storybook-nav-link storybook-nav-schedule" href="#schedule" onClick={event => navigate(event, "schedule")}>
              <span className="sr-only">Schedule</span>
            </a>
            <a className="storybook-nav-link storybook-nav-faq" href="#faq" onClick={event => navigate(event, "faq")}>
              <span className="sr-only">FAQs</span>
            </a>
          </div>
        </div>
        <svg viewBox="0 161 261 16" className="storybook-nav-roll" aria-hidden="true">
          <image href={dropdownSvg} width="261" height="185" />
        </svg>
      </div>
    </nav>
  );
}