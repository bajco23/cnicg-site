import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

export default function Section({
  children,
  eyebrow,
  title,
  description,
  className,
  "data-testid": dataTestId,
}: PropsWithChildren<{
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
  "data-testid"?: string;
}>) {
  return (
    <section
      className={cn("rounded-3xl glass shadow-[var(--shadow-sm)]", className)}
      data-testid={dataTestId}
    >
      <div className="p-6 sm:p-8">
        {(eyebrow || title || description) && (
          <header className="mb-6 sm:mb-8">
            {eyebrow && (
              <div className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="mt-2 text-2xl sm:text-3xl leading-[1.08]">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
                {description}
              </p>
            )}
          </header>
        )}

        {children}
      </div>
    </section>
  );
}
