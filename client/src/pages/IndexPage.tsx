import { Link } from "wouter";
import { ArrowRight, HeartHandshake, Landmark, Lightbulb, ShieldCheck } from "lucide-react";
import Seo from "@/components/Seo";
import SiteShell from "@/components/SiteShell";
import Section from "@/components/Section";
import StatPill from "@/components/StatPill";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function FocusCard({
  icon: Icon,
  title,
  text,
  testId,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  text: string;
  testId: string;
}) {
  return (
    <div
      data-testid={testId}
      className={cn(
        "group rounded-3xl border border-border/60 bg-card/40 backdrop-blur",
        "p-5 sm:p-6 shadow-[var(--shadow-2xs)]",
        "transition-all duration-300 hover:shadow-[var(--shadow-sm)] hover:-translate-y-0.5",
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "rounded-2xl border border-border/60 p-3",
            "bg-gradient-to-br from-primary/18 via-accent/16 to-transparent",
            "shadow-[var(--shadow-2xs)] transition-all duration-300 group-hover:shadow-[var(--shadow-xs)]",
          )}
          aria-hidden="true"
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <h3 className="text-lg leading-tight">{title}</h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{text}</p>
        </div>
      </div>
    </div>
  );
}

export default function IndexPage() {
  return (
    <SiteShell>
      <Seo
        title="Početna"
        description="Centar za nove inicijative — povezujemo ideje i ljude kroz projekte, edukaciju i zagovaranje."
        path="/"
      />

      {/* Hero */}
      <div className="anim-in">
        <Section
          data-testid="home-hero"
          eyebrow="Centar za nove inicijative"
          title="Mala organizacija. Veliki, merljivi pomaci u zajednici."
          description="Gradimo projekte koji spajaju znanje, empatiju i praktičnu akciju — od lokalnih inicijativa do šireg zagovaranja."
          className="relative overflow-hidden"
        >
          <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-br from-accent/25 to-primary/20 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-28 -left-28 h-72 w-72 rounded-full bg-gradient-to-br from-primary/24 to-transparent blur-2xl" />

          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_.9fr] gap-8 lg:gap-10 items-end">
            <div>
              <div className="flex flex-wrap gap-3">
                <StatPill testId="hero-pill-1" label="Fokus" value="Zajednica" />
                <StatPill testId="hero-pill-2" label="Metod" value="Partnerstva" />
                <StatPill testId="hero-pill-3" label="Cilj" value="Održivo" />
              </div>

              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <Link href="/kontakt" className="w-full sm:w-auto">
                  <Button
                    data-testid="home-cta-primary"
                    className={cn(
                      "w-full sm:w-auto rounded-2xl px-6 py-6 text-base font-semibold",
                      "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground",
                      "shadow-[var(--shadow-sm)] shadow-primary/15",
                      "hover:shadow-[var(--shadow-md)] hover:shadow-primary/20 hover:-translate-y-0.5",
                      "active:translate-y-0 active:shadow-[var(--shadow-xs)]",
                      "transition-all duration-300",
                    )}
                  >
                    Javite se <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>

                <Link href="/o-nama" className="w-full sm:w-auto">
                  <Button
                    variant="secondary"
                    data-testid="home-cta-secondary"
                    className={cn(
                      "w-full sm:w-auto rounded-2xl px-6 py-6 text-base font-semibold",
                      "bg-card/40 backdrop-blur border border-border/60",
                      "shadow-[var(--shadow-2xs)] hover:shadow-[var(--shadow-sm)] hover:-translate-y-0.5",
                      "transition-all duration-300",
                    )}
                  >
                    Saznajte više
                  </Button>
                </Link>
              </div>

              <p
                className="mt-6 text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xl"
                data-testid="home-hero-note"
              >
                Transparentno, odgovorno i bez suvišne buke: fokusirani smo na rezultate koje ljudi osećaju u svakodnevici.
              </p>
            </div>

            <div className="anim-in-2">
              <div className="rounded-3xl border border-border/60 bg-card/40 backdrop-blur p-6 sm:p-7 shadow-[var(--shadow-sm)]">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-accent/22 to-primary/10 p-3">
                    <HeartHandshake className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-display text-lg tracking-tight" data-testid="home-mission-title">
                      Naša misija
                    </div>
                    <div className="text-xs tracking-[0.16em] uppercase text-muted-foreground">
                      jasna, lokalna, otvorena
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-sm text-muted-foreground leading-relaxed" data-testid="home-mission-text">
                  Pokrećemo i podržavamo inicijative koje jačaju poverenje, podstiču saradnju i kreiraju prilike — posebno za one čiji se glas ređe čuje.
                </p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { label: "Partneri", value: "Lokalni" },
                    { label: "Pristup", value: "Praktičan" },
                    { label: "Ton", value: "Empatičan" },
                  ].map((s, idx) => (
                    <div
                      key={s.label}
                      className="rounded-2xl border border-border/60 bg-background/40 px-4 py-3"
                      data-testid={`home-mini-stat-${idx}`}
                    >
                      <div className="text-[11px] tracking-[0.14em] uppercase text-muted-foreground">
                        {s.label}
                      </div>
                      <div className="mt-1 text-sm font-semibold">{s.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* Focus areas */}
      <div className="mt-6 lg:mt-10 anim-in-2">
        <Section
          data-testid="home-focus"
          eyebrow="Fokus oblasti"
          title="Tri stuba našeg rada"
          description="Biramo projekte koji imaju jasnu svrhu, realan plan i prostor za saradnju."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            <FocusCard
              testId="focus-card-1"
              icon={Lightbulb}
              title="Edukacija & kapaciteti"
              text="Radionice, mentorstva i alati koji pomažu ljudima i timovima da pokrenu promenu."
            />
            <FocusCard
              testId="focus-card-2"
              icon={Landmark}
              title="Zagovaranje & politika"
              text="Jasni predlozi, argumenti i dijalog sa institucijama — bez senzacionalizma."
            />
            <FocusCard
              testId="focus-card-3"
              icon={ShieldCheck}
              title="Integritet & transparentnost"
              text="Standardi rada, merljivost i odgovornost prema zajednici."
            />
          </div>
        </Section>
      </div>

      {/* How you can help */}
      <div className="mt-6 lg:mt-10 anim-in-3">
        <Section
          data-testid="home-help"
          eyebrow="Kako možete pomoći"
          title="Podržite inicijative koje ostaju"
          description="Nekad je dovoljna poruka, nekad partnerstvo. Uvek je važno poverenje."
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-5 items-start">
            <div className="rounded-3xl border border-border/60 bg-card/40 backdrop-blur p-5 sm:p-6 shadow-[var(--shadow-2xs)]">
              <ul className="grid gap-3 text-sm text-muted-foreground leading-relaxed">
                {[
                  "Povežite nas sa organizacijama i ljudima koji dele vrednosti.",
                  "Predložite temu ili problem koji želite da zajedno rešavamo.",
                  "Podelite naše inicijative — kvalitetna informacija putuje brzo.",
                  "Uključite se kao volonter/ka ili donator/ka (po dogovoru).",
                ].map((li, idx) => (
                  <li
                    key={idx}
                    className="flex gap-3"
                    data-testid={`home-help-item-${idx}`}
                  >
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary/70 shrink-0" />
                    <span>{li}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link href="/kontakt" className="w-full lg:w-auto">
              <Button
                data-testid="home-help-cta"
                className={cn(
                  "w-full lg:w-auto rounded-2xl px-6 py-6 text-base font-semibold",
                  "bg-gradient-to-r from-accent to-accent/80 text-accent-foreground",
                  "shadow-[var(--shadow-sm)] shadow-accent/15",
                  "hover:shadow-[var(--shadow-md)] hover:shadow-accent/20 hover:-translate-y-0.5",
                  "active:translate-y-0 active:shadow-[var(--shadow-xs)]",
                  "transition-all duration-300",
                )}
              >
                Pošaljite poruku <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </Section>
      </div>

      <footer className="mt-6 lg:mt-10 pb-6 text-xs text-muted-foreground">
        <div className="rounded-3xl border border-border/60 bg-card/30 backdrop-blur px-6 py-4 shadow-[var(--shadow-2xs)]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div data-testid="footer-left">
              © {new Date().getFullYear()} Centar za nove inicijative
            </div>
            <div className="flex items-center gap-3">
              <Link href="/o-nama" data-testid="footer-about" className="hover:underline underline-offset-4">
                O nama
              </Link>
              <span className="opacity-40">•</span>
              <Link href="/kontakt" data-testid="footer-contact" className="hover:underline underline-offset-4">
                Kontakt
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </SiteShell>
  );
}
