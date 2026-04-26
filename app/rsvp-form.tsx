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

type PendingSubmission = {
  name: string;
};

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

const initialState: FormState = {
  name: "",
  attendance: "ano",
  accommodation: "ne",
  allergens: "",
};

const attendanceOptions: SelectOption[] = [
  { value: "ano", label: "Dorazim" },
  { value: "ne", label: "Nedorazim" },
  { value: "upresnim", label: "Dam vedet pozdeji" },
];

const accommodationOptions: SelectOption[] = [
  { value: "ne", label: "Ne, dekuji" },
  { value: "ano", label: "Ano, mam zajem" },
  { value: "mozna", label: "Mozna, jeste upresnim" },
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
          className={`${controlClassName} flex cursor-pointer items-center justify-between pr-4 text-left`}
          type="button"
          onClick={() => setIsOpen((current) => !current)}
        >
          <span>{activeOption.label}</span>
          <span
            className={`inline-flex h-8 w-10 items-center justify-center rounded-full bg-[#f4e7e4] text-[#8f3145] shadow-[0_6px_14px_rgba(82,45,54,0.06)] transition duration-200 ${
              isOpen ? "rotate-180 bg-[#ecd6d8] text-[#6f3340]" : ""
            }`}
          >
            <span className="text-2xl font-bold leading-none">▼</span>
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
                    className={`cursor-pointer rounded-[1.15rem] border px-4 py-3 text-left text-sm font-semibold transition ${
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

function SubmitMessage({
  tone,
  message,
}: {
  tone: "success" | "error";
  message: string;
}) {
  const isSuccess = tone === "success";

  return (
    <div
      className={`overflow-hidden rounded-[1.9rem] border shadow-[0_18px_40px_rgba(82,45,54,0.08)] ${
        isSuccess
          ? "border-[#e1d3cf] bg-[linear-gradient(135deg,#fffaf8_0%,#f7ece8_52%,#f2e4e0_100%)]"
          : "border-[#e7cdca] bg-[linear-gradient(135deg,#fff8f6_0%,#fcedea_52%,#f5e1de_100%)]"
      }`}
    >
      <div
        className={`flex items-start gap-4 px-5 py-5 sm:px-6 ${
          isSuccess ? "text-stone-700" : "text-[#7a3c47]"
        }`}
      >
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border text-xl shadow-[0_10px_22px_rgba(82,45,54,0.08)] ${
            isSuccess
              ? "border-[#e8d8d3] bg-white/85 text-[#8d5d66]"
              : "border-[#e5c2c0] bg-white/82 text-[#a04f5f]"
          }`}
        >
          {isSuccess ? "♡" : "!"}
        </div>

        <div className="min-w-0">
          <p
            className={`text-sm font-semibold uppercase tracking-[0.24em] ${
              isSuccess ? "text-[#9b6b74]" : "text-[#b16f7d]"
            }`}
          >
            {isSuccess ? "Potvrzeni prijato" : "Odeslani se nepovedlo"}
          </p>
          <p
            className={`mt-2 font-(--font-display) text-3xl leading-tight ${
              isSuccess ? "text-[#4e2731]" : "text-[#6f3340]"
            }`}
          >
            {isSuccess ? "Dekujeme za odpoved" : "Zkusme to jeste jednou"}
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-7 sm:text-base">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function RsvpForm() {
  const [formState, setFormState] = useState<FormState>(initialState);
  const [submitState, setSubmitState] = useState<SubmitState>({
    status: "idle",
  });
  const [pendingSubmission, setPendingSubmission] =
    useState<PendingSubmission | null>(null);

  async function submitRsvp(name: string) {
    setSubmitState({ status: "submitting" });

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          attendance: formState.attendance,
          attendanceLabel: attendanceLabels[formState.attendance],
          accommodation: formState.accommodation,
          accommodationLabel: accommodationLabels[formState.accommodation],
          allergens: formState.allergens.trim(),
        }),
      });

      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(payload.error || "Odeslani formularu se nepodarilo.");
      }

      setSubmitState({
        status: "success",
        message: `Děkujeme, ${name}. Tvoji odpověď jsme uložili a poslali e-mailem.`,
      });
      setFormState(initialState);
    } catch (error) {
      setSubmitState({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Odeslání formuláře se nepodařilo. Zkuste to prosím znovu.",
      });
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = formState.name.trim();
    if (!name) {
      setSubmitState({
        status: "error",
        message: "Vyplňte prosím jméno a příjmení.",
      });
      return;
    }

    setPendingSubmission({ name });
  }

  const isSubmitting = submitState.status === "submitting";

  return (
    <>
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
            className="inline-flex cursor-pointer items-center justify-center rounded-full bg-[linear-gradient(135deg,#7b3a47_0%,#5f2834_100%)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#fff7f3] shadow-[0_16px_28px_rgba(95,40,52,0.2)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_34px_rgba(95,40,52,0.26)] disabled:cursor-not-allowed disabled:opacity-70"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? "Odesíláme..." : "Odeslat odpověď"}
          </button>
        </div>

        {submitState.status === "success" ? (
          <SubmitMessage message={submitState.message} tone="success" />
        ) : null}

        {submitState.status === "error" ? (
          <SubmitMessage message={submitState.message} tone="error" />
        ) : null}
      </form>

      {pendingSubmission ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#442029]/25 px-4 backdrop-blur-[3px]">
          <div className="w-full max-w-lg overflow-hidden rounded-[2rem] border border-[#ead9d5] bg-[linear-gradient(180deg,#fffaf8_0%,#f8efeb_100%)] shadow-[0_28px_80px_rgba(82,45,54,0.22)]">
            <div className="border-b border-[#efe1dd] px-6 py-5 sm:px-8">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#9b6b74]">
                Je to připravené
              </p>
              <h3 className="mt-3 font-(--font-display) text-4xl leading-tight text-[#4e2731]">
                Opravdu chcete odeslat odpověď?
              </h3>
            </div>

            <div className="px-6 py-6 sm:px-8">
              <p className="text-base leading-8 text-stone-700">
                Po potvrzení odešleme vyplněné údaje z formuláře a odpověď
                uložíme k dalšímu zpracování.
              </p>

              <div className="mt-5 rounded-[1.6rem] border border-[#ead9d5] bg-white/75 px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9b6b74]">
                  Host
                </p>
                <p className="mt-2 font-(--font-display) text-3xl text-[#4e2731]">
                  {pendingSubmission.name}
                </p>
              </div>

              <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  className="inline-flex cursor-pointer items-center justify-center rounded-full border border-[#dcc7c5] bg-white/80 px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#7a4b55] shadow-[0_10px_24px_rgba(82,45,54,0.05)] transition hover:bg-white"
                  type="button"
                  onClick={() => setPendingSubmission(null)}
                >
                  Vrátit se zpět
                </button>
                <button
                  className="inline-flex cursor-pointer items-center justify-center rounded-full bg-[linear-gradient(135deg,#7b3a47_0%,#5f2834_100%)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#fff7f3] shadow-[0_16px_28px_rgba(95,40,52,0.2)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_34px_rgba(95,40,52,0.26)]"
                  type="button"
                  onClick={async () => {
                    setPendingSubmission(null);
                    await submitRsvp(pendingSubmission.name);
                  }}
                >
                  Ano, odeslat odpověď
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
