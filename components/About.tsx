"use client";

export default function About() {
  return (
    <section id="about" className="bg-[#f2f6fc] px-6 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        {/* <div className="mb-5 flex items-center gap-3">
          <span className="h-0.5 w-6 bg-[#1b5fc1]" />
          <span className="text-sm font-semibold text-[#1b5fc1]">
            About the summit
          </span>
        </div> */}

        {/* Title */}
        <h2
          className="mb-6 text-[56px] font-normal leading-none text-[#061330] sm:text-[80px]"
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
        <p className="mb-14 max-w-3xl text-lg leading-relaxed text-[#3d4b66]">
          GAMMAT 2026 convened{" "}
          <strong className="font-semibold text-[#061330]">
            ministers, regulators, CEOs, investors,
          </strong>{" "}
          and infrastructure developers under one influential platform, driving
          intra-African trade, AfCFTA implementation, port modernisation,
          aviation expansion, and smart mobility innovation. The future of
          Africa&apos;s competitiveness depends on integrated transport
          ecosystems, and this is where action meets capital.
        </p>

        {/* Focus areas, divided like the ticket's info panels */}
        {/* <ul className="grid grid-cols-2 gap-y-6 border-t border-[#061330]/15 pt-8 sm:grid-cols-3 lg:grid-cols-5">
          {FOCUS_AREAS.map((area) => (
            <li
              key={area}
              className="border-l-2 border-[#1b5fc1] pl-4 pr-4 text-base font-semibold leading-snug text-[#061330]"
            >
              {area}
            </li>
          ))}
        </ul> */}
      </div>
    </section>
  );
}
