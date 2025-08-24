import React from "react";

export default function Button({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <button className="px-2.5 py-0.5 bg-yellow text-blue rounded-full hover:cursor-pointer hover:shadow-[0px_0px_6px] hover:shadow-[#DDB945] transition-shadow">
        {children}
      </button>
    </a>
  );
}
