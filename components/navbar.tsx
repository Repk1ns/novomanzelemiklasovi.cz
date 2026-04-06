"use client";

import { Sacramento } from "next/font/google";
import { useEffect, useMemo, useState } from "react";

import { navigation } from "./site-data";

const sacramento = Sacramento({
  subsets: ["latin"],
  weight: "400",
});

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("#uvod");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sectionIds = useMemo(() => navigation.map((item) => item.href), []);

  useEffect(() => {
    const sections = sectionIds
      .map((href) => document.querySelector(href))
      .filter((section): section is HTMLElement => section instanceof HTMLElement);

    if (sections.length === 0) {
      return;
    }

    function updateActiveSection() {
      const header = document.querySelector("header");
      const headerHeight =
        header instanceof HTMLElement ? header.offsetHeight : 0;
      const dynamicOffset = Math.min(window.innerHeight * 0.18, 120);
      const scrollPosition = window.scrollY + headerHeight + dynamicOffset;
      let currentSection = sectionIds[0] ?? "#uvod";

      for (const section of sections) {
        if (scrollPosition >= section.offsetTop) {
          currentSection = `#${section.id}`;
        }
      }

      setActiveSection(currentSection);
    }

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [sectionIds]);

  return (
    <header className="sticky top-0 z-40 border-b border-[#e8dbd7]/80 bg-[#faf6f2]/92 backdrop-blur-xl">
      <div className="flex w-full items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <a
          className={`${sacramento.className} shrink-0 text-[2.5rem] leading-none text-[#5d2d36] sm:text-[2.9rem]`}
          href="#uvod"
        >
          Miklášovi
        </a>
        <nav className="hidden flex-1 items-center justify-center md:flex">
          <div className="flex max-w-3xl flex-wrap items-center justify-center gap-1 rounded-full px-1.5 py-1">
            {navigation.map((item) => {
              const isActive = activeSection === item.href;

              return (
                <a
                  key={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`group relative overflow-hidden rounded-full px-3 py-2 text-sm font-semibold uppercase tracking-[0.14em] transition duration-200 focus:outline-none ${
                    isActive
                      ? "bg-[linear-gradient(135deg,#7c3d4a_0%,#5f2834_100%)] text-[#fff9f6] shadow-[0_10px_22px_rgba(95,40,52,0.22)]"
                      : "text-[#78525a] hover:-translate-y-0.5 hover:bg-white hover:text-[#5d2d36] hover:shadow-[0_10px_22px_rgba(82,45,54,0.08)] focus:bg-white focus:text-[#5d2d36]"
                  }`}
                  href={item.href}
                  onClick={() => setActiveSection(item.href)}
                >
                  {!isActive ? (
                    <span className="absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 bg-[linear-gradient(90deg,#c5919d_0%,#7c3d4a_100%)] transition duration-300 group-hover:scale-x-100" />
                  ) : null}
                  {item.label}
                </a>
              );
            })}
          </div>
        </nav>
        <a
          className="ml-auto hidden items-center justify-center rounded-full bg-[linear-gradient(135deg,#7c3d4a_0%,#5f2834_100%)] px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.16em] text-[#fff9f6] shadow-[0_16px_28px_rgba(95,40,52,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_34px_rgba(95,40,52,0.28)] focus:outline-none focus:ring-2 focus:ring-[#d7b0b7] focus:ring-offset-2 focus:ring-offset-[#faf6f2] md:inline-flex"
          href="#rsvp"
        >
          Potvrdit účast
        </a>
        <button
          aria-expanded={isMenuOpen}
          aria-label="Otevřít navigaci"
          className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#dbc5c3] bg-white/80 text-[#5d2d36] shadow-[0_12px_24px_rgba(82,45,54,0.08)] transition hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_16px_28px_rgba(82,45,54,0.12)] focus:outline-none focus:ring-2 focus:ring-[#d7b0b7] focus:ring-offset-2 focus:ring-offset-[#faf6f2] md:hidden"
          type="button"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span className="relative flex h-4 w-5 flex-col justify-between">
            <span
              className={`block h-0.5 w-full rounded-full bg-current transition ${
                isMenuOpen ? "translate-y-1.75 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-full rounded-full bg-current transition ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-full rounded-full bg-current transition ${
                isMenuOpen ? "-translate-y-1.75 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {isMenuOpen ? (
        <div className="border-t border-[#eadbd8] bg-[#fcf7f4]/95 px-4 py-3 md:hidden">
          <nav className="grid gap-2">
            {navigation.map((item) => {
              const isActive = activeSection === item.href;

              return (
                <a
                  key={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-2xl px-4 py-3 text-sm font-semibold uppercase tracking-[0.14em] transition ${
                    isActive
                      ? "bg-[linear-gradient(135deg,#7c3d4a_0%,#5f2834_100%)] text-[#fff9f6] shadow-[0_10px_22px_rgba(95,40,52,0.18)]"
                      : "bg-white/80 text-[#78525a] hover:bg-white hover:text-[#5d2d36]"
                  }`}
                  href={item.href}
                  onClick={() => {
                    setActiveSection(item.href);
                    setIsMenuOpen(false);
                  }}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
