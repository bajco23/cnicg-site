import { useEffect } from "react";

type SeoProps = {
  title: string;
  description: string;
  path?: string;
};

function setMeta(name: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setProperty(property: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export default function Seo({ title, description, path }: SeoProps) {
  useEffect(() => {
    const siteName = "Centar za nove inicijative";
    const fullTitle = `${title} · ${siteName}`;
    document.title = fullTitle;

    setMeta("description", description);

    // Basic OG tags
    const origin = window.location.origin;
    const url = `${origin}${path ?? window.location.pathname}`;

    setProperty("og:site_name", siteName);
    setProperty("og:title", fullTitle);
    setProperty("og:description", description);
    setProperty("og:type", "website");
    setProperty("og:url", url);

    // Twitter (simple)
    setMeta("twitter:card", "summary");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);
  }, [title, description, path]);

  return null;
}
