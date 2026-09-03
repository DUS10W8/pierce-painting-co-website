"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { services } from "@/lib/site-config";

type Status = "idle" | "submitting" | "success" | "error";

const sizes = [
  { value: "small", label: "Small (single room / small area)" },
  { value: "medium", label: "Medium (a few rooms / full room set)" },
  { value: "large", label: "Large (whole home / large exterior)" },
  { value: "not-sure", label: "Not sure yet" },
];

const timeframes = [
  { value: "asap", label: "As soon as possible" },
  { value: "1-month", label: "Within a month" },
  { value: "1-3-months", label: "1–3 months out" },
  { value: "planning", label: "Just planning ahead" },
];

const scopes = [
  { value: "interior", label: "Interior" },
  { value: "exterior", label: "Exterior" },
  { value: "both", label: "Both" },
];

const TOTAL_STEPS = 6;

export default function ContactForm() {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formId = useId();

  const [data, setData] = useState({
    projectType: "",
    scope: "",
    size: "",
    timeframe: "",
    name: "",
    phone: "",
    email: "",
    city: "",
    notes: "",
  });
  const [photo, setPhoto] = useState<File | null>(null);

  function update<K extends keyof typeof data>(key: K, value: string) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function stepIsValid(s: number) {
    if (s === 1) return data.projectType !== "";
    if (s === 2) return data.scope !== "";
    if (s === 3) return data.size !== "";
    if (s === 4) return data.timeframe !== "";
    if (s === 5) return data.name.trim() !== "" && data.phone.trim() !== "";
    return true;
  }

  async function handleSubmit() {
    setStatus("submitting");
    setErrorMsg("");
    try {
      const fd = new FormData();
      Object.entries(data).forEach(([k, v]) => fd.append(k, v));
      if (photo) fd.append("photo", photo);

      const res = await fetch("/api/estimate", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Something went wrong.");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-forest/12 bg-cream-soft px-8 py-14 text-center">
        <span className="relative h-28 w-28">
          <Image src="/assets/pierce-form-success-graphic.png" alt="" fill className="object-contain" />
        </span>
        <h3 className="text-xl font-bold text-forest-dark">Thanks — your request is in!</h3>
        <p className="max-w-sm text-sm text-charcoal/70">
          We&rsquo;ll follow up soon to talk through your project. Need us sooner? Call or text{" "}
          <a href="tel:+15098024309" className="font-semibold text-orange-dark">
            (509) 802-4309
          </a>
          .
        </p>
      </div>
    );
  }

  const progressPct = (step / TOTAL_STEPS) * 100;

  return (
    <div className="rounded-2xl border border-forest/12 bg-cream-soft p-6 sm:p-8">
      <span className="relative mb-4 hidden h-6 w-36 sm:block">
        <Image src="/assets/pierce-wordmark-only.png" alt="" fill className="object-contain object-left" />
      </span>
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs font-semibold text-forest-dark/70">
          <span>
            Step {step} of {TOTAL_STEPS}
          </span>
          <span>{Math.round(progressPct)}%</span>
        </div>
        <div className="mt-2 h-2 w-full rounded-full bg-forest/10">
          <div
            className="h-full rounded-full bg-orange transition-[width] duration-300 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (step < TOTAL_STEPS) {
            if (stepIsValid(step)) setStep((s) => s + 1);
            return;
          }
          if (stepIsValid(5)) void handleSubmit();
        }}
        noValidate
      >
        {step === 1 ? (
          <fieldset>
            <legend className="text-lg font-bold text-forest-dark">What kind of project is this?</legend>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {services.map((s) => (
                <label
                  key={s.slug}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 text-sm font-semibold transition-colors ${
                    data.projectType === s.slug
                      ? "border-orange bg-orange/5 text-forest-dark"
                      : "border-forest/15 text-charcoal/80 hover:border-forest/30"
                  }`}
                >
                  <input
                    type="radio"
                    name={`${formId}-projectType`}
                    value={s.slug}
                    checked={data.projectType === s.slug}
                    onChange={() => update("projectType", s.slug)}
                    className="sr-only"
                  />
                  <span className="relative h-9 w-9 shrink-0">
                    <Image src={s.icon} alt="" fill className="object-contain" />
                  </span>
                  {s.name}
                </label>
              ))}
            </div>
          </fieldset>
        ) : null}

        {step === 2 ? (
          <fieldset>
            <legend className="text-lg font-bold text-forest-dark">Interior, exterior, or both?</legend>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {scopes.map((opt) => (
                <label
                  key={opt.value}
                  className={`cursor-pointer rounded-xl border p-4 text-center text-sm font-semibold transition-colors ${
                    data.scope === opt.value
                      ? "border-orange bg-orange/5 text-forest-dark"
                      : "border-forest/15 text-charcoal/80 hover:border-forest/30"
                  }`}
                >
                  <input
                    type="radio"
                    name={`${formId}-scope`}
                    value={opt.value}
                    checked={data.scope === opt.value}
                    onChange={() => update("scope", opt.value)}
                    className="sr-only"
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </fieldset>
        ) : null}

        {step === 3 ? (
          <fieldset>
            <legend className="text-lg font-bold text-forest-dark">About how big is the project?</legend>
            <div className="mt-4 flex flex-col gap-3">
              {sizes.map((opt) => (
                <label
                  key={opt.value}
                  className={`cursor-pointer rounded-xl border p-4 text-sm font-semibold transition-colors ${
                    data.size === opt.value
                      ? "border-orange bg-orange/5 text-forest-dark"
                      : "border-forest/15 text-charcoal/80 hover:border-forest/30"
                  }`}
                >
                  <input
                    type="radio"
                    name={`${formId}-size`}
                    value={opt.value}
                    checked={data.size === opt.value}
                    onChange={() => update("size", opt.value)}
                    className="sr-only"
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </fieldset>
        ) : null}

        {step === 4 ? (
          <fieldset>
            <legend className="text-lg font-bold text-forest-dark">What&rsquo;s your timeframe?</legend>
            <div className="mt-4 flex flex-col gap-3">
              {timeframes.map((opt) => (
                <label
                  key={opt.value}
                  className={`cursor-pointer rounded-xl border p-4 text-sm font-semibold transition-colors ${
                    data.timeframe === opt.value
                      ? "border-orange bg-orange/5 text-forest-dark"
                      : "border-forest/15 text-charcoal/80 hover:border-forest/30"
                  }`}
                >
                  <input
                    type="radio"
                    name={`${formId}-timeframe`}
                    value={opt.value}
                    checked={data.timeframe === opt.value}
                    onChange={() => update("timeframe", opt.value)}
                    className="sr-only"
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </fieldset>
        ) : null}

        {step === 5 ? (
          <fieldset className="flex flex-col gap-4">
            <legend className="text-lg font-bold text-forest-dark">How can we reach you?</legend>
            <div>
              <label htmlFor={`${formId}-name`} className="mb-1 block text-sm font-semibold text-forest-dark">
                Name <span className="text-orange-dark">*</span>
              </label>
              <input
                id={`${formId}-name`}
                required
                value={data.name}
                onChange={(e) => update("name", e.target.value)}
                className="w-full rounded-lg border border-forest/20 bg-white px-4 py-2.5 text-sm focus-visible:outline-orange"
              />
            </div>
            <div>
              <label htmlFor={`${formId}-phone`} className="mb-1 block text-sm font-semibold text-forest-dark">
                Phone <span className="text-orange-dark">*</span>
              </label>
              <input
                id={`${formId}-phone`}
                type="tel"
                required
                value={data.phone}
                onChange={(e) => update("phone", e.target.value)}
                className="w-full rounded-lg border border-forest/20 bg-white px-4 py-2.5 text-sm focus-visible:outline-orange"
              />
            </div>
            <div>
              <label htmlFor={`${formId}-email`} className="mb-1 block text-sm font-semibold text-forest-dark">
                Email (optional)
              </label>
              <input
                id={`${formId}-email`}
                type="email"
                value={data.email}
                onChange={(e) => update("email", e.target.value)}
                className="w-full rounded-lg border border-forest/20 bg-white px-4 py-2.5 text-sm focus-visible:outline-orange"
              />
            </div>
            <div>
              <label htmlFor={`${formId}-city`} className="mb-1 block text-sm font-semibold text-forest-dark">
                City (optional)
              </label>
              <input
                id={`${formId}-city`}
                value={data.city}
                onChange={(e) => update("city", e.target.value)}
                className="w-full rounded-lg border border-forest/20 bg-white px-4 py-2.5 text-sm focus-visible:outline-orange"
              />
            </div>
          </fieldset>
        ) : null}

        {step === 6 ? (
          <fieldset className="flex flex-col gap-4">
            <legend className="text-lg font-bold text-forest-dark">Anything else? (optional)</legend>
            <div>
              <label htmlFor={`${formId}-notes`} className="mb-1 block text-sm font-semibold text-forest-dark">
                Project notes
              </label>
              <textarea
                id={`${formId}-notes`}
                rows={4}
                value={data.notes}
                onChange={(e) => update("notes", e.target.value)}
                className="w-full rounded-lg border border-forest/20 bg-white px-4 py-2.5 text-sm focus-visible:outline-orange"
              />
            </div>
            <div>
              <label htmlFor={`${formId}-photo`} className="mb-1 block text-sm font-semibold text-forest-dark">
                Photo of the space (optional)
              </label>
              <input
                id={`${formId}-photo`}
                type="file"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
                className="w-full rounded-lg border border-forest/20 bg-white px-4 py-2.5 text-sm file:mr-3 file:rounded-full file:border-0 file:bg-forest/10 file:px-3 file:py-1.5 file:text-xs file:font-semibold"
              />
            </div>

            {status === "error" ? (
              <p role="alert" className="text-sm font-semibold text-orange-dark">
                {errorMsg}
              </p>
            ) : null}
          </fieldset>
        ) : null}

        <div className="mt-8 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            disabled={step === 1 || status === "submitting"}
            className="rounded-full border border-forest/20 px-5 py-2.5 text-sm font-bold text-forest-dark disabled:opacity-40"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={!stepIsValid(step) || status === "submitting"}
            className="rounded-full bg-orange px-6 py-2.5 text-sm font-bold text-white transition-transform hover:bg-orange-dark disabled:opacity-50"
          >
            {status === "submitting"
              ? "Sending…"
              : step < TOTAL_STEPS
              ? "Next"
              : "Request My Free Estimate"}
          </button>
        </div>
      </form>
    </div>
  );
}
