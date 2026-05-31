"use client";

export default function About() {
  return (
    <section id="about" className="py-24 px-6 bg-[#f7f6f2]">
      <div className="max-w-5xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-5">
          <span className="w-6 h-0.5 bg-[#3B6D11]" />
          <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#3B6D11]">
            About the Summit
          </span>
        </div>

        {/* Title */}
        <h2
          className="text-[56px] sm:text-[72px] leading-none font-black text-[#1a2b1a] mb-6"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          What is GAMMAT{" "}
          <span
            style={{
              background:
                "linear-gradient(135deg, #e05c10 0%, #f4a200 30%, #3db340 60%, #1a70c8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            2026
          </span>
          ?
        </h2>

        {/* Body copy */}
        <p className="text-[#4a5a4a] text-lg leading-relaxed max-w-3xl mb-14">
          GAMMAT 2026 convenes{" "}
          <strong className="text-[#1a2b1a] font-semibold">
            ministers, regulators, CEOs, investors,
          </strong>{" "}
          and infrastructure developers under one influential platform — driving
          intra-African trade, AfCFTA implementation, port modernisation,
          aviation expansion, and smart mobility innovation. The future of
          Africa&apos;s competitiveness depends on integrated transport
          ecosystems — and this is where action meets capital.
        </p>
      </div>
    </section>
  );
}
