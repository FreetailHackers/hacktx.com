import { useState, useRef, useLayoutEffect } from "react";
import cardFront from "../assets/prizes/front.png";
import cardBack from "../assets/prizes/card-back.png";

interface PrizeTrack {
  id: string;
  name: string;
  prize: string;
}

interface PrizeDeck {
  id: string;
  category: string;
  tracks: PrizeTrack[];
}

const DECKS: PrizeDeck[] = [
  {
    id: "hacktx",
    category: "HackTX Tracks",
    tracks: [
      { id: "best-overall",      name: "Cinderella's Castle (Best Overall)",       prize: "MacBook Pro 14\"" },
      { id: "best-hardware",     name: "Brick House (Best Hardware Hack)",          prize: "Nvidia RTX 5080" },
      { id: "best-novice",       name: "First Chapter (Best Novice Hack)",          prize: "Ray-Ban Meta Glasses" },
      { id: "most-entertaining", name: "Jester's Court (Most Entertaining)",        prize: "PlayStation 5" },
      { id: "best-pitch",        name: "Bard's Tale (Best Pitch)",                  prize: "TBD" },
    ],
  },
  {
    id: "sponsors",
    category: "Sponsor Tracks",
    tracks: [
      { id: "meta",        name: "Meta: Bringing People Closer Together with AI",    prize: "Trip to Meta HQ + Swag Bag" },
      { id: "serpapi",     name: "SerpApi: Best Use of SerpApi",                     prize: "ARZOPA Portable Monitors" },
      { id: "nmc2",        name: "NMC²: Build the Platform Behind the Agent",        prize: "1st: AirPods Max Gen 2\n2nd: Apple Watch Series 12\n3rd: Echo Show 11" },
      { id: "capital-one", name: "Capital One: Best Use of Nessie",                 prize: "$250 Giftogram Gift Card / member" },
      { id: "toyota",      name: "Toyota Financial Services: What's Your Next Move?", prize: "1st: $500 Amazon Gift Card\n2nd: $350 Amazon Gift Card\n3rd: $150 Amazon Gift Card" },
    ],
  },
  {
    id: "mlh",
    category: "MLH Tracks",
    tracks: [
      { id: "mlh-spacexsi",  name: "MLH: Build Your A-Team with SpaceXSI", prize: "Cursor Mechanical Keyboard" },
      { id: "mlh-gemini",    name: "MLH: Best Use of Gemini API",          prize: "MLH Swag Kit" },
      { id: "mlh-solana",    name: "MLH: Best Use of Solana",              prize: "Unruggable Hardware Wallet" },
      { id: "mlh-tiger",     name: "MLH: Best Use of Tiger Data",          prize: "Stream Deck Mini" },
      { id: "mlh-vultr",     name: "MLH: Best Use of Vultr",               prize: "M5Stack Official Tab5" },
      { id: "mlh-snowflake", name: "MLH: Best Use of Snowflake API",       prize: "Arduino Student Kit" },
      { id: "mlh-tech",      name: "MLH: Best .Tech Domain Name",          prize: "Desktop Mic + .Tech Domain (10 yrs)" },
    ],
  },
];

// ── Individual flippable card ───────────────────────────────────────────────
function PrizeCard({ track }: { track: PrizeTrack }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      className="prize-card"
      onClick={() => setFlipped((f) => !f)}
      aria-label={`${track.name} — click to reveal prize`}
      aria-pressed={flipped}
    >
      <div className={`prize-card-inner${flipped ? " prize-card-inner--flipped" : ""}`}>
        {/* Face shown first — decorative ribbon/book front */}
        <div className="prize-card-face prize-card-face--front">
          <img src={cardFront} alt="" className="prize-card-img" draggable={false} />
        </div>
        {/* Revealed on click — parchment with prize text */}
        <div className="prize-card-face prize-card-face--back">
          <img src={cardBack} alt="" className="prize-card-img" draggable={false} />
          <div className="prize-card-back-text">
            <p className="prize-card-prize-label">{track.prize}</p>
          </div>
        </div>
      </div>
      {/* Track name appears on hover as a tooltip above the card */}
      <div className="prize-card-name-overlay" aria-hidden="true">
        {track.name}
      </div>
    </button>
  );
}

// ── Stacked deck pile ───────────────────────────────────────────────────────
function DeckPile({
  deck,
  active,
  onClick,
  wrapperRef,
}: {
  deck: PrizeDeck;
  active: boolean;
  onClick: () => void;
  wrapperRef: (el: HTMLDivElement | null) => void;
}) {
  const shadowCount = Math.min(deck.tracks.length - 1, 3);

  return (
    <div className="prize-deck-wrapper" ref={wrapperRef}>
      <button
        className={`prize-deck-stack${active ? " prize-deck-stack--active" : ""}`}
        onClick={onClick}
        aria-label={`${active ? "Close" : "Open"} ${deck.category}`}
        aria-expanded={active}
      >
        {/* Shadow cards peeking behind and below */}
        {Array.from({ length: shadowCount }).map((_, i) => (
          <div
            key={i}
            className="prize-deck-shadow"
            style={{
              bottom: `${(i + 1) * 11}px`,
              left:   `${(i + 1) * 7}px`,
              right:  `${-(i + 1) * 7}px`,
              zIndex: shadowCount - i,
              opacity: 0.45 + i * 0.18,
            }}
          >
            <img src={cardFront} alt="" className="prize-card-img" draggable={false} />
          </div>
        ))}
        {/* Top card */}
        <div className="prize-deck-top">
          <img src={cardFront} alt="" className="prize-card-img" draggable={false} />
          <div className="prize-deck-count">{deck.tracks.length} tracks</div>
        </div>
      </button>

      <p className="prize-deck-category">{deck.category}</p>
    </div>
  );
}

// ── Fan strip ── cards fly from the deck to a centered grid ─────────────────
function FanStrip({
  deck,
  deckEl,
}: {
  deck: PrizeDeck;
  deckEl: HTMLDivElement | null;
}) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    // Measure the deck origin HERE — same moment as cards, same coordinate frame
    const topCard = deckEl?.querySelector<HTMLElement>(".prize-deck-top");
    const originEl = topCard ?? deckEl;
    if (!originEl) return;

    const originRect = originEl.getBoundingClientRect();
    const originCX = originRect.left + originRect.width / 2;
    const originCY = originRect.top + originRect.height / 2;

    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cardCX = rect.left + rect.width / 2;
      const cardCY = rect.top + rect.height / 2;

      // Vector from card's natural position back to the deck origin
      const dx = originCX - cardCX;
      const dy = originCY - cardCY;

      // Snap to deck position instantly (no transition)
      el.style.transition = "none";
      el.style.transform = `translate(${dx}px, ${dy}px) scale(0.35)`;
      el.style.opacity = "0";

      // Double-rAF forces browser to paint the "snapped" state before animating
      const delay = i * 65;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.style.transition = [
            `transform 0.52s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
            `opacity 0.3s ease ${delay}ms`,
          ].join(", ");
          el.style.transform = "";
          el.style.opacity = "1";
        });
      });
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deck.id]);

  return (
    <div
      className="prize-fan-strip"
      role="region"
      aria-label={`${deck.category} cards`}
    >
      {deck.tracks.map((track, i) => (
        <div
          key={track.id}
          ref={(el) => { cardRefs.current[i] = el; }}
          className="prize-fan-card-wrapper"
        >
          <PrizeCard track={track} />
        </div>
      ))}
    </div>
  );
}

// ── Section ────────────────────────────────────────────────────────────────
export default function Prizes() {
  const [openDeck, setOpenDeck] = useState<string | null>(null);
  const deckWrapperRefs         = useRef<(HTMLDivElement | null)[]>([]);

  const activeDeckIndex = DECKS.findIndex((d) => d.id === openDeck);
  const activeDeck      = activeDeckIndex >= 0 ? DECKS[activeDeckIndex] : null;

  function handleDeckClick(deckId: string) {
    setOpenDeck((prev) => (prev === deckId ? null : deckId));
  }

  return (
    <section className="prizes-section" id="prizes" aria-labelledby="prizes-title">
      <div className="prizes-inner">
        <h2 id="prizes-title" className="prizes-title">Prizes</h2>

        {/* Three deck piles — always visible */}
        <div className="prizes-decks-row">
          {DECKS.map((deck, i) => (
            <DeckPile
              key={deck.id}
              deck={deck}
              active={openDeck === deck.id}
              onClick={() => handleDeckClick(deck.id)}
              wrapperRef={(el) => { deckWrapperRefs.current[i] = el; }}
            />
          ))}
        </div>

        {/* Fan strip — remounts on deck switch so animation always replays from correct deck */}
        {activeDeck && (
          <FanStrip
            key={activeDeck.id}
            deck={activeDeck}
            deckEl={deckWrapperRefs.current[activeDeckIndex]}
          />
        )}
      </div>
    </section>
  );
}
