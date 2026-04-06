import { Sacramento } from "next/font/google";

import Countdown from "@/app/countdown";

const sacramento = Sacramento({
  subsets: ["latin"],
  weight: "400",
});

export default function HeroSection() {
  return (
    <section
      id="uvod"
      className="relative -mx-6 flex min-h-[calc(100vh-7rem)] w-[calc(100%+3rem)] items-center justify-center overflow-hidden rounded-t-[5rem] bg-[linear-gradient(145deg,#fffdf9_0%,#f8efeb_42%,#f2dfdb_72%,#f8f1ee_100%)] px-6 py-12 sm:-mx-10 sm:w-[calc(100%+5rem)] md:px-10 lg:-mx-12 lg:w-[calc(100%+6rem)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,248,242,0.95),transparent_24%),radial-gradient(circle_at_12%_24%,rgba(230,196,198,0.42),transparent_30%),radial-gradient(circle_at_88%_22%,rgba(214,178,186,0.32),transparent_28%),radial-gradient(circle_at_50%_88%,rgba(245,231,225,0.9),transparent_36%)]" />
      <div className="absolute inset-x-0 top-0 h-52 bg-[linear-gradient(180deg,#fbf8f6_0%,rgba(255,255,255,0.68)_38%,transparent_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-[linear-gradient(180deg,transparent_0%,rgba(251,248,246,0.82)_68%,#fbf8f6_100%)]" />
      <div className="absolute left-1/2 top-[12%] h-120 w-120 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,250,246,0.9)_0%,rgba(255,250,246,0.18)_42%,transparent_72%)] blur-2xl" />
      <div className="absolute inset-y-0 left-0 w-28 bg-[linear-gradient(90deg,#f8f3f0_0%,rgba(248,243,240,0.68)_38%,transparent_100%)]" />
      <div className="absolute inset-y-0 right-0 w-28 bg-[linear-gradient(270deg,#f8f3f0_0%,rgba(248,243,240,0.68)_38%,transparent_100%)]" />
      <div className="absolute -left-16 top-8 h-64 w-64 rounded-full border border-white/35 opacity-60" />
      <div className="absolute -right-24 bottom-2 h-80 w-80 rounded-full border border-[#e8cccb]/55 opacity-55" />
      <div className="absolute left-[8%] top-[16%] hidden h-40 w-72 rounded-[50%] border border-[#ead6d2]/70 opacity-70 md:block" />
      <div className="absolute right-[10%] top-[20%] hidden h-48 w-80 rounded-[50%] border border-white/55 opacity-60 md:block" />
      <div className="absolute bottom-[12%] left-1/2 hidden h-28 w-lg -translate-x-1/2 rounded-[50%] border border-[#ecd9d5]/65 opacity-65 md:block" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0.02)_34%,rgba(111,51,64,0.02)_100%)]" />

      <div className="relative flex w-full max-w-4xl flex-col items-center text-center">
        <h1
          className={`${sacramento.className} mt-6 whitespace-nowrap text-[4.2rem] leading-[0.9] text-[#4e2731] drop-shadow-[0_10px_28px_rgba(78,39,49,0.12)] sm:text-[6.1rem] lg:text-[7.9rem]`}
        >
          Vezmeme se
        </h1>
        <p className="mt-20 max-w-3xl px-2 text-base leading-7 text-stone-700 sm:mt-28 sm:text-xl sm:leading-8">
          Zveme vás na den, kdy si řekneme ano a oslavíme to s lidmi, které máme
          rádi.
        </p>
        <p className="max-w-3xl px-2 text-base leading-7 text-stone-700 sm:text-xl sm:leading-8">
          Budeme moc rádi, když budete u toho.
        </p>

        <div className="mt-8 flex w-full max-w-full flex-nowrap items-center justify-center gap-1.5 overflow-hidden sm:flex-wrap sm:gap-3">
          <span className="rounded-full border border-[#ead9d7] bg-[#fbf5f3]/95 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-[#7d5961] sm:px-4 sm:py-2 sm:text-sm sm:tracking-widest">
            5. 9. 2026
          </span>
          <span className="rounded-full border border-[#ead9d7] bg-[#fbf5f3]/95 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-[#7d5961] sm:px-4 sm:py-2 sm:text-sm sm:tracking-widest">
            12:00
          </span>
          <span className="rounded-full border border-[#ead9d7] bg-[#fbf5f3]/95 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#7d5961] sm:px-4 sm:py-2 sm:text-sm sm:tracking-widest">
            Strání - Květná
          </span>
        </div>

        <div className="mt-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#94606a]">
            Odpočet do svatby
          </p>
          <Countdown targetDate="2026-09-05T12:00:00+02:00" />
        </div>

        <div className="mt-10 flex flex-col items-center gap-5">
          <a
            className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#7b3a47_0%,#5f2834_100%)] px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-[#fff8f5] shadow-[0_16px_28px_rgba(95,40,52,0.2)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_34px_rgba(95,40,52,0.26)] focus:outline-none focus:ring-2 focus:ring-[#d7b0b7] focus:ring-offset-2"
            href="#rsvp"
          >
            Potvrdit účast
          </a>
          <a
            aria-label="Posunout na další sekci"
            className="group animate-bob relative inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.92)_0%,rgba(250,240,237,0.9)_100%)] text-[#6f3340] shadow-[0_16px_34px_rgba(82,45,54,0.12)] transition hover:scale-105 hover:shadow-[0_20px_40px_rgba(82,45,54,0.18)] focus:outline-none focus:ring-2 focus:ring-[#e3c8cd] focus:ring-offset-2"
            href="#kde-a-kdy"
          >
            <span className="absolute inset-0 rounded-full border border-[#ead2d0] opacity-70 transition group-hover:scale-110 group-hover:opacity-100" />
            <span className="absolute -inset-2 rounded-full border border-[#f1dedd] opacity-60" />
            <span className="relative text-3xl leading-none transition group-hover:translate-y-0.5">
              ↓
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
