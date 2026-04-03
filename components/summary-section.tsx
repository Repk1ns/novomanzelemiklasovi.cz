import { mapCards } from "./site-data";

function MapCard({
  label,
  title,
  href,
  frameTitle,
}: {
  label: string;
  title: string;
  href: string;
  frameTitle: string;
}) {
  return (
    <div className="rounded-3xl bg-white/80 p-5">
      <p className="text-sm uppercase tracking-[0.2em] text-[#9b6b74]">{label}</p>
      <p className="mt-2 font-(--font-display) text-3xl text-[#4e2731]">
        {title}
      </p>
      <div className="mt-5 overflow-hidden rounded-3xl border border-[#ead7d4] bg-[#fcf7f5] shadow-[0_12px_30px_rgba(82,45,54,0.05)]">
        <iframe
          className="h-56 w-full bg-white"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={href}
          title={frameTitle}
        />
        <div className="px-4 py-4">
          <a
            className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-[#d8c1c0] bg-white px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6f3340] shadow-[0_10px_24px_rgba(82,45,54,0.05)] transition hover:-translate-y-0.5 hover:bg-[#fcf7f5] hover:shadow-[0_14px_28px_rgba(82,45,54,0.08)] sm:px-5 sm:py-3 sm:text-sm sm:tracking-[0.16em]"
            href={href}
            rel="noreferrer"
            target="_blank"
          >
            Otevřít v Mapy.com
          </a>
        </div>
      </div>
    </div>
  );
}

export default function SummarySection() {
  return (
    <section id="v-kostce" className="w-full">
      <div className="rounded-4xl border border-[#efe2df] bg-[linear-gradient(180deg,#fcf7f5_0%,#f6ece8_100%)] p-6 shadow-[0_20px_45px_rgba(82,45,54,0.06)] md:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#94606a]">
          Kde se uvidíme
        </p>
        <h2 className="mt-3 font-(--font-display) text-4xl text-[#4e2731]">
          Místa našeho svatebního dne
        </h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <MapCard {...mapCards.ceremony} />
          <MapCard {...mapCards.reception} />
        </div>
      </div>
    </section>
  );
}
