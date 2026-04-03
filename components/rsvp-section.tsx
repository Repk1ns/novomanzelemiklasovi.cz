import RsvpForm from "@/app/rsvp-form";

export default function RsvpSection() {
  return (
    <section className="rounded-[2.25rem] border border-[#ece0dc] bg-white p-6 shadow-[0_22px_55px_rgba(82,45,54,0.06)] md:p-8">
      <div>
        <div className="rounded-[1.75rem] border border-[#f0e4e1] bg-[linear-gradient(180deg,#fcf8f6_0%,#f6ece8_100%)] p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#94606a]">
            Potvrzení účasti
          </p>
          <h2 id="rsvp" className="mt-3 font-(--font-display) text-4xl text-[#4e2731]">
            Dejte nám vědět, jestli dorazíte
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-stone-700">
            Vyplňte prosím krátký formulář. Pomůže nám s plánováním hostiny,
            ubytování i alergenů a vám usnadní orientaci na stránce.
          </p>
          <p className="mt-3 max-w-2xl text-base leading-8 text-stone-700">
            Pokud budete chtít později něco změnit, stačí nám napsat.
          </p>
        </div>

        <div className="mt-8">
          <RsvpForm />
        </div>
      </div>
    </section>
  );
}
