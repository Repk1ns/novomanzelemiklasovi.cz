import { timeline } from "./site-data";

export default function TimelineSection() {
  return (
    <section
      id="harmonogram"
      className="rounded-[2.25rem] border border-[#eaded9] bg-[linear-gradient(180deg,#fbf6f3_0%,#f7efeb_100%)] px-6 py-8 text-stone-800 shadow-[0_18px_45px_rgba(82,45,54,0.06)] md:px-8"
    >
      <div className="max-w-3xl space-y-3 text-left">
        <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#94606a]">
          Harmonogram
        </p>
        <h2 className="font-(--font-display) text-4xl text-[#4e2731]">
          Jak by mohl náš den plynout
        </h2>
        <p className="text-base leading-8 text-stone-700">
          Časy berte prosím orientačně. Důležité je, abychom si ten den společně
          užili v klidu, radosti a bez zbytečného spěchu.
        </p>
      </div>

      <ol className="mx-auto mt-8 grid max-w-3xl gap-4">
        {timeline.map((item) => (
          <li
            key={item.time}
            className="rounded-3xl border border-[#eaded9] bg-white/90 p-5 shadow-[0_12px_30px_rgba(82,45,54,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_35px_rgba(82,45,54,0.07)]"
          >
            <div className="mx-auto max-w-2xl">
              <div className="flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:text-left">
                <div className="inline-flex min-w-22 items-center justify-center rounded-full border border-[#e7d0d3] bg-[#fbf4f2] px-4 py-2 font-(--font-display) text-2xl text-[#7a4752]">
                  {item.time}
                </div>
                <p className="font-(--font-display) text-3xl text-[#4e2731]">
                  {item.title}
                </p>
              </div>
              <p className="mt-4 text-center text-base leading-7 text-stone-700">
                {item.text}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
