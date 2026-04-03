export default function SiteFooter() {
  return (
    <footer className="-mx-6 w-[calc(100%+3rem)] rounded-[2.2rem] border border-[#ece0dc] bg-white px-6 py-8 shadow-[0_18px_45px_rgba(82,45,54,0.05)] sm:-mx-10 sm:w-[calc(100%+5rem)] md:px-10 lg:-mx-12 lg:w-[calc(100%+6rem)]">
      <div className="flex flex-col gap-5 text-center md:flex-row md:items-center md:justify-between md:text-left">
        <div>
          <p className="font-(--font-display) text-3xl text-[#4e2731]">
            Těšíme se na vás
          </p>
          <p className="mt-2 text-base leading-8 text-stone-700">
            Miklášovi | 5. 9. 2026 | Strání - Květná
          </p>
        </div>
        <a
          className="inline-flex items-center justify-center self-center rounded-full border border-[#d8c1c0] px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#6f3340] shadow-[0_10px_24px_rgba(82,45,54,0.05)] transition hover:-translate-y-0.5 hover:bg-[#fcf7f5] hover:shadow-[0_14px_28px_rgba(82,45,54,0.08)] md:self-auto"
          href="#uvod"
        >
          Zpět na začátek
        </a>
      </div>
    </footer>
  );
}
