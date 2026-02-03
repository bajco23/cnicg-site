import { useMemo, useState } from "react";
import Seo from "@/components/Seo";
import SiteShell from "@/components/SiteShell";
import Section from "@/components/Section";
import { useCreateContactMessage } from "@/hooks/use-contact";
import { api, type ContactCreateInput } from "@shared/routes";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Send, ShieldCheck } from "lucide-react";

function FieldLabel({
  label,
  hint,
  htmlFor,
  required,
  testId,
}: {
  label: string;
  hint?: string;
  htmlFor: string;
  required?: boolean;
  testId?: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <label
        htmlFor={htmlFor}
        className="text-sm font-semibold tracking-tight"
        data-testid={testId}
      >
        {label} {required ? <span className="text-destructive">*</span> : null}
      </label>
      {hint ? <span className="text-xs text-muted-foreground">{hint}</span> : null}
    </div>
  );
}

function parseWithLogging<T>(schema: z.ZodSchema<T>, data: unknown, label: string): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error(`[Zod] ${label} validation failed:`, result.error.format());
    throw result.error;
  }
  return result.data;
}

export default function ContactPage() {
  const { toast } = useToast();
  const create = useCreateContactMessage();

  const [form, setForm] = useState<ContactCreateInput>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [touched, setTouched] = useState<Record<keyof ContactCreateInput, boolean>>({
    name: false,
    email: false,
    subject: false,
    message: false,
  });

  const errors = useMemo(() => {
    const res = api.contact.create.input.safeParse(form);
    if (res.success) return {};
    const map: Partial<Record<keyof ContactCreateInput, string>> = {};
    for (const issue of res.error.issues) {
      const key = issue.path[0] as keyof ContactCreateInput | undefined;
      if (key && !map[key]) map[key] = issue.message;
    }
    return map;
  }, [form]);

  const canSubmit = useMemo(() => {
    return api.contact.create.input.safeParse(form).success && !create.isPending;
  }, [form, create.isPending]);

  const set = <K extends keyof ContactCreateInput>(key: K, value: ContactCreateInput[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ name: true, email: true, subject: true, message: true });

    const validated = api.contact.create.input.safeParse(form);
    if (!validated.success) {
      toast({
        title: "Proverite unos",
        description: "Neka polja nisu validna. Molimo ispravite greške i pokušajte ponovo.",
        variant: "destructive",
      });
      return;
    }

    try {
      const result = await create.mutateAsync(validated.data);
      // Validate response shape (defensive)
      parseWithLogging(api.contact.create.responses[201], result, "contact.create 201");

      toast({
        title: "Poruka je poslata",
        description: "Hvala vam. Javićemo se uskoro.",
      });

      setForm({ name: "", email: "", subject: "", message: "" });
      setTouched({ name: false, email: false, subject: false, message: false });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Nešto je pošlo po zlu.";
      toast({
        title: "Slanje nije uspelo",
        description: msg,
        variant: "destructive",
      });
    }
  }

  return (
    <SiteShell>
      <Seo
        title="Kontakt"
        description="Pošaljite poruku Centru za nove inicijative. Odgovaramo brzo i jasno."
        path="/kontakt"
      />

      <div className="anim-in">
        <Section
          data-testid="contact-hero"
          eyebrow="Kontakt"
          title="Pišite nam — mi smo tu."
          description="Za partnerstva, pitanja, predloge tema ili saradnju. Kratko je dovoljno — bitno je jasno."
          className="relative overflow-hidden"
        >
          <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-br from-accent/22 to-transparent blur-2xl" />
          <div className="pointer-events-none absolute -bottom-28 -left-28 h-80 w-80 rounded-full bg-gradient-to-br from-primary/22 to-transparent blur-2xl" />

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_.9fr] gap-5 lg:gap-6 items-start">
            <div className="rounded-3xl border border-border/60 bg-card/40 backdrop-blur p-6 sm:p-7 shadow-[var(--shadow-2xs)]">
              <form onSubmit={onSubmit} className="grid gap-5" data-testid="contact-form">
                {/* Name */}
                <div className="grid gap-2">
                  <FieldLabel
                    htmlFor="name"
                    label="Ime i prezime"
                    required
                    hint="min 2 karaktera"
                    testId="contact-label-name"
                  />
                  <Input
                    id="name"
                    data-testid="contact-name"
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                    placeholder="npr. Ana Petrović"
                    className={cn(
                      "h-12 rounded-2xl bg-background/40 border-2",
                      "focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200",
                      touched.name && errors.name ? "border-destructive focus:border-destructive focus:ring-destructive/10" : "border-border/60",
                    )}
                    autoComplete="name"
                  />
                  {touched.name && errors.name ? (
                    <p className="text-xs text-destructive" data-testid="contact-error-name">
                      {errors.name}
                    </p>
                  ) : null}
                </div>

                {/* Email */}
                <div className="grid gap-2">
                  <FieldLabel
                    htmlFor="email"
                    label="Email"
                    required
                    hint="validan format"
                    testId="contact-label-email"
                  />
                  <Input
                    id="email"
                    type="email"
                    data-testid="contact-email"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                    placeholder="npr. ana@email.com"
                    className={cn(
                      "h-12 rounded-2xl bg-background/40 border-2",
                      "focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200",
                      touched.email && errors.email ? "border-destructive focus:border-destructive focus:ring-destructive/10" : "border-border/60",
                    )}
                    autoComplete="email"
                  />
                  {touched.email && errors.email ? (
                    <p className="text-xs text-destructive" data-testid="contact-error-email">
                      {errors.email}
                    </p>
                  ) : null}
                </div>

                {/* Subject */}
                <div className="grid gap-2">
                  <FieldLabel
                    htmlFor="subject"
                    label="Naslov"
                    hint="opciono (ako unesete: min 3)"
                    testId="contact-label-subject"
                  />
                  <Input
                    id="subject"
                    data-testid="contact-subject"
                    value={form.subject ?? ""}
                    onChange={(e) => set("subject", e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, subject: true }))}
                    placeholder="npr. Predlog za partnerstvo"
                    className={cn(
                      "h-12 rounded-2xl bg-background/40 border-2",
                      "focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200",
                      touched.subject && errors.subject ? "border-destructive focus:border-destructive focus:ring-destructive/10" : "border-border/60",
                    )}
                    autoComplete="off"
                  />
                  {touched.subject && errors.subject ? (
                    <p className="text-xs text-destructive" data-testid="contact-error-subject">
                      {errors.subject}
                    </p>
                  ) : null}
                </div>

                {/* Message */}
                <div className="grid gap-2">
                  <FieldLabel
                    htmlFor="message"
                    label="Poruka"
                    required
                    hint="min 10 karaktera"
                    testId="contact-label-message"
                  />
                  <Textarea
                    id="message"
                    data-testid="contact-message"
                    value={form.message}
                    onChange={(e) => set("message", e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, message: true }))}
                    placeholder="Napišite ukratko o čemu se radi i kako možemo pomoći…"
                    className={cn(
                      "min-h-[140px] rounded-2xl bg-background/40 border-2",
                      "focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200",
                      touched.message && errors.message ? "border-destructive focus:border-destructive focus:ring-destructive/10" : "border-border/60",
                    )}
                  />
                  {touched.message && errors.message ? (
                    <p className="text-xs text-destructive" data-testid="contact-error-message">
                      {errors.message}
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground" data-testid="contact-privacy">
                    <ShieldCheck className="h-4 w-4" />
                    Podaci se koriste isključivo za odgovor na poruku.
                  </div>

                  <Button
                    type="submit"
                    data-testid="contact-submit"
                    disabled={!canSubmit}
                    className={cn(
                      "rounded-2xl px-6 py-6 text-base font-semibold",
                      "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground",
                      "shadow-[var(--shadow-sm)] shadow-primary/15",
                      "hover:shadow-[var(--shadow-md)] hover:shadow-primary/20 hover:-translate-y-0.5",
                      "active:translate-y-0 active:shadow-[var(--shadow-xs)]",
                      "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
                      "transition-all duration-300",
                    )}
                  >
                    {create.isPending ? (
                      <>
                        Slanje…
                        <span className="ml-2 inline-flex h-5 w-5 items-center justify-center">
                          <span className="h-3 w-3 rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground animate-spin" />
                        </span>
                      </>
                    ) : (
                      <>
                        Pošalji <Send className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>

            <div className="anim-in-2">
              <div className="rounded-3xl border border-border/60 bg-card/40 backdrop-blur p-6 sm:p-7 shadow-[var(--shadow-2xs)]">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-accent/18 to-primary/10 p-3 shadow-[var(--shadow-2xs)]">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg">Kontakt informacije</h3>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed" data-testid="contact-side-note">
                      Ovaj blok je spreman za mejl, telefon, adresu i društvene mreže kada budete želeli.
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-3">
                  {[
                    { k: "Email", v: "kontakt@primer.org" },
                    { k: "Telefon", v: "+381 00 000 000" },
                    { k: "Lokacija", v: "Srbija (po dogovoru)" },
                  ].map((row, idx) => (
                    <div
                      key={row.k}
                      data-testid={`contact-info-${idx}`}
                      className="rounded-2xl border border-border/60 bg-background/40 px-4 py-4"
                    >
                      <div className="text-xs tracking-[0.14em] uppercase text-muted-foreground">
                        {row.k}
                      </div>
                      <div className="mt-1 text-sm font-semibold">{row.v}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-border/60 bg-gradient-to-br from-primary/10 via-accent/10 to-transparent p-5">
                  <div className="text-sm font-semibold" data-testid="contact-side-cta-title">
                    Brz predlog saradnje
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    Napišite 2–3 rečenice: problem, cilj i ko je uključen. Mi se vraćamo sa predlogom narednih koraka.
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-3xl border border-border/60 bg-card/30 backdrop-blur p-6 shadow-[var(--shadow-2xs)]">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-sm font-semibold">Želite prvo da nas upoznate?</div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      Pogledajte misiju, vrednosti i pravac rada.
                    </div>
                  </div>
                  <Link href="/o-nama">
                    <Button
                      type="button"
                      variant="secondary"
                      data-testid="contact-to-about"
                      onClick={() => {}}
                      className="rounded-2xl border border-border/60 bg-background/40 hover:bg-background/60 transition-all duration-300"
                    >
                      O nama
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>

      <div className="mt-6 pb-6 text-xs text-muted-foreground" data-testid="contact-footer-note">
        <div className="rounded-3xl border border-border/60 bg-card/30 backdrop-blur px-6 py-4 shadow-[var(--shadow-2xs)]">
          Ako imate hitno pitanje, u naslovu poruke naznačite <span className="font-semibold">HITNO</span>.
        </div>
      </div>
    </SiteShell>
  );
}
