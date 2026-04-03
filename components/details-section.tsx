import { details, highlights } from "./site-data";

export default function DetailsSection() {
  return (
    <section id="kde-a-kdy" className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
      <div className="rounded-[2.25rem] border border-[#ece0dc] bg-white p-6 shadow-[0_20px_50px_rgba(82,45,54,0.06)] md:p-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#94606a]">
            Kde a kdy
          </p>
          <h2 className="mt-3 font-(--font-display) text-4xl text-[#4e2731]">
            Praktické informace
          </h2>
        </div>

        <dl className="mt-8 space-y-5">
          {details.map((detail) => (
            <div
              key={detail.label}
              className="rounded-[1.4rem] border border-[#f0e5e2] bg-[#fcf8f6] px-5 py-4"
            >
              <dt className="text-sm font-semibold uppercase tracking-[0.22em] text-[#a16f78]">
                {detail.label}
              </dt>
              <dd className="mt-2 text-lg leading-8 text-stone-800">
                {detail.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="grid gap-4">
        {highlights.map((item) => (
          <article
            key={item.title}
            className="group rounded-4xl border border-[#ece1de] bg-white p-6 shadow-[0_18px_45px_rgba(82,45,54,0.05)] transition hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(82,45,54,0.08)]"
          >
            <div className="h-1.5 w-16 rounded-full bg-[#c5919d] transition group-hover:w-24" />
            <h3 className="mt-5 font-(--font-display) text-2xl text-[#4e2731]">
              {item.title}
            </h3>
            <p className="mt-4 text-base leading-8 text-stone-700">
              {item.text}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
