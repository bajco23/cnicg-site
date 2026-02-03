import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { useLocation, Link } from "wouter";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/ThemeToggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PanelLeft, ArrowRight, Sparkles } from "lucide-react";

type NavItem = { href: string; label: string; testId: string; subtitle?: string };

function useActivePath() {
  const [location] = useLocation();
  return location;
}

function initials(name: string) {
  const parts = name.split(" ").filter(Boolean);
  return parts.slice(0, 2).map((p) => p[0]?.toUpperCase()).join("");
}

export default function SiteShell({ children }: PropsWithChildren) {
  const active = useActivePath();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    setMobileNavOpen(false);
  }, [active]);

  const nav: NavItem[] = useMemo(
    () => [
      { href: "/", label: "Početna", testId: "nav-home", subtitle: "Misija & fokus" },
      { href: "/o-nama", label: "O nama", testId: "nav-about", subtitle: "Vrednosti & tim" },
      { href: "/kontakt", label: "Kontakt", testId: "nav-contact", subtitle: "Pišite nam" },
    ],
    [],
  );

  return (
    <div className="min-h-dvh mesh-bg noise-overlay">
      {/* Decorative top line */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 h-px bg-gradient-to-r from-transparent via-border/70 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid min-h-dvh grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 lg:gap-10 py-6 md:py-8">
          {/* Sidebar / Left rail */}
          <aside className="lg:sticky lg:top-8 lg:self-start">
            <div className="glass rounded-3xl shadow-[var(--shadow-sm)] overflow-hidden">
              <div className="p-5 sm:p-6 border-b border-border/60">
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "h-12 w-12 rounded-2xl grid place-items-center",
                      "bg-gradient-to-br from-primary/18 via-accent/18 to-transparent",
                      "border border-border/60 shadow-[var(--shadow-2xs)]",
                    )}
                    aria-hidden="true"
                  >
                    <span className="font-display text-lg tracking-tight text-foreground/90">
                      {initials("Centar za nove inicijative")}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h1
                        className="text-lg sm:text-xl leading-tight"
                        data-testid="org-name"
                      >
                        Centar za nove inicijative
                      </h1>
                      <Badge
                        variant="secondary"
                        className="hidden sm:inline-flex bg-muted/70 text-muted-foreground border border-border/60"
                      >
                        NGO
                      </Badge>
                    </div>
                    <p
                      className="mt-1 text-sm text-muted-foreground leading-snug"
                      data-testid="org-tagline"
                    >
                      Inicijative koje povezuju zajednicu, znanje i delovanje.
                    </p>
                  </div>

                  <div className="ml-auto flex items-center gap-2">
                    <ThemeToggle />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      data-testid="mobile-nav-toggle"
                      onClick={() => setMobileNavOpen((v) => !v)}
                      className="lg:hidden rounded-xl border border-border/60 bg-card/40 backdrop-blur hover:bg-card/70 transition-all duration-300"
                      aria-label="Toggle navigation"
                    >
                      <PanelLeft className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Nav */}
              <div
                className={cn(
                  "p-2 sm:p-3",
                  "lg:block",
                  mobileNavOpen ? "block" : "hidden",
                )}
              >
                <nav className="grid gap-1" aria-label="Primary">
                  {nav.map((item) => {
                    const isActive = active === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        data-testid={item.testId}
                        className={cn(
                          "group relative rounded-2xl px-4 py-3 outline-none",
                          "transition-all duration-300 ease-out",
                          "border border-transparent",
                          isActive
                            ? "bg-gradient-to-r from-primary/14 via-accent/10 to-transparent border-border/60 shadow-[var(--shadow-2xs)]"
                            : "hover:bg-card/60 hover:border-border/60 hover:shadow-[var(--shadow-2xs)]",
                        )}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="min-w-0">
                            <div
                              className={cn(
                                "text-sm font-semibold tracking-tight",
                                isActive ? "text-foreground" : "text-foreground/90",
                              )}
                            >
                              {item.label}
                            </div>
                            <div className="mt-0.5 text-xs text-muted-foreground truncate">
                              {item.subtitle}
                            </div>
                          </div>

                          <ArrowRight
                            className={cn(
                              "h-4 w-4 shrink-0 transition-all duration-300",
                              isActive
                                ? "opacity-100 translate-x-0 text-foreground"
                                : "opacity-0 -translate-x-1 text-muted-foreground group-hover:opacity-100 group-hover:translate-x-0",
                            )}
                            aria-hidden="true"
                          />
                        </div>
                      </Link>
                    );
                  })}
                </nav>

                <div className="mt-3 p-3 sm:p-4">
                  <div className="rounded-2xl border border-border/60 bg-card/40 backdrop-blur px-4 py-4 shadow-[var(--shadow-2xs)]">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 rounded-xl border border-border/60 bg-gradient-to-br from-accent/20 to-primary/10 p-2">
                        <Sparkles className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold tracking-tight">
                          Želite da sarađujemo?
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                          Pošaljite poruku — odgovaramo brzo i jasno.
                        </p>
                        <Link
                          href="/kontakt"
                          data-testid="sidebar-cta"
                          className={cn(
                            "mt-3 inline-flex items-center gap-2 text-sm font-semibold",
                            "text-primary hover:underline underline-offset-4",
                            "transition-colors",
                          )}
                        >
                          Kontaktirajte nas <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main */}
          <main className="min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
