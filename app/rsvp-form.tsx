"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type FormState = {
  name: string;
  attendance: string;
  accommodation: string;
  allergens: string;
};

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

type SelectOption = {
  value: string;
  label: string;
};

type FancySelectProps = {
  label: string;
  name: keyof FormState;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
};

const RSVP_ENDPOINT = process.env.NEXT_PUBLIC_RSVP_ENDPOINT ?? "";
const RSVP_RECIPIENT = "popelkajan77@gmail.com";

const initialState: FormState = {
  name: "",
  attendance: "ano",
  accommodation: "ne",
  allergens: "",
};

const attendanceOptions: SelectOption[] = [
  { value: "ano", label: "Dorazím" },
  { value: "ne", label: "Nedorazím" },
  { value: "upresnim", label: "Dám vědět později" },
];

const accommodationOptions: SelectOption[] = [
  { value: "ne", label: "Ne, děkuji" },
  { value: "ano", label: "Ano, mám zájem" },
  { value: "mozna", label: "Možná, ještě upřesním" },
];

const attendanceLabels = Object.fromEntries(
  attendanceOptions.map((option) => [option.value, option.label]),
) as Record<string, string>;

const accommodationLabels = Object.fromEntries(
  accommodationOptions.map((option) => [option.value, option.label]),
) as Record<string, string>;

const fieldClassName =
  "w-full rounded-[1.4rem] border border-[#ddc8c6] bg-[linear-gradient(180deg,#fffdfc_0%,#faf3f1_100%)] px-4 py-2 text-base text-stone-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_10px_24px_rgba(82,45,54,0.04)] outline-none transition focus:border-[#9e6470] focus:ring-4 focus:ring-[#f1dde1]";

const controlClassName = `${fieldClassName} min-h-12`;
const fieldWrapperClassName = "grid content-start gap-2";
const fieldLabelClassName =
  "block min-h-10 text-sm font-semibold uppercase tracking-[0.16em] text-[#8f3145]";

function FancySelect({
  label,
  name,
  value,
  options,
  onChange,
}: FancySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const activeOption =
    options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div className={fieldWrapperClassName} ref={wrapperRef}>
      <span className={fieldLabelClassName}>{label}</span>
      <div className="relative">
        <input name={name} type="hidden" value={value} />
        <button
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          className={`${controlClassName} flex items-center justify-between pr-4 text-left`}
          type="button"
          onClick={() => setIsOpen((current) => !current)}
        >
          <span>{activeOption.label}</span>
          <span
            className={`inline-flex h-8 w-10 items-center justify-center rounded-full bg-[#f4e7e4] text-[#8f3145] shadow-[0_6px_14px_rgba(82,45,54,0.06)] transition duration-200 ${
              isOpen ? "rotate-180 bg-[#ecd6d8] text-[#6f3340]" : ""
            }`}
          >
            <span className="text-2xl font-bold leading-none">▾</span>
          </span>
        </button>

        {isOpen ? (
          <div className="absolute left-0 right-0 top-[calc(100%+0.65rem)] z-20 rounded-3xl border border-[#e5d2cf] bg-[linear-gradient(180deg,#fffdfa_0%,#faf3f1_100%)] p-2.5 shadow-[0_22px_40px_rgba(82,45,54,0.12)]">
            <div className="grid gap-2" role="listbox">
              {options.map((option) => {
                const isActive = option.value === value;

                return (
                  <button
                    key={option.value}
                    aria-selected={isActive}
                    className={`rounded-[1.15rem] border px-4 py-3 text-left text-sm font-semibold transition ${
                      isActive
                        ? "border-[#d8b3b8] bg-[linear-gradient(180deg,#fff2f1_0%,#f7e4e6_100%)] text-[#6f3340] shadow-[0_10px_22px_rgba(82,45,54,0.08)]"
                        : "border-transparent bg-white/80 text-stone-700 hover:border-[#ead3d1] hover:bg-[#fff8f6]"
                    }`}
                    role="option"
                    type="button"
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function RsvpForm() {
  const [formState, setFormState] = useState<FormState>(initialState);
  const [submitState, setSubmitState] = useState<SubmitState>({
    status: "idle",
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const isConfirmed = window.confirm(
      "Opravdu chcete odeslat svou odpověď?",
    );

    if (!isConfirmed) {
      return;
    }

    if (!RSVP_ENDPOINT) {
      setSubmitState({
        status: "error",
        message:
          "Frontend je připravený, ale zatím není nastavený backend endpoint pro odeslání formuláře.",
      });
      return;
    }

    setSubmitState({ status: "submitting" });

    try {
      const response = await fetch(RSVP_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipientEmail: RSVP_RECIPIENT,
          submittedAt: new Date().toISOString(),
          source: "svatebni-web",
          guest: {
            name: formState.name.trim(),
            attendance: formState.attendance,
            attendanceLabel: attendanceLabels[formState.attendance],
            accommodation: formState.accommodation,
            accommodationLabel: accommodationLabels[formState.accommodation],
            allergens: formState.allergens.trim(),
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Backend vrátil chybu při odesílání formuláře.");
      }

      setSubmitState({
        status: "success",
        message: `Děkujeme, ${formState.name}. Vaše odpověď byla připravena k odeslání na ${RSVP_RECIPIENT}.`,
      });
    } catch {
      setSubmitState({
        status: "error",
        message:
          "Odpověď se zatím nepodařilo odeslat. Jakmile bude backend připravený, formulář začne fungovat bez dalších změn ve vzhledu.",
      });
    }
  }

  const isSubmitting = submitState.status === "submitting";

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="grid gap-5 md:grid-cols-2">
        <label className={fieldWrapperClassName}>
          <span className={fieldLabelClassName}>Jméno a příjmení</span>
          <input
            className={controlClassName}
            name="name"
            placeholder="Napište své jméno"
            value={formState.name}
            onChange={(event) =>
              setFormState((current) => ({
                ...current,
                name: event.target.value,
              }))
            }
            required
          />
        </label>

        <FancySelect
          label="Potvrzení účasti"
          name="attendance"
          options={attendanceOptions}
          value={formState.attendance}
          onChange={(attendance) =>
            setFormState((current) => ({
              ...current,
              attendance,
            }))
          }
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <FancySelect
          label="Zájem o ubytování"
          name="accommodation"
          options={accommodationOptions}
          value={formState.accommodation}
          onChange={(accommodation) =>
            setFormState((current) => ({
              ...current,
              accommodation,
            }))
          }
        />

        <label className={fieldWrapperClassName}>
          <span className={fieldLabelClassName}>Alergeny a poznámky</span>
          <textarea
            className={`${controlClassName} min-h-32 resize-y`}
            name="allergens"
            placeholder="Napište nám alergeny nebo cokoli důležitého"
            value={formState.allergens}
            onChange={(event) =>
              setFormState((current) => ({
                ...current,
                allergens: event.target.value,
              }))
            }
          />
        </label>
      </div>

      <div className="pt-2">
        <button
          className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#7b3a47_0%,#5f2834_100%)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#fff7f3] shadow-[0_16px_28px_rgba(95,40,52,0.2)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_34px_rgba(95,40,52,0.26)] disabled:cursor-not-allowed disabled:opacity-70"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Odesíláme..." : "Odeslat odpověď"}
        </button>
      </div>

      {submitState.status === "success" ? (
        <div className="rounded-3xl border border-[#dec8cb] bg-[linear-gradient(180deg,#fff7f5_0%,#fff1ee_100%)] px-5 py-4 text-sm leading-7 text-stone-700 shadow-[0_14px_28px_rgba(82,45,54,0.05)]">
          {submitState.message}
        </div>
      ) : null}

      {submitState.status === "error" ? (
        <div className="rounded-3xl border border-[#e5c8c1] bg-[linear-gradient(180deg,#fff8f6_0%,#fff2ef_100%)] px-5 py-4 text-sm leading-7 text-[#7a3c47] shadow-[0_14px_28px_rgba(122,60,71,0.05)]">
          {submitState.message}
          {!RSVP_ENDPOINT ? (
            <div className="mt-2 text-xs uppercase tracking-[0.16em] text-[#a16671]">
              Nastavte `NEXT_PUBLIC_RSVP_ENDPOINT`, jakmile bude backend
              připravený.
            </div>
          ) : null}
        </div>
      ) : null}
    </form>
  );
}
