import Image from "next/image";

import { contacts, drivers, witnessPhotos } from "./site-data";

export default function PeopleSection() {
  return (
    <section
      id="osoby"
      className="rounded-[2.25rem] border border-[#ecdeda] bg-[linear-gradient(180deg,#f7efeb_0%,#f2e4e0_100%)] p-6 shadow-[0_18px_45px_rgba(82,45,54,0.05)] md:p-8"
    >
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#94606a]">
          Důležité osoby
        </p>
        <h2 className="mt-3 font-(--font-display) text-4xl text-[#4e2731]">
          Na koho se obrátit
        </h2>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {contacts.map((person) => (
            <article
              key={person.role}
              className="flex flex-col items-center rounded-3xl border border-white/80 bg-white/75 p-6 text-center shadow-[0_12px_30px_rgba(82,45,54,0.04)]"
            >
              {witnessPhotos[person.name] ? (
                <div className="mb-5 overflow-hidden rounded-full border-4 border-white shadow-[0_14px_28px_rgba(82,45,54,0.12)]">
                  <Image
                    src={witnessPhotos[person.name]}
                    alt={person.name}
                    width={280}
                    height={280}
                    className="h-40 w-40 object-cover"
                  />
                </div>
              ) : (
                <div className="mb-5 flex h-40 w-40 items-center justify-center rounded-full border-4 border-white bg-[linear-gradient(180deg,#f6e7e4_0%,#f0ddda_100%)] font-(--font-display) text-4xl text-[#8c5a64] shadow-[0_14px_28px_rgba(82,45,54,0.08)]">
                  {person.name.slice(0, 1)}
                </div>
              )}
              <p className="text-sm uppercase tracking-[0.2em] text-[#9b6b74]">
                {person.role}
              </p>
              <h3 className="mt-2 font-(--font-display) text-3xl text-[#4e2731]">
                {person.name}
              </h3>
              <p className="mt-3 text-base leading-7 text-stone-700">
                {person.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-3xl border border-white/80 bg-white/70 p-6 shadow-[0_12px_30px_rgba(82,45,54,0.04)]">
          <p className="text-sm uppercase tracking-[0.2em] text-[#9b6b74]">
            Řidiči
          </p>
          <div
            className={`mt-4 grid gap-4 ${
              drivers.length === 1
                ? "justify-items-center md:grid-cols-1"
                : "md:grid-cols-2"
            }`}
          >
            {drivers.map((driver) => (
              <div
                key={driver.name}
                className="w-full max-w-sm rounded-3xl border border-[#ead7d4] bg-[#fcf7f5] p-5 text-center"
              >
                <p className="font-(--font-display) text-3xl text-[#4e2731]">
                  {driver.name}
                </p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-[#94606a]">
                  Kontakt
                </p>
                <a
                  className="mt-2 inline-block text-base text-[#6f3340] underline decoration-[#d7b0b7] underline-offset-4"
                  href={`tel:${driver.phone.replaceAll(" ", "")}`}
                >
                  {driver.phone}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
