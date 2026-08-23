/**
 * Tree — composite SVG assembled from the individual piece exports in
 * src/assets/Landing/Tree/, positioned using exact coordinates from Figma
 * (file GdrzfyuuOhawvuN3HhAGsT, node 5150:4624).
 *
 * The parent GROUP in Figma is 935 × 768, so the viewBox matches that.
 * Each <image> x/y/w/h = (figmaChild.x - group.x, figmaChild.y - group.y, w, h).
 *
 * Z-order matches Figma children order (index 0 = back, index 9 = front).
 * Vector 7 is exported from Figma and placed front-left; Vector 8's export is empty.
 *
 * Canopy pieces animate with a left→right wave (stagger delay ∝ center-x).
 * The stump does not animate.
 */

import vector1 from "../../assets/Landing/Tree/Vector 1.svg";
import stump from "../../assets/Landing/Tree/stump.svg";
import vector4 from "../../assets/Landing/Tree/Vector 4.svg";
import vector7 from "../../assets/Landing/Tree/Vector 7.svg";
import vector9 from "../../assets/Landing/Tree/Vector 9.svg";
import vector5 from "../../assets/Landing/Tree/Vector 5.svg";
import vector2 from "../../assets/Landing/Tree/Vector 2.svg";
import vector3 from "../../assets/Landing/Tree/Vector 3.svg";
import vector10 from "../../assets/Landing/Tree/Vector 10.svg";

interface Props {
  className?: string;
  style?: React.CSSProperties;
}

export default function Tree({ className = "", style }: Props) {
  return (
    <svg
      viewBox="0 0 935 768"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <style>{`
        @keyframes canopy-bob {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-14px); }
        }
        .canopy {
          animation: canopy-bob 3s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .canopy { animation: none; }
        }
      `}</style>

      {/* Vector 1 — main canopy crown, back-most layer; center-x ≈ 459 → delay 0.34s */}
      <g className="canopy" style={{ animationDelay: "0.34s" }}>
        <image href={vector1} x={93} y={149} width={732} height={362} />
      </g>

      {/* Stump — no animation */}
      <image href={stump} x={213} y={312} width={438} height={455} />

      {/* Vector 4 — upper back canopy; center-x ≈ 422 → delay 0.32s */}
      <g className="canopy" style={{ animationDelay: "0.32s" }}>
        <image href={vector4} x={181} y={60} width={523} height={241} />
      </g>

      {/* Vector 5 — right canopy cluster; center-x ≈ 766 → delay 0.57s */}
      <g className="canopy" style={{ animationDelay: "0.57s" }}>
        <image href={vector5} x={547} y={197} width={338} height={308} />
      </g>

      {/* Vector 2 — left canopy cluster; center-x ≈ 178 → delay 0.13s */}
      <g className="canopy" style={{ animationDelay: "0.13s" }}>
        <image href={vector2} x={0} y={220} width={357} height={255} />
      </g>

      {/* Vector 3 — right-mid canopy; center-x ≈ 665 → delay 0.50s */}
      <g className="canopy" style={{ animationDelay: "0.50s" }}>
        <image href={vector3} x={438} y={295} width={454} height={211} />
      </g>

      {/* Vector 10 — front upper canopy; center-x ≈ 449 → delay 0.34s */}
      <g className="canopy" style={{ animationDelay: "0.34s" }}>
        <image href={vector10} x={173} y={166} width={552} height={246} />
      </g>

      {/* Vector 7 — front-left leaf, rendered last so it sits on top; center-x ≈ 131 → delay 0.10s */}
      <g className="canopy" style={{ animationDelay: "0.64s" }}>
        <image href={vector7} x={550} y={460} width={171} height={103} />
      </g>
    </svg>
  );
}
