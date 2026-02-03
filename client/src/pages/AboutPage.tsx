import Seo from "@/components/Seo";
import SiteShell from "@/components/SiteShell";
import Section from "@/components/Section";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, ClipboardList, Compass, Handshake, Scale, Users } from "lucide-react";

function ValueCard({
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
        "rounded-3xl border border-border/60 bg-card/40 backdrop-blur p-5 sm:p-6",
        "shadow-[var(--shadow-2xs)] transition-all duration-300",
        "hover:shadow-[var(--shadow-sm)] hover:-translate-y-0.5",
      )}
    >
      <div className="flex items-start gap-4">
        <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-primary/18 via-accent/14 to-transparent p-3 shadow-[var(--shadow-2xs)]">
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

function TeamPlaceholder({
  name,
  role,
  testId,
}: {
  name: string;
  role: string;
  testId: string;
}) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join("");

  return (
    <div
      data-testid={testId}
      className={cn(
        "rounded-3xl border border-border/60 bg-card/40 backdrop-blur p-5 sm:p-6",
        "shadow-[var(--shadow-2xs)] transition-all duration-300 hover:shadow-[var(--shadow-sm)]",
      )}
    >
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-2xl border border-border/60 bg-gradient-to-br from-accent/18 to-primary/10 grid place-items-center shadow-[var(--shadow-2xs)]">
          <span className="font-display text-lg tracking-tight">{initials}</span>
        </div>
        <div className="min-w-0">
          <div className="font-semibold" data-testid={`${testId}-name`}>{name}</div>
          <div className="text-sm text-muted-foreground" data-testid={`${testId}-role`}>{role}</div>
        </div>
        <Badge className="ml-auto bg-muted/70 text-muted-foreground border border-border/60">
          placeholder
        </Badge>
      </div>

      <div className="mt-4 h-2 w-full rounded-full bg-muted/60 overflow-hidden" aria-hidden="true">
        <div className="h-full w-[62%] bg-gradient-to-r from-primary/40 to-accent/35" />
      </div>
      <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
        Ovaj deo je spreman za biografije, projekte i kontakt informacije kada budete želeli.
      </p>
    </div>
  );
}

export default function AboutPage() {
  return (
    <SiteShell>
      <Seo
        title="O nama"
        description="Saznajte više o misiji, viziji i vrednostima Centra za nove inicijative."
        path="/o-nama"
      />

      <div className="anim-in">
        <Section
          data-testid="about-intro"
          eyebrow="O nama"
          title="Radimo tiho, gradimo trajno."
          description="Centar za nove inicijative je platforma za saradnju — između građana, stručnjaka, organizacija i institucija — oko tema koje su važne i rešive."
          className="relative overflow-hidden"
        >
          <div className="pointer-events-none absolute -top-28 -right-28 h-72 w-72 rounded-full bg-gradient-to-br from-primary/22 to-transparent blur-2xl" />
          <div className="pointer-events-none absolute -bottom-28 -left-28 h-80 w-80 rounded-full bg-gradient-to-br from-accent/22 to-transparent blur-2xl" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
            <div className="lg:col-span-2 rounded-3xl border border-border/60 bg-card/40 backdrop-blur p-6 sm:p-7 shadow-[var(--shadow-2xs)]">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-primary/18 via-accent/14 to-transparent p-3 shadow-[var(--shadow-2xs)]">
                  <Compass className="h-5 w-5" />
                </div>
                <h3 className="text-lg" data-testid="about-mission-title">Misija</h3>
              </div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed" data-testid="about-mission-text">
                Razvijamo inicijative koje povećavaju društveno poverenje i sposobnost zajednice da prepozna problem, dogovori rešenje i sprovede ga u praksi.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {["Otvorenost", "Dokazi", "Saradnja", "Odgovornost"].map((tag, idx) => (
                  <Badge
                    key={tag}
                    data-testid={`about-tag-${idx}`}
                    className="bg-background/40 text-foreground border border-border/60"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-border/60 bg-card/40 backdrop-blur p-6 sm:p-7 shadow-[var(--shadow-2xs)]">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-accent/18 to-primary/10 p-3 shadow-[var(--shadow-2xs)]">
                  <ClipboardList className="h-5 w-5" />
                </div>
                <h3 className="text-lg" data-testid="about-vision-title">Vizija</h3>
              </div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed" data-testid="about-vision-text">
                Zajednica u kojoj se promene ne dešavaju slučajno, već planski — uz jasne ciljeve, standarde i učešće građana.
              </p>

              <Link href="/kontakt" className="mt-5 inline-flex w-full">
                <Button
                  data-testid="about-cta"
                  className={cn(
                    "w-full rounded-2xl px-6 py-6 text-base font-semibold",
                    "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground",
                    "shadow-[var(--shadow-sm)] shadow-primary/15",
                    "hover:shadow-[var(--shadow-md)] hover:shadow-primary/20 hover:-translate-y-0.5",
                    "active:translate-y-0 active:shadow-[var(--shadow-xs)]",
                    "transition-all duration-300",
                  )}
                >
                  Predložite saradnju <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </Section>
      </div>

      <div className="mt-6 lg:mt-10 anim-in-2">
        <Section
          data-testid="about-values"
          eyebrow="Vrednosti"
          title="Principi koji vode naš rad"
          description="Da bi inicijative bile održive, moraju biti i poštene: prema ljudima, vremenu i resursima."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <ValueCard
              testId="value-1"
              icon={Scale}
              title="Integritet"
              text="Rad zasnivamo na činjenicama, poštovanju i doslednosti."
            />
            <ValueCard
              testId="value-2"
              icon={Users}
              title="Učešće"
              text="Promena je najstabilnija kada nastane zajedno sa zajednicom."
            />
            <ValueCard
              testId="value-3"
              icon={Handshake}
              title="Partnerstva"
              text="Povezujemo sektore i ljude — jer dobre ideje rastu kroz saradnju."
            />
          </div>
        </Section>
      </div>

      <div className="mt-6 lg:mt-10 anim-in-3">
        <Section
          data-testid="about-history"
          eyebrow="Kratka istorija"
          title="Od inicijative do strukture"
          description="Počeli smo kao mala grupa ljudi koja voli da stvari radi kako treba: jasno, mirno i do kraja."
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <div className="rounded-3xl border border-border/60 bg-card/40 backdrop-blur p-6 sm:p-7 shadow-[var(--shadow-2xs)]">
              <h3 className="text-lg">Kako je krenulo</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed" data-testid="about-history-1">
                Iz potrebe da se lokalni problemi rešavaju sistematično: mapiranje, dogovor, plan, realizacija, evaluacija. Bez improvizacije — ali sa empatijom.
              </p>
              <div className="mt-5 rounded-2xl border border-border/60 bg-background/40 p-4">
                <div className="text-xs tracking-[0.14em] uppercase text-muted-foreground">Naš pristup</div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Male iteracije, jasni ciljevi, otvorena komunikacija — i stalno učenje iz povratnih informacija.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-border/60 bg-card/40 backdrop-blur p-6 sm:p-7 shadow-[var(--shadow-2xs)]">
              <h3 className="text-lg">Gde smo danas</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed" data-testid="about-history-2">
                Gradimo mrežu partnera i projekata. Ovaj sajt je početak — spreman za rast: vesti, projekti, izveštaji i mogućnosti uključivanja.
              </p>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { k: "Transparentnost", v: "Javno i jasno" },
                  { k: "Komunikacija", v: "Bez suvišnih reči" },
                  { k: "Kvalitet", v: "Standardi rada" },
                  { k: "Održivost", v: "Dugoročno" },
                ].map((x, idx) => (
                  <div
                    key={x.k}
                    data-testid={`about-today-${idx}`}
                    className="rounded-2xl border border-border/60 bg-background/40 p-4"
                  >
                    <div className="text-xs tracking-[0.14em] uppercase text-muted-foreground">{x.k}</div>
                    <div className="mt-1 text-sm font-semibold">{x.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>
      </div>

      <div className="mt-6 lg:mt-10 pb-6">
        <Section
          data-testid="about-team"
          eyebrow="Tim"
          title="Ljudi koji nose inicijative"
          description="Za sada placeholder kartice — spremno za imena, uloge i kratke opise."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <TeamPlaceholder testId="team-1" name="Ime Prezime" role="Koordinacija programa" />
            <TeamPlaceholder testId="team-2" name="Ime Prezime" role="Istraživanje & analiza" />
            <TeamPlaceholder testId="team-3" name="Ime Prezime" role="Komunikacije & zajednica" />
          </div>
        </Section>
      </div>
    </SiteShell>
  );
}
