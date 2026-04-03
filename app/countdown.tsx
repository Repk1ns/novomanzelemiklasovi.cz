"use client";

import { useEffect, useState } from "react";

type CountdownProps = {
  targetDate: string;
};

type CountdownUnit = {
  value: number;
  label: string;
};

function getTimeLeft(targetDate: string): CountdownUnit[] {
  const targetTime = new Date(targetDate).getTime();
  const difference = targetTime - Date.now();

  if (difference <= 0) {
    return [];
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return [
    { value: days, label: "dní" },
    { value: hours, label: "hodin" },
    { value: minutes, label: "minut" },
    { value: seconds, label: "sekund" },
  ];
}

export default function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<CountdownUnit[]>(() =>
    getTimeLeft(targetDate),
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [targetDate]);

  if (timeLeft.length === 0) {
    return (
      <div className="mt-3 rounded-xl border border-white/70 bg-white/45 px-4 py-2 text-center shadow-[0_10px_22px_rgba(82,45,54,0.05)] backdrop-blur">
        <div className="font-(--font-display) text-xl text-[#4e2731]">
          Dnes je náš den
        </div>
        <div className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#94606a]">
          Těšíme se na vás
        </div>
      </div>
    );
  }

  return (
    <div className="mt-3 flex flex-nowrap items-center justify-center gap-1.5 sm:flex-wrap sm:gap-2.5">
      {timeLeft.map((item) => (
        <div
          key={item.label}
          className="min-w-16 rounded-xl border border-white/70 bg-white/45 px-2 py-1.5 shadow-[0_10px_22px_rgba(82,45,54,0.05)] backdrop-blur sm:min-w-22 sm:px-3.5 sm:py-2.5"
        >
          <div className="font-(--font-display) text-xl text-[#4e2731] sm:text-2xl">
            {item.value}
          </div>
          <div className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#94606a] sm:text-[10px] sm:tracking-[0.2em]">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}
