import {
  BUSINESS,
  dictionaries,
  LOCALES,
  localePath,
  type Locale,
} from "@/i18n";

export const SITE_URL = (
  import.meta.env.VITE_SITE_URL || "https://sharon-mazganim.pages.dev"
).replace(/\/+$/, "");

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path === "/" ? "/" : path.replace(/\/+$/, "") + "/"}`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function structuredData(locale: Locale) {
  const t = dictionaries[locale];
  const url = absoluteUrl(localePath(locale));
  const business = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    "@id": `${SITE_URL}/#business`,
    name: locale === "he" ? BUSINESS.name : BUSINESS.nameEn,
    alternateName: locale === "he" ? BUSINESS.nameEn : BUSINESS.name,
    description: t.meta.description,
    url,
    telephone: BUSINESS.phoneE164,
    image: `${SITE_URL}/images/og-image.png`,
    logo: `${SITE_URL}/images/icon-512.png`,
    priceRange: "₪₪",
    address: {
      "@type": "PostalAddress",
      addressLocality: BUSINESS.city,
      addressRegion: BUSINESS.region,
      addressCountry: BUSINESS.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.geo.lat,
      longitude: BUSINESS.geo.lng,
    },
    areaServed: BUSINESS.serviceAreas.map(name => ({ "@type": "City", name })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "08:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Friday"],
        opens: "08:00",
        closes: "14:00",
      },
    ],
    sameAs: [`https://wa.me/${BUSINESS.whatsappNumber}`],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: t.nav.services,
      itemListElement: t.services.items.map(s => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.description,
        },
      })),
    },
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.items.map(f => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL + "/",
    name: locale === "he" ? BUSINESS.name : BUSINESS.nameEn,
    inLanguage: LOCALES,
  };
  return [business, faq, website];
}

/** Head tags for a locale's page. Used at prerender time (server) and mirrored on the client. */
export function headTags(locale: Locale): string {
  const t = dictionaries[locale];
  const url = absoluteUrl(localePath(locale));
  const ogImage = `${SITE_URL}/images/og-image.png`;
  const tags: string[] = [
    `<title>${escapeHtml(t.meta.title)}</title>`,
    `<meta name="description" content="${escapeHtml(t.meta.description)}" />`,
    `<meta name="keywords" content="${escapeHtml(t.meta.keywords)}" />`,
    `<link rel="canonical" href="${url}" />`,
    ...LOCALES.map(
      l =>
        `<link rel="alternate" hreflang="${l}" href="${absoluteUrl(localePath(l))}" />`
    ),
    `<link rel="alternate" hreflang="x-default" href="${absoluteUrl("/")}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escapeHtml(locale === "he" ? BUSINESS.name : BUSINESS.nameEn)}" />`,
    `<meta property="og:title" content="${escapeHtml(t.meta.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(t.meta.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${ogImage}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${escapeHtml(t.meta.ogImageAlt)}" />`,
    `<meta property="og:locale" content="${t.ogLocale}" />`,
    ...LOCALES.filter(l => l !== locale).map(
      l =>
        `<meta property="og:locale:alternate" content="${dictionaries[l].ogLocale}" />`
    ),
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(t.meta.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(t.meta.description)}" />`,
    `<meta name="twitter:image" content="${ogImage}" />`,
    `<script type="application/ld+json">${JSON.stringify(structuredData(locale)).replace(/</g, "\\u003c")}</script>`,
  ];
  return tags.join("\n    ");
}
