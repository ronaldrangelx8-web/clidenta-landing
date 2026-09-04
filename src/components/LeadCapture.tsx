"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CircleDollarSign,
  Clock3,
  Loader2,
  MessageCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type Availability = "TODAY" | "TOMORROW" | "FEW_WEEKS";
type Budget = "READY" | "NEEDS_INFO";
type Step = 1 | 2 | 3 | 4;

const AVAILABILITY_OPTIONS: Array<{
  value: Availability;
  label: string;
  description: string;
  icon: typeof Clock3;
}> = [
  {
    value: "TODAY",
    label: "Hoy",
    description: "Quiero que me contacten hoy",
    icon: Clock3,
  },
  {
    value: "TOMORROW",
    label: "Mañana",
    description: "Prefiero conversar mañana",
    icon: CalendarDays,
  },
  {
    value: "FEW_WEEKS",
    label: "En unas semanas",
    description: "Todavía estoy evaluando",
    icon: CalendarDays,
  },
];

const BUDGET_OPTIONS: Array<{
  value: Budget;
  label: string;
  description: string;
}> = [
  {
    value: "READY",
    label: "Sí, cuento con el presupuesto",
    description: "Puedo invertir USD 250 en la instalación",
  },
  {
    value: "NEEDS_INFO",
    label: "Quiero conocer más primero",
    description: "Necesito resolver algunas dudas antes de decidir",
  },
];

const FALLBACK_WHATSAPP = "51920789569";

const COUNTRY_OPTIONS = [
  { iso: "PE", name: "Perú", flag: "🇵🇪", dialCode: "+51", placeholder: "920 789 569" },
  { iso: "MX", name: "México", flag: "🇲🇽", dialCode: "+52", placeholder: "55 1234 5678" },
  { iso: "CO", name: "Colombia", flag: "🇨🇴", dialCode: "+57", placeholder: "300 123 4567" },
  { iso: "EC", name: "Ecuador", flag: "🇪🇨", dialCode: "+593", placeholder: "99 123 4567" },
  { iso: "CL", name: "Chile", flag: "🇨🇱", dialCode: "+56", placeholder: "9 1234 5678" },
  { iso: "AR", name: "Argentina", flag: "🇦🇷", dialCode: "+54", placeholder: "11 1234 5678" },
  { iso: "BO", name: "Bolivia", flag: "🇧🇴", dialCode: "+591", placeholder: "7123 4567" },
  { iso: "BR", name: "Brasil", flag: "🇧🇷", dialCode: "+55", placeholder: "11 91234 5678" },
  { iso: "CR", name: "Costa Rica", flag: "🇨🇷", dialCode: "+506", placeholder: "8888 8888" },
  { iso: "PA", name: "Panamá", flag: "🇵🇦", dialCode: "+507", placeholder: "6123 4567" },
  { iso: "DO", name: "Rep. Dominicana", flag: "🇩🇴", dialCode: "+1", placeholder: "809 123 4567" },
  { iso: "GT", name: "Guatemala", flag: "🇬🇹", dialCode: "+502", placeholder: "5123 4567" },
  { iso: "HN", name: "Honduras", flag: "🇭🇳", dialCode: "+504", placeholder: "9123 4567" },
  { iso: "SV", name: "El Salvador", flag: "🇸🇻", dialCode: "+503", placeholder: "7123 4567" },
  { iso: "NI", name: "Nicaragua", flag: "🇳🇮", dialCode: "+505", placeholder: "8123 4567" },
  { iso: "PY", name: "Paraguay", flag: "🇵🇾", dialCode: "+595", placeholder: "981 123456" },
  { iso: "UY", name: "Uruguay", flag: "🇺🇾", dialCode: "+598", placeholder: "99 123 456" },
  { iso: "VE", name: "Venezuela", flag: "🇻🇪", dialCode: "+58", placeholder: "412 123 4567" },
  { iso: "US", name: "EE. UU. / Canadá", flag: "🇺🇸", dialCode: "+1", placeholder: "305 123 4567" },
  { iso: "ES", name: "España", flag: "🇪🇸", dialCode: "+34", placeholder: "612 345 678" },
] as const;

function makeSubmissionId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    (character) => {
      const random = Math.floor(Math.random() * 16);
      const value = character === "x" ? random : (random & 0x3) | 0x8;
      return value.toString(16);
    },
  );
}

function normalizeNationalPhone(value: string, dialCode: string) {
  let digits = value.replace(/\D/g, "");
  const dialDigits = dialCode.replace(/\D/g, "");
  const maxLength = 15 - dialDigits.length;

  if (digits.startsWith(dialDigits) && digits.length > maxLength) {
    digits = digits.slice(dialDigits.length);
  }

  return digits.slice(0, maxLength);
}

function trackingData() {
  const params = new URLSearchParams(window.location.search);
  const pick = (key: string, max: number) =>
    params.get(key)?.slice(0, max) || undefined;
  return {
    landingVariantSlug: (
      pick("ad", 60) ||
      pick("v", 60) ||
      pick("utm_content", 60)
    )?.toLowerCase(),
    landingPath: `${window.location.pathname}${window.location.search}`.slice(
      0,
      300,
    ),
    referrer: document.referrer.slice(0, 500) || undefined,
    utmSource: pick("utm_source", 200),
    utmMedium: pick("utm_medium", 200),
    utmCampaign: pick("utm_campaign", 300),
    utmTerm: pick("utm_term", 300),
    utmContent: pick("utm_content", 300),
    utmId: pick("utm_id", 200),
    fbclid: pick("fbclid", 500),
  };
}

export default function LeadCapture({ ctaLabel }: { ctaLabel: string }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>(1);
  const [fullName, setFullName] = useState("");
  const [countryIso, setCountryIso] = useState("PE");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [availability, setAvailability] = useState<Availability | null>(null);
  const [budget, setBudget] = useState<Budget | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const submissionId = useRef<string | null>(null);
  const primaryCtaRef = useRef<HTMLButtonElement | null>(null);
  const [isPrimaryCtaVisible, setIsPrimaryCtaVisible] = useState(true);
  const selectedCountry =
    COUNTRY_OPTIONS.find((country) => country.iso === countryIso) ??
    COUNTRY_OPTIONS[0];
  const phoneE164 = `${selectedCountry.dialCode}${phone}`;

  useEffect(() => {
    const primaryCta = primaryCtaRef.current;
    if (!primaryCta) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsPrimaryCtaVisible(entry.isIntersecting);
    });

    observer.observe(primaryCta);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function detectCountry() {
      try {
        const response = await fetch("/api/country", {
          cache: "no-store",
          signal: controller.signal,
        });
        if (!response.ok) return;

        const payload = (await response.json()) as { countryIso?: string };
        if (
          payload.countryIso &&
          COUNTRY_OPTIONS.some((country) => country.iso === payload.countryIso)
        ) {
          setCountryIso(payload.countryIso);
        }
      } catch (countryError) {
        if (
          countryError instanceof DOMException &&
          countryError.name === "AbortError"
        ) {
          return;
        }
      }
    }

    void detectCountry();
    return () => controller.abort();
  }, []);

  function reset() {
    setStep(1);
    setFullName("");
    setCountryIso("PE");
    setPhone("");
    setEmail("");
    setAvailability(null);
    setBudget(null);
    setError(null);
    setSubmitting(false);
    submissionId.current = null;
  }

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    if (!nextOpen && step === 4) reset();
  }

  function openForm() {
    if (step === 4) reset();
    setOpen(true);
  }

  function continueFromContact(event: FormEvent) {
    event.preventDefault();
    setError(null);
    if (fullName.trim().length < 2) {
      setError("Escribe tu nombre para continuar.");
      return;
    }
    if (!/^\+[1-9]\d{7,14}$/.test(phoneE164)) {
      setError("Ingresa un número de WhatsApp válido.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Ingresa un correo electrónico válido.");
      return;
    }
    setStep(2);
  }

  async function submit() {
    if (!availability || !budget || submitting) return;
    setSubmitting(true);
    setError(null);
    submissionId.current ||= makeSubmissionId();

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submissionId: submissionId.current,
          fullName: fullName.trim(),
          phone: phoneE164,
          email: email.trim(),
          availability,
          budget,
          ...trackingData(),
        }),
      });
      const payload = (await response.json().catch(() => null)) as {
        message?: string | string[];
      } | null;
      if (!response.ok) {
        const message = Array.isArray(payload?.message)
          ? payload?.message[0]
          : payload?.message;
        throw new Error(
          message || "No pudimos guardar tus datos. Inténtalo nuevamente.",
        );
      }
      setStep(4);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "No pudimos guardar tus datos. Inténtalo nuevamente.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  const fallbackText = encodeURIComponent(
    `Hola, soy ${fullName || "un doctor interesado"}. Acabo de enviar mis datos y quiero coordinar mi demostración de Clidenta.`,
  );

  return (
    <>
      <button
        ref={primaryCtaRef}
        type="button"
        onClick={openForm}
        data-cta="lead-form"
        data-cta-label={ctaLabel}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-[0_10px_30px_-12px_hsl(var(--primary)/0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-[0_16px_35px_-14px_hsl(var(--primary)/0.7)] active:translate-y-0 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:w-auto sm:px-10"
      >
        <MessageCircle aria-hidden="true" size={22} />
        {ctaLabel}
        <ArrowRight aria-hidden="true" size={19} />
      </button>

      <button
        type="button"
        onClick={openForm}
        aria-hidden={isPrimaryCtaVisible || open}
        tabIndex={isPrimaryCtaVisible || open ? -1 : 0}
        className={cn(
          "fixed inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3.5 font-semibold text-primary-foreground shadow-[0_16px_45px_-12px_rgba(15,89,82,0.75)] transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:hidden",
          isPrimaryCtaVisible || open
            ? "pointer-events-none translate-y-4 opacity-0"
            : "translate-y-0 opacity-100",
        )}
      >
        <MessageCircle aria-hidden="true" size={21} />
        {ctaLabel}
      </button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="max-h-[calc(100dvh-1rem)] overflow-y-auto rounded-[26px] border-primary/10 bg-[#fdfcf8] p-0 shadow-2xl sm:max-w-[560px]">
          {step !== 4 && (
            <div className="border-b border-primary/10 px-6 pb-4 pt-6 sm:px-8">
              <div className="mb-3 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                <span>Solicitud de contacto</span>
                <span>{step} de 3</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5" aria-hidden="true">
                {[1, 2, 3].map((item) => (
                  <span
                    key={item}
                    className={cn(
                      "h-1.5 rounded-full transition-colors",
                      item <= step ? "bg-primary" : "bg-primary/10",
                    )}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="px-6 pb-7 pt-6 sm:px-8 sm:pb-8">
            {step === 1 && (
              <form onSubmit={continueFromContact} noValidate>
                <DialogHeader>
                  <DialogTitle className="font-sans text-2xl font-bold tracking-tight text-slate-900">
                    Primero, cuéntanos quién eres
                  </DialogTitle>
                  <DialogDescription className="text-base leading-relaxed">
                    Usaremos estos datos solo para coordinar tu demostración.
                  </DialogDescription>
                </DialogHeader>

                <div className="mt-6 space-y-4">
                  <label className="block space-y-2">
                    <span className="text-sm font-semibold text-slate-800">
                      Tu nombre
                    </span>
                    <Input
                      autoFocus
                      autoComplete="name"
                      value={fullName}
                      onChange={(event) => setFullName(event.target.value)}
                      placeholder="Ej. Dra. Andrea Salazar"
                      className="h-[52px] rounded-xl bg-white px-4 text-base"
                    />
                  </label>

                  <div className="space-y-2">
                    <label
                      htmlFor="lead-whatsapp"
                      className="block text-sm font-semibold text-slate-800"
                    >
                      Número de WhatsApp
                    </label>
                    <div className="flex h-[52px] overflow-hidden rounded-xl border border-input bg-white focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/30">
                      <Select
                        value={countryIso}
                        onValueChange={(nextIso) => {
                          const nextCountry = COUNTRY_OPTIONS.find(
                            (country) => country.iso === nextIso,
                          );
                          if (!nextCountry) return;
                          setCountryIso(nextIso);
                          setPhone((currentPhone) =>
                            normalizeNationalPhone(
                              currentPhone,
                              nextCountry.dialCode,
                            ),
                          );
                          setError(null);
                        }}
                      >
                        <SelectTrigger
                          aria-label="Código de país"
                          className="h-full w-[132px] shrink-0 rounded-none border-0 border-r border-input bg-slate-50/80 px-3 shadow-none transition-colors data-[size=default]:h-full hover:bg-slate-100 focus-visible:bg-slate-100 focus-visible:ring-0"
                        >
                          <SelectValue>
                            <span className="flex items-center gap-2.5">
                              <span
                                aria-hidden="true"
                                className="flex size-7 items-center justify-center rounded-lg bg-white text-base shadow-sm ring-1 ring-slate-200/80"
                              >
                                {selectedCountry.flag}
                              </span>
                              <span className="font-semibold tabular-nums text-slate-700">
                                {selectedCountry.dialCode}
                              </span>
                            </span>
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent
                          position="popper"
                          align="start"
                          className="max-h-[280px] w-[270px] rounded-xl"
                        >
                          {COUNTRY_OPTIONS.map((country) => (
                            <SelectItem
                              key={country.iso}
                              value={country.iso}
                              className="py-2.5 pl-3"
                            >
                              <span className="grid w-[210px] grid-cols-[28px_minmax(0,1fr)_auto] items-center gap-2.5">
                                <span
                                  aria-hidden="true"
                                  className="flex size-7 items-center justify-center rounded-md bg-slate-50"
                                >
                                  {country.flag}
                                </span>
                                <span className="min-w-0 truncate font-medium">
                                  {country.name}
                                </span>
                                <span className="justify-self-end tabular-nums text-muted-foreground">
                                  {country.dialCode}
                                </span>
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <input
                        id="lead-whatsapp"
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel-national"
                        value={phone}
                        onChange={(event) =>
                          setPhone(
                            normalizeNationalPhone(
                              event.target.value,
                              selectedCountry.dialCode,
                            ),
                          )
                        }
                        placeholder={selectedCountry.placeholder}
                        className="min-w-0 flex-1 bg-transparent px-4 text-base tabular-nums outline-none placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  <label className="block space-y-2">
                    <span className="text-sm font-semibold text-slate-800">
                      Correo electrónico
                    </span>
                    <Input
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="doctor@clinica.com"
                      className="h-[52px] rounded-xl bg-white px-4 text-base"
                    />
                  </label>
                </div>

                {error && (
                  <p className="mt-4 text-sm font-medium text-red-600">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="mt-6 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  Continuar <ArrowRight aria-hidden="true" size={18} />
                </button>
              </form>
            )}

            {step === 2 && (
              <div>
                <DialogHeader>
                  <DialogTitle className="font-sans text-2xl font-bold tracking-tight text-slate-900">
                    ¿Cuándo prefieres que te contactemos?
                  </DialogTitle>
                  <DialogDescription className="text-base leading-relaxed">
                    Después acordaremos contigo la hora exacta por WhatsApp.
                  </DialogDescription>
                </DialogHeader>

                <div className="mt-6 space-y-3">
                  {AVAILABILITY_OPTIONS.map((option) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => {
                          setAvailability(option.value);
                          setError(null);
                          setStep(3);
                        }}
                        className="group flex w-full items-center gap-4 rounded-2xl border border-primary/15 bg-white p-4 text-left transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      >
                        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                          <Icon aria-hidden="true" size={21} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-semibold text-slate-900">
                            {option.label}
                          </span>
                          <span className="mt-0.5 block text-sm text-slate-500">
                            {option.description}
                          </span>
                        </span>
                        <ArrowRight
                          aria-hidden="true"
                          className="text-primary/50 transition-transform group-hover:translate-x-1"
                          size={19}
                        />
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <ArrowLeft aria-hidden="true" size={17} /> Volver
                </button>
              </div>
            )}

            {step === 3 && (
              <div>
                <DialogHeader>
                  <DialogTitle className="font-sans text-2xl font-bold tracking-tight text-slate-900">
                    Una última pregunta
                  </DialogTitle>
                  <DialogDescription className="text-base leading-relaxed">
                    La instalación de Clidenta tiene un costo de{" "}
                    <strong className="text-slate-900">USD 250</strong>.
                  </DialogDescription>
                </DialogHeader>

                <div className="mt-6 space-y-3">
                  {BUDGET_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      aria-pressed={budget === option.value}
                      onClick={() => {
                        setBudget(option.value);
                        setError(null);
                      }}
                      className={cn(
                        "flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                        budget === option.value
                          ? "border-primary bg-secondary/80 shadow-sm"
                          : "border-primary/15 bg-white hover:border-primary/40",
                      )}
                    >
                      <span
                        className={cn(
                          "flex size-11 shrink-0 items-center justify-center rounded-xl",
                          budget === option.value
                            ? "bg-primary text-white"
                            : "bg-secondary text-primary",
                        )}
                      >
                        {budget === option.value ? (
                          <Check aria-hidden="true" size={22} />
                        ) : (
                          <CircleDollarSign aria-hidden="true" size={22} />
                        )}
                      </span>
                      <span>
                        <span className="block font-semibold text-slate-900">
                          {option.label}
                        </span>
                        <span className="mt-0.5 block text-sm text-slate-500">
                          {option.description}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>

                {error && (
                  <p className="mt-4 text-sm font-medium text-red-600">
                    {error}
                  </p>
                )}

                <button
                  type="button"
                  disabled={!budget || submitting}
                  onClick={submit}
                  className="mt-6 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  {submitting ? (
                    <>
                      <Loader2
                        aria-hidden="true"
                        className="animate-spin"
                        size={18}
                      />{" "}
                      Guardando tus datos…
                    </>
                  ) : (
                    <>
                      Enviar mi solicitud{" "}
                      <ArrowRight aria-hidden="true" size={18} />
                    </>
                  )}
                </button>
                <p className="mt-3 text-center text-xs leading-relaxed text-slate-500">
                  Al continuar, aceptas que Clidenta te contacte por WhatsApp y
                  correo.
                </p>

                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => setStep(2)}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <ArrowLeft aria-hidden="true" size={17} /> Volver
                </button>
              </div>
            )}

            {step === 4 && (
              <div className="py-5 text-center sm:py-8">
                <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-secondary text-primary">
                  <Check aria-hidden="true" size={32} strokeWidth={2.5} />
                </span>
                <DialogHeader className="mt-6 text-center sm:text-center">
                  <DialogTitle className="font-sans text-2xl font-bold tracking-tight text-slate-900">
                    ¡Listo! Ya recibimos tus datos
                  </DialogTitle>
                  <DialogDescription className="mx-auto max-w-sm text-base leading-relaxed">
                    Un asesor te escribirá por WhatsApp para coordinar la hora
                    de la reunión.
                  </DialogDescription>
                </DialogHeader>
                <a
                  href={`https://wa.me/${FALLBACK_WHATSAPP}?text=${fallbackText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <MessageCircle aria-hidden="true" size={19} /> Ir a WhatsApp
                </a>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
