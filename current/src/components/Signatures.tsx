import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import parchment from "../assets/signatures/openScroll.png";
import leftRoll from "../assets/signatures/leftScroll.png";
import rightRoll from "../assets/signatures/rightScroll.png";
import frame from "../assets/signatures/signatureFrame.png";
import feather from "../assets/signatures/feather.png";
import "./Signatures.css";

// Group 2 contains the clean ink exports; Yohanna appears only in group 1.
const signatureFiles = import.meta.glob<string>(
  ["../assets/signatures/signatureGroup2/*.png", "../assets/signatures/signatureGroup1/Yohanna 1.png"],
  { eager: true, query: "?url", import: "default" },
);
const organizers = Array.from(
  Object.entries(signatureFiles).sort(([a], [b]) => a.localeCompare(b)).reduce(
    (people, [path, src]) => {
      const name = path.split("/").pop()!.replace(/(?: 1)?\.png$/, "");
      people.set(name, { name, src });
      return people;
    },
    new Map<string, { name: string; src: string }>(),
  ).values(),
).sort((a, b) => a.name.localeCompare(b.name));

const motionQuery = "(prefers-reduced-motion: reduce)";

export default function Signatures() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const featherRef = useRef<HTMLImageElement>(null);
  const dragRef = useRef<{ id: number; x: number; scroll: number } | null>(null);
  const [opened, setOpened] = useState(false);
  const [position, setPosition] = useState({ start: true, end: false, progress: 0 });

  useEffect(() => {
    if (opened) return;
    let pendingFrame = 0;
    function checkVisibility() {
      pendingFrame = 0;
      const rect = scrollRef.current?.getBoundingClientRect();
      if (rect && rect.top < window.innerHeight - Math.min(rect.height * 0.2, 120) && rect.bottom > 0) {
        setOpened(true);
      }
    }
    function scheduleCheck() {
      if (!pendingFrame) pendingFrame = requestAnimationFrame(checkVisibility);
    }
    // This site can scroll on body rather than window. Capture both, and
    // check after layout so direct #signatures links also open the parchment.
    scheduleCheck();
    window.addEventListener("scroll", scheduleCheck, { capture: true, passive: true });
    window.addEventListener("resize", scheduleCheck);
    return () => {
      cancelAnimationFrame(pendingFrame);
      window.removeEventListener("scroll", scheduleCheck, true);
      window.removeEventListener("resize", scheduleCheck);
    };
  }, [opened]);

  useEffect(() => {
    const gallery = galleryRef.current;
    const section = sectionRef.current;
    const quill = featherRef.current;
    if (!gallery || !section || !quill) return;
    const reducedMotion = window.matchMedia(motionQuery);
    let animation = 0;
    let previousTime = 0;
    let lastMovement = 0;
    let strength = 0;
    let phase = 0;
    let direction = 1;
    let previousX = gallery.scrollLeft;
    const readPageScroll = () => window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
    let previousY = readPageScroll();

    function updatePosition() {
      const maximum = gallery!.scrollWidth - gallery!.clientWidth;
      const offset = gallery!.scrollLeft;
      setPosition({ start: offset <= 1, end: offset >= maximum - 1, progress: maximum > 0 ? offset / maximum : 0 });
    }

    function resetFeather() {
      cancelAnimationFrame(animation);
      animation = 0;
      strength = 0;
      quill!.style.removeProperty("transform");
    }

    function animate(now: number) {
      const elapsed = Math.min(now - previousTime, 40);
      previousTime = now;
      const target = now - lastMovement < 140 ? 1 : 0;
      strength += (target - strength) * (1 - Math.exp(-elapsed / 110));
      phase += elapsed * 0.016;
      const angle = (Math.sin(phase) * 7 + direction * 3) * strength;
      quill!.style.transform = `translate(${Math.sin(phase * 0.7) * 4 * strength}px, ${Math.cos(phase * 1.3) * 3 * strength}px) rotate(${angle}deg)`;
      if (!target && strength < 0.002) {
        resetFeather();
        return;
      }
      animation = requestAnimationFrame(animate);
    }

    function moveFeather(delta: number) {
      if (reducedMotion.matches || Math.abs(delta) < 0.1) return;
      const rect = section!.getBoundingClientRect();
      if (rect.bottom <= 0 || rect.top >= window.innerHeight) return;
      direction = Math.sign(delta);
      lastMovement = performance.now();
      if (!animation) {
        previousTime = lastMovement;
        animation = requestAnimationFrame(animate);
      }
    }

    function onGalleryScroll() {
      updatePosition();
      moveFeather(gallery!.scrollLeft - previousX);
      previousX = gallery!.scrollLeft;
    }

    function onPageScroll(event: Event) {
      if (event.target !== window && event.target !== document && event.target !== document.body && event.target !== document.documentElement) return;
      const pageScroll = readPageScroll();
      moveFeather(pageScroll - previousY);
      previousY = pageScroll;
    }

    // A mouse wheel can browse the parchment too. At either end, let the
    // normal page scroll continue; trackpad horizontal gestures stay native.
    function onWheel(event: WheelEvent) {
      if (event.ctrlKey || Math.abs(event.deltaX) >= Math.abs(event.deltaY)) return;
      const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? gallery!.clientWidth : 1);
      const maximum = gallery!.scrollWidth - gallery!.clientWidth;
      const canMove = delta > 0 ? gallery!.scrollLeft < maximum - 1 : gallery!.scrollLeft > 1;
      if (canMove) {
        event.preventDefault();
        gallery!.scrollLeft += delta;
      }
    }

    const resizeObserver = new ResizeObserver(updatePosition);
    resizeObserver.observe(gallery);
    updatePosition();
    gallery.addEventListener("scroll", onGalleryScroll, { passive: true });
    gallery.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onPageScroll, { capture: true, passive: true });
    reducedMotion.addEventListener("change", resetFeather);
    return () => {
      resizeObserver.disconnect();
      gallery.removeEventListener("scroll", onGalleryScroll);
      gallery.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onPageScroll, true);
      reducedMotion.removeEventListener("change", resetFeather);
      resetFeather();
    };
  }, []);

  function scrollTo(left: number) {
    galleryRef.current?.scrollTo({
      left,
      behavior: window.matchMedia(motionQuery).matches ? "instant" : "smooth",
    });
  }

  function browse(direction: number) {
    const gallery = galleryRef.current;
    if (gallery) scrollTo(gallery.scrollLeft + direction * gallery.clientWidth * 0.8);
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const gallery = galleryRef.current;
    if (!gallery) return;
    switch (event.key) {
      case "ArrowRight": browse(1); break;
      case "ArrowLeft": browse(-1); break;
      case "Home": scrollTo(0); break;
      case "End": scrollTo(gallery.scrollWidth); break;
      default: return;
    }
    event.preventDefault();
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    dragRef.current = { id: event.pointerId, x: event.clientX, scroll: event.currentTarget.scrollLeft };
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    const delta = event.clientX - drag.x;
    if (Math.abs(delta) > 4) {
      event.currentTarget.setPointerCapture(event.pointerId);
      event.currentTarget.dataset.dragging = "true";
      event.currentTarget.scrollLeft = drag.scroll - delta;
    }
  }

  function endDrag(event: PointerEvent<HTMLDivElement>) {
    dragRef.current = null;
    delete event.currentTarget.dataset.dragging;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }

  return (
    <section id="signatures" className="signatures-section" ref={sectionRef} aria-labelledby="signatures-title" data-open={opened}>
      <header className="signatures-heading">
        <h2 id="signatures-title">With Love,<br /><span>The Freetail Fam</span></h2>
        <p>Written by:</p>
      </header>

      <div className="signature-scroll" ref={scrollRef}>
        <div className="signature-scroll-paper">
          <img className="signature-parchment" src={parchment} alt="" aria-hidden="true" draggable={false} />
          <div
            id="organizer-signatures"
            className="signature-gallery"
            ref={galleryRef}
            role="region"
            aria-label="Organizer signatures"
            aria-describedby="signatures-instructions"
            tabIndex={0}
            onKeyDown={onKeyDown}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onLostPointerCapture={endDrag}
            onPointerLeave={event => {
              if (!event.currentTarget.hasPointerCapture(event.pointerId)) endDrag(event);
            }}
          >
            <ul className="signature-gallery-track">
              {organizers.map(({ name, src }) => (
                <li className="signature-card" key={name}>
                  <div className="signature-portrait">
                    <img className="signature-frame" src={frame} alt="" aria-hidden="true" draggable={false} />
                    <img className="signature-ink" src={src} alt={`${name}'s signature`} draggable={false} loading="lazy" />
                  </div>
                  <span className="signature-name">{name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <img className="signature-roll signature-roll-left" src={leftRoll} alt="" aria-hidden="true" draggable={false} />
        <img className="signature-roll signature-roll-right" src={rightRoll} alt="" aria-hidden="true" draggable={false} />
        <div className="signature-feather" aria-hidden="true">
          <img ref={featherRef} src={feather} alt="" draggable={false} />
        </div>
      </div>

      <div className="signatures-navigation">
        <span id="signatures-instructions" className="sr-only">Use the left and right arrow keys to browse, or Home and End to jump to the first and last signatures.</span>
        <div className="signatures-controls">
          <button type="button" onClick={() => browse(-1)} disabled={position.start} aria-label="Previous signatures" aria-controls="organizer-signatures">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 12H4m6-6-6 6 6 6" /></svg>
          </button>
          <div className="signatures-progress" aria-hidden="true"><span style={{ transform: `translateX(${position.progress * 300}%)` }} /></div>
          <button type="button" onClick={() => browse(1)} disabled={position.end} aria-label="Next signatures" aria-controls="organizer-signatures">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}
